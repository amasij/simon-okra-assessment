import {Page} from "puppeteer";
import {PageController} from "../services/page-controller.service";
import {Scraper} from "../interfaces/scraper.interface";

export class LogoutScraper extends PageController implements Scraper<void> {

    constructor(page: Page) {
        super(page);
    }

    async scrape(): Promise<void> {
        console.info('Logging out...');

        await this.click("//a[contains(., 'Sign out')]", 'Click logout link');

        await this.delay(2000);

        console.info('Logging out....(DONE)\n');

    }


}
