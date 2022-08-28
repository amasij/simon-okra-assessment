import {CustomerSchema} from "../schema/customer.schema";
import {BaseModel} from "./base.model";
import {Bank} from "./bank.model";
import {Schemalizable} from "../interfaces/schemalizable.interface";
import {Auth} from "./auth.model";

export class Customer extends BaseModel implements Schemalizable<Customer,CustomerSchema> {
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

    fromSchema(schema:CustomerSchema):Customer{
        const customer:Customer = new Customer();
        customer.id = schema['_id'].toString();
        customer.bvn = schema.bvn;
        customer.firstName = schema.firstName;
        customer.lastName = schema.lastName;
        customer.address = schema.address;
        customer.bank = new Bank().fromSchema(schema.bank);
        customer.auth = new Auth().fromSchema(schema.auth);
        customer.dateCreated = schema.dateCreated;
        customer.phoneNumber = schema.phoneNumber;
        return customer;

    }
}


