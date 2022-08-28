import {Repository} from "./repository";
import {DbClient} from "./db.client";
import {AccountSchema} from "../schema/account.schema";
import {Inject} from "@nestjs/common";
import {Constants} from "../constants/constants";

export class AccountRepository extends Repository<AccountSchema> {

    constructor(protected readonly dbClient: DbClient,
                @Inject(Constants.ACCOUNT_COLLECTION) protected readonly collectionName: string) {
        super(dbClient, collectionName);
    }
}
