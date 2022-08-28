import {Page} from "puppeteer";
import {PageController} from "../services/page-controller.service";
import {Transaction} from "../models/transaction.model";
import {Account} from "../models/account.model";
import {Customer} from "../models/customer.model";
import {Scraper} from "../interfaces/scraper.interface";

export class TransactionScaper extends PageController implements Scraper<Transaction[]> {
    private readonly account: Account;
    private readonly paginationDelayInMs: number = 4000;

    constructor(page: Page, account: Account) {
        super(page);
        this.account = account;
    }

    async scrape(): Promise<Transaction[]> {
        console.info('Scraping Transactions for [' + this.account.type + ' Account (' + this.account.currency + ')]....(Might take a while)');
        const customer: Customer = this.account.customer;
        await this.click("//a[contains(., '" + customer.firstName.toLowerCase() + "')]", 'Click user name to go to dashboard');
        await this.waitForAndGetXPath('//*[@id="root"]/main/div/h1', "Make sure the dashboard is loaded");
        await this.click("//a[contains(@href,'" + this.account.transactionsURL + "')]", 'Click view transaction link for this account')

        await this.waitForAndGetXPath('//*[@id="root"]/main/section/div[1]/table');
        const transactionData: string[][][] = []
        let data: string[][];
        data = await this.pollTableData();
        while (data.length) {
            transactionData.push(data);
            await this.click("//button[contains(., 'Next')]", 'Click next button');
            await this.delay(this.paginationDelayInMs);
            data = await this.pollTableData();
        }
        console.info('Scraping Transactions for [' + this.account.type + ' Account (' + this.account.currency + ')]....(DONE)\n');
        return this.formatTransactionData(transactionData);
    }

    private formatTransactionData(transactionData: string[][][]): Transaction[] {
        const transactions: Transaction[] = [];
        transactionData.forEach(data => {
            data.forEach(x => {
                const [type, clearedDate, description, amount, beneficiary, sender] = x;
                const transaction: Transaction = new Transaction();
                transaction.clearedDate = new Date(clearedDate);
                transaction.account = this.account;
                transaction.sender = sender;
                transaction.description = description;
                transaction.type = type.toLowerCase() == 'credit' ? 'CREDIT' : 'DEBIT';
                transaction.amount = parseFloat(amount.replace(this.account.currency, ''));
                transaction.beneficiary = beneficiary;
                transactions.push(transaction);
            });

        });
        return transactions.sort(this.orderByDate);
    }

    orderByDate(a: Transaction, b: Transaction): number {
        return a.clearedDate.getTime() - b.clearedDate.getTime();
    }

    private async pollTableData(): Promise<string[][]> {
        const data: string[][] = await this.page.evaluate(
            () => Array.from(
                document.querySelectorAll('table > tbody > tr'),
                row => Array.from(row.querySelectorAll('th, td'), cell => cell.innerHTML)
            )
        );
        return data.filter(arr => arr.length);
    }


}
