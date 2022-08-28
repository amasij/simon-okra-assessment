import {BankSchema} from "../schema/bank.schema";
import {BaseModel} from "./base.model";
import {Schemalizable} from "../interfaces/schemalizable.interface";

export class Bank extends BaseModel implements Schemalizable<Bank,BankSchema> {
    name!: string;

    constructor() {
        super();
    }
    toSchema(): BankSchema {
        return {
            name: this.name,
            dateCreated: this.dateCreated
        };
    }

     fromSchema(data:BankSchema):Bank{
        const bank:Bank = new Bank();
        bank.name = data.name;
        bank.dateCreated = data.dateCreated;
        bank.id = data.id!;
        return bank;

    }


}

