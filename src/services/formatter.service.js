"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FormatterService = void 0;
var common_1 = require("@nestjs/common");
var FormatterService = /** @class */ (function () {
    function FormatterService() {
    }
    FormatterService.prototype.format = function (data) {
        var response = {};
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
        response.accounts = data.accounts.map(function (account) {
            var recentTransactions = data.accountTransactions.get(account).slice(0, 10);
            return {
                id: account.id,
                availableBalance: account.availableBalance,
                ledgerBalance: account.ledgerBalance,
                currency: account.currency,
                type: account.type,
                numberOfTransactions: account.numberOfTransactions,
                dateCreated: account.dateCreated,
                recentTransactions: recentTransactions.map(function (transaction) {
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
                })
            };
        });
        return response;
    };
    FormatterService.prototype.redactSensitiveData = function (data) {
        var str = data.split('');
        for (var i = 2; i < 7; i++) {
            str[i] = 'X';
        }
        return str.join('');
    };
    FormatterService = __decorate([
        (0, common_1.Injectable)()
    ], FormatterService);
    return FormatterService;
}());
exports.FormatterService = FormatterService;
