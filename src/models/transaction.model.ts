import {TransactionSchema} from "../schema/transaction.schema";
import {BaseModel} from "./base.model";
import {Account} from "./account.model";
import {Schemalizable} from "../interfaces/schemalizable.interface";

export class Transaction extends BaseModel implements Schemalizable<TransactionSchema> {
    type!: 'CREDIT' | 'DEBIT';
    clearedDate!: Date;
    description!: string;
    account!: Account;
    amount!: number;
    beneficiary!: string;
    sender!: string;

    toSchema(): TransactionSchema {
        return {
            type: this.type,
            clearedDate: this.clearedDate,
            description: this.description,
            amount: this.amount,
            beneficiary: this.beneficiary,
            sender: this.sender,
            dateCreated: this.dateCreated,
            account: {
                ...this.account.toSchema(),
                id: this.account.id
            }
        };
    }
}


