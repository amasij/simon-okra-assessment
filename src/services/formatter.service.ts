import {Formatter} from "../interfaces/formatter.interface";
import {ScrapePojo} from "../domain/pojo/scrape.pojo";
import {ScrapeData} from "../models/scrape-data.model";
import {Transaction} from "../models/transaction.model";
import {Injectable} from "@nestjs/common";

@Injectable()
export class FormatterService implements Formatter<ScrapePojo, ScrapeData> {
    format(data: ScrapeData): ScrapePojo {
        const response: ScrapePojo = {} as ScrapePojo;
        response.customer = {
            id: data.customer.id,
            address: data.customer.address,
            bvn: this.redactSensitiveData(data.customer.bvn),
            dateCreated: data.customer.dateCreated,
            email: data.auth.email,
            firstName: data.customer.firstName,
            lastName: data.customer.lastName,
            phoneNumber: data.customer.phoneNumber,
            bank: {
                id: data.customer.bank.id,
                name: data.customer.bank.name,
                dateCreated: data.customer.bank.dateCreated
            }
        };

        response.accounts = data.accounts.map(account => {
            const recentTransactions: Transaction[] = data.accountTransactions.get(account)!.slice(0, 10);
            return {
                id: account.id,
                availableBalance: account.availableBalance,
                ledgerBalance: account.ledgerBalance,
                currency: account.currency,
                type: account.type,
                numberOfTransactions: account.numberOfTransactions,
                dateCreated: account.dateCreated,
                recentTransactions: recentTransactions.map(transaction => {
                    return {
                        id: transaction.id,
                        type: transaction.type,
                        clearedDate: transaction.clearedDate,
                        description: transaction.description,
                        amount: transaction.amount,
                        beneficiary: transaction.beneficiary,
                        sender: transaction.sender,
                        dateCreated: transaction.dateCreated
                    };
                }),
            }
        })
        return response;
    }

    public redactSensitiveData(data: string): string {
        let str = data.split('');
        for (let i = 2; i < 7; i++) {
            str[i] = 'X';
        }
        return str.join('');
    }

}
