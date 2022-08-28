
import bcrypt from "bcrypt";
import {AuthSchema} from "../schema/auth.shema";
import {Schemalizable} from "../interfaces/schemalizable.interface";
import {BaseModel} from "./base.model";

export class Auth extends BaseModel implements Schemalizable<AuthSchema> {
    email!: string;
    password!: string;
    private readonly loginTime: Date = new Date();
    private readonly otp: string = process.env.OTP!;

    setEmail(email: string): Auth {
        this.email = email;
        return this;
    }

    setPassword(password: string): Auth {
        this.password = this.hashPassword(password);
        return this;
    }

    toSchema(): AuthSchema {
        return {
            email: this.email,
            password: this.password,
            loginTime: this.loginTime,
            otp: this.otp,
            dateCreated: this.dateCreated
        } as AuthSchema;
    }

    private hashPassword(plainPassword: string): string {
        return bcrypt.hashSync(plainPassword, 15)
    }
}

