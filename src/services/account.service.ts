import {Injectable} from "@nestjs/common";
import {AccountRepository} from "../repository/account.repository";
import {Account} from "../models/account.model";

@Injectable()
export class AccountService {

    constructor(private readonly accountRepository:AccountRepository,) {
    }

    async getCustomerAccounts(customerId:string): Promise<Account[]> {
       return await this.accountRepository.findAccountsByCustomerId(customerId);
    }

}
