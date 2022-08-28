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

}

