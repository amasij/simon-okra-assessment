export interface ScrapePojo {
    customer: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        address: string;
        bvn: string;
        dateCreated: Date;
        bank: {
            id: string;
            name: string;
            dateCreated: Date;
        }
    }
    accounts: {
        id: string;
        availableBalance: number;
        ledgerBalance: number;
        currency: string;
        type: 'SAVINGS' | 'CHECKING';
        numberOfTransactions: number;
        dateCreated: Date;
        recentTransactions: {
            id: string;
            type: 'CREDIT' | 'DEBIT';
            clearedDate: Date;
            description: string;
            amount: number;
            beneficiary: string;
            sender: string;
            dateCreated: Date;
        }[]
    }[]

}
