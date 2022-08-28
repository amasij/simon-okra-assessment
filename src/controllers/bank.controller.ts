import {Body, Controller, Post} from "@nestjs/common";
import {BankCreationDto} from "../domain/dto/bank-creation.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {BankCreationPojo} from "../domain/pojo/bank-creation.pojo";

@ApiTags('banks')
@Controller('/banks')
export class BankController {
    constructor() {
    }

    @Post()
    @ApiOperation({summary: 'Create bank'})
    @ApiResponse({status: 200, description: 'Bank created.', type: BankCreationPojo})
    async createOrganization(@Body() bankCreationDto: BankCreationDto) {
        return {data: 'Bank created'}
    }
}
