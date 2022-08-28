import {BaseSchema} from "./base.schema";

export interface AuthSchema extends Document, BaseSchema {
    email: string;
    password: string;
    loginTime: Date;
    otp: string;
}
