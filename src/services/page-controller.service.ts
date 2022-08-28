import {Page} from "puppeteer";

export class PageController {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForAndGetXPath(xPath: string, description?: string) {
        await this.page.waitForXPath(xPath, {visible: true});
        return await this.page.$x(xPath);
    }

    async click(xPath: string, description?: string) {
        const clickable: any[] = await this.page.$x(xPath);
        await clickable[0].click();
    }

    async waitFor(selector: string, timeout: number = 30000) {
        await this.page.waitForSelector(selector, {timeout});
    }

    async write(selector: string, text: string) {
        await this.page.type(selector, text);
    }

    delay(timeInMs: number): Promise<any> {
        return new Promise(function (resolve) {
            setTimeout(resolve, timeInMs)
        });
    }
}
