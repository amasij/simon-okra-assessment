import {BankSchema} from "../schema/bank.schema";
import {BaseModel} from "./base.model";
import {Schemalizable} from "../interfaces/schemalizable.interface";

export class Bank extends BaseModel implements Schemalizable<BankSchema> {
    name!: string;

    constructor(name:string) {
        super();
        this.name = name;
    }

    toSchema(): BankSchema {
        return {
            name: this.name,
            dateCreated: this.dateCreated
        };
    }

    static fromSchema(data:BankSchema):Bank{
        const bank:Bank = new Bank(data.name);
        bank.dateCreated = data.dateCreated;
        bank.id = data.id!;
        return bank;

    }

}

