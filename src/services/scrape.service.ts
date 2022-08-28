import {BadRequestException, Injectable} from '@nestjs/common';
import {Scraper} from "../interfaces/scraper.interface";
import {ScrapeData} from "../models/scrape-data.model";
import {Formatter} from "../interfaces/formatter.interface";
import {Auth} from "../models/auth.model";
import {Customer} from "../models/customer.model";
import {Account} from "../models/account.model";
import {Transaction} from "../models/transaction.model";
import {Dialog} from "puppeteer";
import {TransactionScaper} from "../scrapers/transaction.scaper";
import {AuthScraper} from "../scrapers/auth.scraper";
import {AccountScraper} from "../scrapers/account.scraper";
import {CustomerScraper} from "../scrapers/customer.scraper";
import {ScrapeDto} from "../domain/dto/scrape.dto";
import {FormatterService} from "./formatter.service";
import {ScrapePojo} from "../domain/pojo/scrape.pojo";
import {AuthRepository} from "../repository/auth.repository";
import {BankRepository} from "../repository/bank.repository";
import {CustomerRepository} from "../repository/customer.repository";
import {AccountRepository} from "../repository/account.repository";
import {TransactionRepository} from "../repository/transaction.repository";
import {Bank} from "../models/bank.model";
import {InsertManyResult, InsertOneResult} from "mongodb";
import {AuthSchema} from "../schema/auth.shema";
import {CustomerSchema} from "../schema/customer.schema";
import {AccountSchema} from "../schema/account.schema";
import {TransactionSchema} from "../schema/transaction.schema";
import {LogoutScraper} from "../scrapers/logout.scraper";

const puppeteer = require('puppeteer');

@Injectable()
export class ScrapeService implements Scraper<ScrapePojo>, Formatter<ScrapeData, any> {
    constructor(private readonly formatterService: FormatterService,
                private readonly authRepository: AuthRepository,
                private readonly bankRepository: BankRepository,
                private readonly customerRepository: CustomerRepository,
                private readonly accountRepository: AccountRepository,
                private readonly transactionRepository: TransactionRepository,) {
    }

    async scrape(dto: ScrapeDto): Promise<ScrapePojo> {
        const customerBank: Bank = await this.findBankById(dto.bankId);

        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();

        page.on('dialog', async (dialog: Dialog) => {
            await dialog.dismiss();
        });
        await page.goto(process.env.BASE_URL, {waitUntil: 'networkidle0'});

        const auth: Auth = await new AuthScraper(page, dto).scrape();

        const customer: Customer = await new CustomerScraper(page, auth).scrape();

        const accounts: Account[] = await new AccountScraper(page, customer).scrape();

        const accountTransactions: Map<Account, Transaction[]> = new Map();

        for (const account of accounts) {
            const transactions: Transaction[] = await new TransactionScaper(page, account).scrape();
            account.numberOfTransactions = transactions.length;
            accountTransactions.set(account, transactions);
        }

        await new LogoutScraper(page).scrape();

        await browser.close();

        const scrapeData: ScrapeData = this.format({auth, customer, accounts, accountTransactions});

        return this.persistData(scrapeData, customerBank);
    }

    async findBankById(id: string): Promise<Bank> {
        const res = await this.bankRepository.findById(id);
        if (!res) {
            throw new BadRequestException(`Bank with id: ${id} does not exist`);
        }
        return new Bank().fromSchema(res);
    }

    async persistData(scrapeData: ScrapeData, customerBank: Bank): Promise<ScrapePojo> {
        scrapeData.customer.bank = customerBank;

        const savedAuth: InsertOneResult<AuthSchema> = await this.authRepository.insertOne(scrapeData.auth.toSchema());
        scrapeData.auth.id = savedAuth.insertedId.toString();

        const savedCustomer: InsertOneResult<CustomerSchema> = await this.customerRepository.insertOne(scrapeData.customer.toSchema());
        scrapeData.customer.id = savedCustomer.insertedId.toString();

        const savedAccounts: InsertManyResult<AccountSchema> = await this.accountRepository.insertMany(scrapeData.accounts.map(account => account.toSchema()));
        Object.keys(savedAccounts.insertedIds).map((k, index) => {
            scrapeData.accounts[index].id = savedAccounts.insertedIds[index].toString();
        });

        for (const account of scrapeData.accounts) {
            const transactions: Transaction[] = scrapeData.accountTransactions.get(account)!;
            const savedTransactions: InsertManyResult<TransactionSchema> = await this.transactionRepository.insertMany(transactions.map(transaction => transaction.toSchema()));
            Object.keys(savedTransactions.insertedIds).map((k, index) => {
                transactions[index].id = savedTransactions.insertedIds[index].toString();
                scrapeData.accountTransactions.set(account, transactions);
            });
        }

        return this.formatterService.format(scrapeData);
    }

    format(u: { auth: Auth, customer: Customer, accounts: Account[], accountTransactions: Map<Account, Transaction[]> }): ScrapeData {
        const scrapeData: ScrapeData = new ScrapeData();
        scrapeData.auth = u.auth;
        scrapeData.customer = u.customer;
        scrapeData.accounts = u.accounts;
        scrapeData.accountTransactions = u.accountTransactions;
        return scrapeData;
    }
}
