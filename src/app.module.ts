import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {BankController} from "./controllers/bank.controller";
import {ScrapeController} from "./controllers/scrape.controller";
import {CustomerController} from "./controllers/customer.controller";

@Module({
    imports: [],
    controllers: [
        AppController,
        BankController,
        ScrapeController,
        CustomerController
    ],
    providers: [AppService],
})
export class AppModule {
}
