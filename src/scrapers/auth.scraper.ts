import {Page} from "puppeteer";
import {PageController} from "../services/page-controller.service";
import {Scraper} from "../interfaces/scraper.interface";
import {Auth} from "../models/auth.model";
import {ScrapeDto} from "../domain/dto/scrape.dto";
import {BadRequestException} from "@nestjs/common";

export class AuthScraper extends PageController implements Scraper<Auth> {
    private readonly otp: string = process.env.OTP ?? '';
    private readonly scrapeDto: ScrapeDto;

    constructor(page: Page, scrapeDto: ScrapeDto) {
        super(page);
        this.scrapeDto = scrapeDto;
    }

    async scrape(): Promise<Auth> {
        console.info('Scraping Auth...');

        const submitButtonXPath: string = "//button[contains(., 'Submit')]";

        await this.click("//a[contains(., 'Login')]", 'Click login link');

        await this.write('#email', this.scrapeDto.customerEmail);
        await this.write('#password', this.scrapeDto.customerPassword);
        await this.click(submitButtonXPath, 'Click submit button');

        await this.waitFor('#otp',10000).catch(e => {
            throw new BadRequestException("Invalid login credentials");
        });
        await this.write('#otp', this.otp);
        await this.click(submitButtonXPath, 'Click submit button');

        console.info('Scraping Auth....(DONE)\n');

        return new Auth()
            .setEmail(this.scrapeDto.customerEmail)
            .setPassword(this.scrapeDto.customerPassword);
    }


}
