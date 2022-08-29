import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {BankController} from "./controllers/bank.controller";
import {ScrapeController} from "./controllers/scrape.controller";
import {CustomerController} from "./controllers/customer.controller";
import {ScrapeService} from "./services/scrape.service";
import {FormatterService} from "./services/formatter.service";
import {BankService} from "./services/bank.service";
import {ConfigModule} from "@nestjs/config";
import {DbClient} from "./repository/db.client";
import {BankRepository} from "./repository/bank.repository";
import {AuthRepository} from "./repository/auth.repository";
import {CustomerRepository} from "./repository/customer.repository";
import {AccountRepository} from "./repository/account.repository";
import {TransactionRepository} from "./repository/transaction.repository";
import {Constants} from "./constants/constants";
import {CustomerService} from "./services/customer.service";
import {AccountController} from "./controllers/account.controller";
import {AccountService} from "./services/account.service";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true})
    ],
    controllers: [
        AppController,
        BankController,
        ScrapeController,
        CustomerController,
        AccountController
    ],
    providers: [
        AppService,
        ScrapeService,
        FormatterService,
        BankService,
        CustomerService,
        AccountService,
        DbClient,
        BankRepository,
        AuthRepository,
        CustomerRepository,
        AccountRepository,
        TransactionRepository,
        {provide: Constants.CUSTOMER_COLLECTION, useValue: 'Customer',},
        {provide: Constants.BANK_COLLECTION, useValue: 'Bank',},
        {provide: Constants.AUTH_COLLECTION, useValue: 'Auth',},
        {provide: Constants.TRANSACTION_COLLECTION, useValue: 'Transaction',},
        {provide: Constants.ACCOUNT_COLLECTION, useValue: 'Account',},
    ],
})
export class AppModule {
}
