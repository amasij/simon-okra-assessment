import {Injectable} from "@nestjs/common";
import {CustomerRepository} from "../repository/customer.repository";
import {CustomerSchema} from "../schema/customer.schema";
import {WithId} from "mongodb";
import {Customer} from "../models/customer.model";
import {FormatterService} from "./formatter.service";

@Injectable()
export class CustomerService {

    constructor(private readonly customerRepository:CustomerRepository,
                private readonly formatterService:FormatterService) {
    }

    async getCustomerDetails(customerId:string): Promise<Customer> {
        const customerSchema:WithId<CustomerSchema> =  await this.customerRepository.findById(customerId,'Customer');
        const customer:Customer = new Customer().fromSchema(customerSchema!);
        customer.bvn = this.formatterService.redactSensitiveData(customer.bvn);
        return customer;
    }
}
