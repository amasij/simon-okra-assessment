import {Document} from "bson";
import {BaseSchema} from "./base.schema";
import {CustomerSchema} from "./customer.schema";

export interface AccountSchema extends Document, BaseSchema {
    availableBalance: number;
    ledgerBalance: number;
    currency: string;
    type: 'SAVINGS' | 'CHECKING';
    numberOfTransactions:number;
    customer: CustomerSchema;

}
