import {Repository} from "./repository";
import {DbClient} from "./db.client";
import {AccountSchema} from "../schema/account.schema";
import {Inject} from "@nestjs/common";
import {Constants} from "../constants/constants";
import {WithId} from "mongodb";
import {Account} from "../models/account.model";

export class AccountRepository extends Repository<AccountSchema> {

    constructor(protected readonly dbClient: DbClient,
                @Inject(Constants.ACCOUNT_COLLECTION) protected readonly collectionName: string) {
        super(dbClient, collectionName);
    }

    async findAccountsByCustomerId(customerId:string):Promise<Account[]>{
        const filter =  { "customer.id": customerId };
        const accountSchemas:WithId<AccountSchema>[] =  await this.collection.find(filter).toArray();
        return accountSchemas.map(new Account().fromSchema);
    }
}
