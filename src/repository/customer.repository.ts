import {Repository} from "./repository";
import {DbClient} from "./db.client";
import {CustomerSchema} from "../schema/customer.schema";
import {Inject, Injectable} from "@nestjs/common";
import {Constants} from "../constants/constants";

@Injectable()
export class CustomerRepository extends Repository<CustomerSchema> {

    constructor(protected readonly dbClient: DbClient,
                @Inject(Constants.CUSTOMER_COLLECTION) protected readonly collectionName: string) {
        super(dbClient, collectionName);
    }

}
