import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {AccountService} from "../services/account.service";
import {Account} from "../models/account.model";

@ApiTags('Accounts')
@Controller('/accounts')
export class AccountController {
    constructor(private readonly accountService:AccountService) {
    }

    @Get(':id')
    @ApiOperation({summary: 'Get customer accounts'})
    @ApiResponse({status: 200, description: 'Returns customer accounts.'})
    async getCustomerAccountDetails(@Param('id') customerId: string):Promise<Account[]> {
        return this.accountService.getCustomerAccounts(customerId);
    }
}
