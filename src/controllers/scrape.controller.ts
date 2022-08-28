import {Body, Controller, Post} from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ScrapeDto} from "../domain/dto/scrape.dto";

@ApiTags('Scrape')
@Controller('/scrape')
export class ScrapeController {
    constructor() {
    }

    @Post()
    @ApiOperation({summary: 'Scrape customer by bank'})
    @ApiResponse({status: 200, description: 'Customer information.'})
    async scrapeCustomer(@Body() scrapeDto: ScrapeDto) {
        return {data: 'customer details'}
    }
}
