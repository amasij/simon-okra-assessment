import {Repository} from "./repository";
import {DbClient} from "./db.client";
import {AuthSchema} from "../schema/auth.shema";
import {Inject, Injectable} from "@nestjs/common";
import {Constants} from "../constants/constants";

@Injectable()
export class AuthRepository extends Repository<AuthSchema> {

    constructor(protected readonly dbClient: DbClient,
                @Inject(Constants.AUTH_COLLECTION) protected readonly collectionName: string) {
        super(dbClient, collectionName);
    }
}
