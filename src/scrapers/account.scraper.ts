import {Page} from "puppeteer";
import {PageController} from "../services/page-controller.service";
import {Scraper} from "../interfaces/scraper.interface";
import {Account} from "../models/account.model";
import {Customer} from "../models/customer.model";


export class AccountScraper extends PageController implements Scraper<Account[]> {
    private readonly customer: Customer;

    constructor(page: Page, customer: Customer) {
        super(page);
        this.customer = customer;
    }

    async scrape(): Promise<Account[]> {
        console.info('Scraping Account....');
        const accountsXPath: string = '//*[@id="root"]/main/section';
        const elements = await this.waitForAndGetXPath(accountsXPath);
        const summaries: string[] = await elements[0].$$eval('section', e => e.map(x => x.innerText));
        const transactionURLs: (string | null)[] = await elements[0].$$eval('section div a', e => e.map(x => x.getAttribute('href')));
        const accountSummaries: AccountSummary[] = this.parseAccountSummary(summaries);
        console.info('Scraping Account....(DONE)\n');
        return accountSummaries.map((summary: AccountSummary, index: number) => {
            const account: Account = new Account();
            account.availableBalance = summary.availableBalance;
            account.type = summary.type;
            account.currency = summary.currency;
            account.ledgerBalance = summary.ledgerBalance;
            account.transactionsURL = transactionURLs[index] ?? '';
            account.customer = this.customer;
            return account;
        });
    }

    private parseAccountSummary(summaries: string[]): AccountSummary[] {
        return summaries.map(summary => {
            const accountSummary: AccountSummary = {} as AccountSummary;
            const [accountType, availableBalance, ledgerBalance, _] = summary.split('\n\n');
            accountSummary.type = this.formatAccountType(accountType) == 'savings' ? 'SAVINGS' : 'CHECKING';
            accountSummary.currency = this.formatCurrency(availableBalance);
            accountSummary.availableBalance = this.formatBalance(availableBalance);
            accountSummary.ledgerBalance = this.formatBalance(ledgerBalance);
            return accountSummary;
        });
    }

    private formatAccountType(accountType: string): string {
        return accountType.toLowerCase().replace('account', '').trim();
    }

    private formatCurrency(availableBalance: string): string {
        return availableBalance.split(' ')[0];
    }

    private formatBalance(balance: string): number {
        const amount: string = balance.split(' ')[1];
        return parseFloat(amount);
    }

}

export interface AccountSummary {
    type: 'SAVINGS' | 'CHECKING';
    availableBalance: number;
    ledgerBalance: number;
    currency: string;
}
