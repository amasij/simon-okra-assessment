import {Document} from "bson";
import {BaseSchema} from "./base.schema";

export interface BankSchema extends Document, BaseSchema {
    name: string
}
