import {CustomerSchema} from "../schema/customer.schema";
import {BaseModel} from "./base.model";
import {Bank} from "./bank.model";
import {Schemalizable} from "../interfaces/schemalizable.interface";
import {Auth} from "./auth.model";

export class Customer extends BaseModel implements Schemalizable<CustomerSchema> {
    firstName!: string;
    lastName!: string;
    address!: string;
    bvn!: string;
    phoneNumber!: string;
    auth!: Auth;
    bank!: Bank;

    toSchema(): CustomerSchema {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            address: this.address,
            bvn: this.bvn,
            phoneNumber: this.phoneNumber,
            dateCreated: this.dateCreated,
            auth: {...this.auth.toSchema(), id: this.auth.id},
            bank: {...this.bank.toSchema(), id: this.bank.id}
        };
    }
}


