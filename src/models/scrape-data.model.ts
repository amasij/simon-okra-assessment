import {Customer} from "./customer.model";
import {Auth} from "./auth.model";
import {Account} from "./account.model";
import {Transaction} from "./transaction.model";

export class ScrapeData {
    auth!: Auth;
    customer!: Customer;
    accounts!: Account[];
    accountTransactions!: Map<Account, Transaction[]>;
}
