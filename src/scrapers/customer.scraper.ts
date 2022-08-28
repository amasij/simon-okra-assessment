import {Page} from "puppeteer";
import {PageController} from "../services/page-controller.service";
import {Customer} from "../models/customer.model";
import {Scraper} from "../interfaces/scraper.interface";
import {Auth} from "../models/auth.model";
import {Utils} from "../utils/utils";

export class CustomerScraper extends PageController implements Scraper<Customer> {
    private readonly auth: Auth;

    constructor(page: Page, auth: Auth) {
        super(page);
        this.auth = auth;
    }

    async scrape(): Promise<Customer> {
        console.info('Scraping Customer....');
        const fullName: FullName = await this.getFullName();
        const otherDetails: OtherDetails = await this.getOtherDetails();
        console.info('Scraping Customer....(DONE)\n');
        return this.setCustomer(fullName, otherDetails)
    }

    private setCustomer(fullName: FullName, otherDetails: OtherDetails): Customer {
        const customer: Customer = new Customer();
        customer.firstName = fullName.firstName;
        customer.lastName = fullName.lastName;
        customer.bvn = otherDetails.bvn;
        customer.address = otherDetails.address;
        customer.phoneNumber = otherDetails.phone;
        customer.auth = this.auth;
        return customer;
    }

    private async getOtherDetails(): Promise<OtherDetails> {
        const elements = await this.waitForAndGetXPath('//*[@id="root"]/main/div/div');
        const details: string[] = await elements[0].$$eval('p', e => e.map(x => x.innerText));
        return this.parseOtherDetails(details);
    }

    private parseOtherDetails(details: string[]): OtherDetails {
        const otherDetails: OtherDetails = {} as OtherDetails;
        details.forEach(info => {
            const [key, value] = info.split(':');
            switch (key.toLowerCase()) {
                case 'address':
                    otherDetails.address = value.trim();
                    break;
                case 'bvn':
                    otherDetails.bvn = value.trim();
                    break;
                case 'phone':
                    otherDetails.phone = value.trim();
                    break;
            }
        });
        return otherDetails;
    }

    private async getFullName(): Promise<FullName> {
        const elements = await this.waitForAndGetXPath('//*[@id="root"]/main/div/h1');
        const headerText = await this.page.evaluate((el) => el.textContent, elements[0]);
        return this.parseFullName(headerText!);

    }

    private parseFullName(text: string): FullName {
        const strippedText = text.toLowerCase().replace('welcome back', '').replace('!', '').trim();
        const names: string[] = strippedText.split(' ').map(name => Utils.capitalize(name));
        return {firstName: names[0], lastName: names[1]};
    }


}

export interface FullName {
    firstName: string;
    lastName: string;
}

export interface OtherDetails {
    bvn: string;
    address: string;
    phone: string;
}
