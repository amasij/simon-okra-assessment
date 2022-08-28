import {Document} from "bson";
import {BaseSchema} from "./base.schema";
import {AuthSchema} from "./auth.shema";
import {BankSchema} from "./bank.schema";

export interface CustomerSchema extends Document, BaseSchema {
    firstName: string;
    lastName: string;
    address: string;
    bvn: string;
    phoneNumber: string;
    dateCreated: Date;
    auth: AuthSchema
    bank: BankSchema
}
