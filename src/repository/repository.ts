import {DbClient} from "./db.client";
import {Collection, InsertManyResult, InsertOneResult, OptionalUnlessRequiredId, WithId} from "mongodb";
import {Document} from 'bson';
import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {Utils} from "../utils/utils";

const objectId = require('mongodb').ObjectId;

@Injectable()
export abstract class Repository<T extends Document> {
    protected readonly collection: Collection<T>;

    protected constructor(protected readonly dbClient: DbClient, collectionName: string) {
        this.dbClient = dbClient;
        this.collection = this.dbClient.database.collection<T>(collectionName);
    }

    async insertOne(data: OptionalUnlessRequiredId<T>): Promise<InsertOneResult<T>> {
        return await this.collection.insertOne(data);
    }

    async insertMany(data: OptionalUnlessRequiredId<T>[]): Promise<InsertManyResult<T>> {
        return this.collection.insertMany(data);
    }

    async findById(id: string, modelName?: string): Promise<WithId<T>> {
        Utils.validateMongoId(id, modelName);
        const value = await this.collection.findOne({_id: objectId(id)});
        if (!value) {
            throw new NotFoundException(`${modelName ? modelName + ' with ' : ''}id: ${id} not found`)
        }
        return value!;
    }

}
