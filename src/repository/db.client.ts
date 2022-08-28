import {Db, MongoClient} from "mongodb";
import {ConfigService} from "@nestjs/config";
import {Injectable} from "@nestjs/common";

@Injectable()
export class DbClient {
    private static client: MongoClient;
    private readonly username: string;
    private readonly password: string;
    private readonly databaseName: string;
    private readonly host: string;

    constructor(private readonly configService: ConfigService) {
        this.username = this.configService.get<string>('DATABASE_USERNAME')!;
        this.password = this.configService.get<string>('DATABASE_PASSWORD')!;
        this.databaseName = this.configService.get<string>('DATABASE_NAME')!;
        this.host = this.configService.get<string>('DATABASE_HOST')!;
    }


    private get client(): MongoClient {
        if (!DbClient.client) {
            const uri: string = `mongodb+srv://${this.username}:${this.password}@${this.host}/${this.databaseName}?retryWrites=true&w=majority`;
            DbClient.client = new MongoClient(uri);
        }
        return DbClient.client;
    }

    get database(): Db {
        return this.client.db(this.databaseName);
    }

    async close() {
        await this.client.close();
    }
}
