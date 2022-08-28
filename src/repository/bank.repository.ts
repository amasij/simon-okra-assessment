import {Repository} from "./repository";
import {DbClient} from "./db.client";
import {ModifyResult} from "mongodb";
import {BankSchema} from "../schema/bank.schema";
import {Bank} from "../models/bank.model";
import {Inject, Injectable} from "@nestjs/common";
import {Constants} from "../constants/constants";

@Injectable()
export class BankRepository extends Repository<BankSchema> {

    constructor(protected readonly dbClient: DbClient,
                @Inject(Constants.BANK_COLLECTION) protected readonly collectionName: string) {
        super(dbClient, collectionName);
    }

    async insertIfNotExist(bank: Bank): Promise<ModifyResult<BankSchema>> {
        return await this.collection.findOneAndUpdate({name: bank.name}, {
            $setOnInsert: {
                ...bank.toSchema()
            }
        }, {upsert: true, returnDocument: 'after'});

    }

}
