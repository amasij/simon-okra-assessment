"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AccountScraper = void 0;
var page_controller_service_1 = require("../services/page-controller.service");
var account_model_1 = require("../models/account.model");
var AccountScraper = /** @class */ (function (_super) {
    __extends(AccountScraper, _super);
    function AccountScraper(page, customer) {
        var _this = _super.call(this, page) || this;
        _this.customer = customer;
        return _this;
    }
    AccountScraper.prototype.scrape = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accountsXPath, elements, summaries, transactionURLs, accountSummaries;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.info('Scraping Account....');
                        accountsXPath = '//*[@id="root"]/main/section';
                        return [4 /*yield*/, this.waitForAndGetXPath(accountsXPath)];
                    case 1:
                        elements = _a.sent();
                        return [4 /*yield*/, elements[0].$$eval('section', function (e) { return e.map(function (x) { return x.innerText; }); })];
                    case 2:
                        summaries = _a.sent();
                        return [4 /*yield*/, elements[0].$$eval('section div a', function (e) { return e.map(function (x) { return x.getAttribute('href'); }); })];
                    case 3:
                        transactionURLs = _a.sent();
                        accountSummaries = this.parseAccountSummary(summaries);
                        console.info('Scraping Account....(DONE)\n');
                        return [2 /*return*/, accountSummaries.map(function (summary, index) {
                                var _a;
                                var account = new account_model_1.Account();
                                account.availableBalance = summary.availableBalance;
                                account.type = summary.type;
                                account.currency = summary.currency;
                                account.ledgerBalance = summary.ledgerBalance;
                                account.transactionsURL = (_a = transactionURLs[index]) !== null && _a !== void 0 ? _a : '';
                                account.customer = _this.customer;
                                return account;
                            })];
                }
            });
        });
    };
    AccountScraper.prototype.parseAccountSummary = function (summaries) {
        var _this = this;
        return summaries.map(function (summary) {
            var accountSummary = {};
            var _a = summary.split('\n\n'), accountType = _a[0], availableBalance = _a[1], ledgerBalance = _a[2], _ = _a[3];
            accountSummary.type = _this.formatAccountType(accountType) == 'savings' ? 'SAVINGS' : 'CHECKING';
            accountSummary.currency = _this.formatCurrency(availableBalance);
            accountSummary.availableBalance = _this.formatBalance(availableBalance);
            accountSummary.ledgerBalance = _this.formatBalance(ledgerBalance);
            return accountSummary;
        });
    };
    AccountScraper.prototype.formatAccountType = function (accountType) {
        return accountType.toLowerCase().replace('account', '').trim();
    };
    AccountScraper.prototype.formatCurrency = function (availableBalance) {
        return availableBalance.split(' ')[0];
    };
    AccountScraper.prototype.formatBalance = function (balance) {
        var amount = balance.split(' ')[1];
        return parseFloat(amount);
    };
    return AccountScraper;
}(page_controller_service_1.PageController));
exports.AccountScraper = AccountScraper;
