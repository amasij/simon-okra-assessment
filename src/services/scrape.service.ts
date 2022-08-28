import {Injectable} from '@nestjs/common';
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

const puppeteer = require('puppeteer');

@Injectable()
export class ScrapeService implements Scraper<ScrapePojo>, Formatter<ScrapeData, any> {
    constructor(private readonly formatterService: FormatterService,
                private readonly authRepository:AuthRepository,
                private readonly bankRepository:BankRepository,
                private readonly customerRepository:CustomerRepository,
                private readonly accountRepository:AccountRepository,
                private readonly transactionRepository:TransactionRepository,
                ) {}

    async scrape(dto: ScrapeDto): Promise<ScrapePojo> {
        const browser = await puppeteer.launch({headless: true});
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
        await browser.close();
        const scrapeData: ScrapeData = this.format({auth, customer, accounts, accountTransactions});
        return this.persistData(scrapeData);
    }

    async persistData(scrapeData: ScrapeData):Promise<ScrapePojo>{
        // const bank: Bank = new Bank('Zenith Bank');
        // const savedBank:ModifyResult<BankSchema> = await new BankRepository(dbClient).insertIfNotExist(bank);
        // bank.id = savedBank.value!['_id'].toString();
        // scrapeData.customer.bank = bank;
        //
        // const savedAuth: InsertOneResult<AuthSchema> = await new AuthRepository(dbClient).insertOne(scrapeData.auth.toSchema());
        // scrapeData.auth.id = savedAuth.insertedId.toString();
        //
        // const savedCustomer: InsertOneResult<CustomerSchema> = await new CustomerRepository(dbClient).insertOne(scrapeData.customer.toSchema());
        // scrapeData.customer.id = savedCustomer.insertedId.toString();
        //
        // const savedAccounts: InsertManyResult<AccountSchema> = await new AccountRepository(dbClient).insertMany(scrapeData.accounts.map(account => account.toSchema()));
        // Object.keys(savedAccounts.insertedIds).map((k, index) => {
        //     scrapeData.accounts[index].id = savedAccounts.insertedIds[index].toString();
        // });
        //
        // const transactionRepository: TransactionRepository = new TransactionRepository(dbClient);
        // for (const account of scrapeData.accounts) {
        //     const transactions: Transaction[] = scrapeData.accountTransactions.get(account)!;
        //     const savedTransactions: InsertManyResult<TransactionSchema> = await transactionRepository.insertMany(transactions.map(transaction => transaction.toSchema()));
        //     Object.keys(savedTransactions.insertedIds).map((k, index) => {
        //         transactions[index].id = savedTransactions.insertedIds[index].toString();
        //         scrapeData.accountTransactions.set(account, transactions);
        //     });
        // }

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
