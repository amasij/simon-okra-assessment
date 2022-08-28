import {Document} from "bson";
import {BaseSchema} from "./base.schema";

export interface TransactionSchema extends Document, BaseSchema {
    type: 'CREDIT' | 'DEBIT';
    clearedDate: Date;
    description: string;
    account: {
        id: string;
        dateCreated: Date;
        availableBalance: number;
        ledgerBalance: number;
        currency: string;
        type: 'SAVINGS' | 'CHECKING';
    };
    amount: number;
    beneficiary: string;
    sender: string;
}
