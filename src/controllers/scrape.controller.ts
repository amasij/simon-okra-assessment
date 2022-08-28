import {Body, Controller, Post} from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ScrapeDto} from "../domain/dto/scrape.dto";
import {ScrapeService} from "../services/scrape.service";

@ApiTags('Scrape')
@Controller('/scrape')
export class ScrapeController {
    constructor(private readonly scrapeService: ScrapeService,) {
    }

    @Post()
    @ApiOperation({summary: 'Scrape customer by bank'})
    @ApiResponse({status: 200, description: 'Customer information.'})
    async scrapeCustomer(@Body() scrapeDto: ScrapeDto) {
        return await this.scrapeService.scrape(scrapeDto);
    }
}
