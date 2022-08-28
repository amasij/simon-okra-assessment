import {Injectable} from "@nestjs/common";
import {BankCreationDto} from "../domain/dto/bank-creation.dto";
import {BankRepository} from "../repository/bank.repository";
import {BankSchema} from "../schema/bank.schema";
import {ModifyResult} from "mongodb";
import {Bank} from "../models/bank.model";
import {BankCreationPojo} from "../domain/pojo/bank-creation.pojo";

@Injectable()
export class BankService {

    constructor(private readonly bankRepository:BankRepository) {
    }

    async createBank(bankCreationDto: BankCreationDto): Promise<BankCreationPojo> {
        const bank: Bank = new Bank();
        bank.name = bankCreationDto.name;
        const savedBank: ModifyResult<BankSchema> = await this.bankRepository.insertIfNotExist(bank);
        const pojo: BankCreationPojo = new BankCreationPojo();
        pojo.name = savedBank.value!['name'];
        pojo.id = savedBank.value!['_id'].toString();
        pojo.dateCreated = savedBank.value!['dateCreated'];
        return pojo;
    }

}
