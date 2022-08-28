import {Body, Controller, Post} from "@nestjs/common";
import {BankCreationDto} from "../domain/dto/bank-creation.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {BankCreationPojo} from "../domain/pojo/bank-creation.pojo";
import {BankService} from "../services/bank.service";

@ApiTags('banks')
@Controller('/banks')
export class BankController {
    constructor(private readonly bankService: BankService) {
    }

    @Post()
    @ApiOperation({summary: 'Create bank'})
    @ApiResponse({status: 201, description: 'Bank created.', type: BankCreationPojo})
    async createOrganization(@Body() bankCreationDto: BankCreationDto):Promise<BankCreationPojo> {
        return this.bankService.createBank(bankCreationDto);
    }
}
