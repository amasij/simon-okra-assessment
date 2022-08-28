import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Param, Post} from "@nestjs/common";

@ApiTags('Customer')
@Controller('/customers')
export class CustomerController {
    constructor() {
    }

    @Get(':id')
    @ApiOperation({summary: 'Get customer details'})
    @ApiResponse({status: 200, description: 'Returns customer details.'})
    async getCustomerDetails(@Param('id') customerId: string) {
        return {customerId}
    }
}
