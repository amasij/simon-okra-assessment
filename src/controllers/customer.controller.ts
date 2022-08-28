import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {CustomerService} from "../services/customer.service";
import {Customer} from "../models/customer.model";

@ApiTags('Customer')
@Controller('/customers')
export class CustomerController {
    constructor(private readonly customerService:CustomerService) {
    }

    @Get(':id')
    @ApiOperation({summary: 'Get customer details'})
    @ApiResponse({status: 200, description: 'Returns customer details.'})
    async getCustomerDetails(@Param('id') customerId: string):Promise<Customer> {
        return this.customerService.getCustomerDetails(customerId);
    }
}
