import {BaseModel} from "./base.model";
import {Schemalizable} from "../interfaces/schemalizable.interface";
import {AccountSchema} from "../schema/account.schema";
import {Customer} from "./customer.model";


export class Account extends BaseModel implements Schemalizable<AccountSchema> {
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
}


