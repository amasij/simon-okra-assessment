import {BaseModel} from "./base.model";
import {Schemalizable} from "../interfaces/schemalizable.interface";
import {AccountSchema} from "../schema/account.schema";
import {Customer} from "./customer.model";


export class Account extends BaseModel implements Schemalizable<Account,AccountSchema> {
    availableBalance!: number;
    ledgerBalance!: number;
    currency!: string;
    type!: 'SAVINGS' | 'CHECKING';
    transactionsURL!: string;
    customer!: Customer;
    numberOfTransactions!: number;

    toSchema(): AccountSchema {
        return {
            availableBalance: this.availableBalance,
            ledgerBalance: this.ledgerBalance,
            currency: this.currency,
            type: this.type,
            dateCreated: this.dateCreated,
            numberOfTransactions: this.numberOfTransactions,
            customer: {...this.customer.toSchema(), id: this.customer.id}
        };
    }

    fromSchema(schema: AccountSchema): Account {
        const account:Account = new Account();
        account.id = schema.id!;
        account.customer = new Customer().fromSchema(schema.customer);
        account.availableBalance = schema.availableBalance;
        account.ledgerBalance = schema.ledgerBalance;
        account.dateCreated = schema.dateCreated;
        account.currency = schema.currency;
        account.numberOfTransactions = schema.numberOfTransactions;
        account.type = schema.type;
        return account;
    }
}


