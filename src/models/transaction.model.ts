import {TransactionSchema} from "../schema/transaction.schema";
import {BaseModel} from "./base.model";
import {Account} from "./account.model";
import {Schemalizable} from "../interfaces/schemalizable.interface";

export class Transaction extends BaseModel implements Schemalizable<Transaction, TransactionSchema> {
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

    fromSchema(schema: TransactionSchema): Transaction {
        const transaction: Transaction = new Transaction();
        transaction.id = schema.id!;
        transaction.dateCreated = schema.dateCreated;
        transaction.amount = schema.amount;
        transaction.type = schema.type;
        transaction.beneficiary = schema.beneficiary;
        transaction.sender = schema.sender;
        transaction.clearedDate = schema.clearedDate;
        transaction.description = schema.description;
        transaction.account = this.getAccount(schema);
        return transaction;
    }

    private getAccount(schema: TransactionSchema): Account {
        const account: Account = new Account();
        account.id = schema.account.id!;
        account.currency = schema.account.currency;
        account.type = schema.account.type;
        account.ledgerBalance = schema.account.ledgerBalance;
        account.availableBalance = schema.account.availableBalance;
        account.dateCreated = schema.account.dateCreated;
        return account;
    }
}


