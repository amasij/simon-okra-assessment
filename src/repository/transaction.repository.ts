import {Repository} from "./repository";
import {DbClient} from "./db.client";
import {TransactionSchema} from "../schema/transaction.schema";
import {Inject, Injectable} from "@nestjs/common";
import {Constants} from "../constants/constants";

@Injectable()
export class TransactionRepository extends Repository<TransactionSchema> {

    constructor(protected readonly dbClient: DbClient,
                @Inject(Constants.TRANSACTION_COLLECTION) protected readonly collectionName: string) {
        super(dbClient, collectionName);
    }
}
