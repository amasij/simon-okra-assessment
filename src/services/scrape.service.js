"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.ScrapeService = void 0;
var common_1 = require("@nestjs/common");
var scrape_data_model_1 = require("../models/scrape-data.model");
var transaction_scaper_1 = require("../scrapers/transaction.scaper");
var auth_scraper_1 = require("../scrapers/auth.scraper");
var account_scraper_1 = require("../scrapers/account.scraper");
var customer_scraper_1 = require("../scrapers/customer.scraper");
var puppeteer = require('puppeteer');
var ScrapeService = /** @class */ (function () {
    function ScrapeService(formatterService) {
        this.formatterService = formatterService;
    }
    ScrapeService.prototype.scrape = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var browser, page, auth, customer, accounts, accountTransactions, _i, accounts_1, account, transactions, scrapeData;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, puppeteer.launch({ headless: false })];
                    case 1:
                        browser = _a.sent();
                        return [4 /*yield*/, browser.newPage()];
                    case 2:
                        page = _a.sent();
                        page.on('dialog', function (dialog) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, dialog.dismiss()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, page.goto(process.env.BASE_URL, { waitUntil: 'networkidle0' })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, new auth_scraper_1.AuthScraper(page, dto).scrape()];
                    case 4:
                        auth = _a.sent();
                        return [4 /*yield*/, new customer_scraper_1.CustomerScraper(page, auth).scrape()];
                    case 5:
                        customer = _a.sent();
                        return [4 /*yield*/, new account_scraper_1.AccountScraper(page, customer).scrape()];
                    case 6:
                        accounts = _a.sent();
                        accountTransactions = new Map();
                        _i = 0, accounts_1 = accounts;
                        _a.label = 7;
                    case 7:
                        if (!(_i < accounts_1.length)) return [3 /*break*/, 10];
                        account = accounts_1[_i];
                        return [4 /*yield*/, new transaction_scaper_1.TransactionScaper(page, account).scrape()];
                    case 8:
                        transactions = _a.sent();
                        account.numberOfTransactions = transactions.length;
                        accountTransactions.set(account, transactions);
                        _a.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 7];
                    case 10: return [4 /*yield*/, browser.close()];
                    case 11:
                        _a.sent();
                        scrapeData = this.format({ auth: auth, customer: customer, accounts: accounts, accountTransactions: accountTransactions });
                        return [2 /*return*/, this.formatterService.format(scrapeData)];
                }
            });
        });
    };
    ScrapeService.prototype.format = function (u) {
        var scrapeData = new scrape_data_model_1.ScrapeData();
        scrapeData.auth = u.auth;
        scrapeData.customer = u.customer;
        scrapeData.accounts = u.accounts;
        scrapeData.accountTransactions = u.accountTransactions;
        return scrapeData;
    };
    ScrapeService = __decorate([
        (0, common_1.Injectable)()
    ], ScrapeService);
    return ScrapeService;
}());
exports.ScrapeService = ScrapeService;
