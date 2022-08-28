import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {BankCreationPojo} from "../domain/pojo/bank-creation.pojo";

@ApiTags('Accounts')
@Controller('/accounts')
export class AccountController {
    constructor() {
    }

    @Get(':id')
    @ApiOperation({summary: 'Get customer accounts'})
    @ApiResponse({status: 200, description: 'Returns customer accounts.'})
    async getCustomerDetails(@Param('id') customerId: string) {
        return {customerId}
    }
}
