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
exports.TransactionScaper = void 0;
var page_controller_service_1 = require("../services/page-controller.service");
var transaction_model_1 = require("../models/transaction.model");
var TransactionScaper = /** @class */ (function (_super) {
    __extends(TransactionScaper, _super);
    function TransactionScaper(page, account) {
        var _this = _super.call(this, page) || this;
        _this.paginationDelayInMs = 4000;
        _this.account = account;
        return _this;
    }
    TransactionScaper.prototype.scrape = function () {
        return __awaiter(this, void 0, void 0, function () {
            var customer, transactionData, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.info('Scraping Transactions for [' + this.account.type + ' Account (' + this.account.currency + ')]....(Might take a while)');
                        customer = this.account.customer;
                        return [4 /*yield*/, this.click("//a[contains(., '" + customer.firstName.toLowerCase() + "')]", 'Click user name to go to dashboard')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.waitForAndGetXPath('//*[@id="root"]/main/div/h1', "Make sure the dashboard is loaded")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.click("//a[contains(@href,'" + this.account.transactionsURL + "')]", 'Click view transaction link for this account')];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.waitForAndGetXPath('//*[@id="root"]/main/section/div[1]/table')];
                    case 4:
                        _a.sent();
                        transactionData = [];
                        return [4 /*yield*/, this.pollTableData()];
                    case 5:
                        data = _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!data.length) return [3 /*break*/, 10];
                        transactionData.push(data);
                        return [4 /*yield*/, this.click("//button[contains(., 'Next')]", 'Click next button')];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.delay(this.paginationDelayInMs)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.pollTableData()];
                    case 9:
                        data = _a.sent();
                        return [3 /*break*/, 6];
                    case 10:
                        console.info('Scraping Transactions for [' + this.account.type + ' Account (' + this.account.currency + ')]....(DONE)\n');
                        return [2 /*return*/, this.formatTransactionData(transactionData)];
                }
            });
        });
    };
    TransactionScaper.prototype.formatTransactionData = function (transactionData) {
        var _this = this;
        var transactions = [];
        transactionData.forEach(function (data) {
            data.forEach(function (x) {
                var type = x[0], clearedDate = x[1], description = x[2], amount = x[3], beneficiary = x[4], sender = x[5];
                var transaction = new transaction_model_1.Transaction();
                transaction.clearedDate = new Date(clearedDate);
                transaction.account = _this.account;
                transaction.sender = sender;
                transaction.description = description;
                transaction.type = type.toLowerCase() == 'credit' ? 'CREDIT' : 'DEBIT';
                transaction.amount = parseFloat(amount.replace(_this.account.currency, ''));
                transaction.beneficiary = beneficiary;
                transactions.push(transaction);
            });
        });
        return transactions.sort(this.orderByDate);
    };
    TransactionScaper.prototype.orderByDate = function (a, b) {
        return a.clearedDate.getTime() - b.clearedDate.getTime();
    };
    TransactionScaper.prototype.pollTableData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function () { return Array.from(document.querySelectorAll('table > tbody > tr'), function (row) { return Array.from(row.querySelectorAll('th, td'), function (cell) { return cell.innerHTML; }); }); })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.filter(function (arr) { return arr.length; })];
                }
            });
        });
    };
    return TransactionScaper;
}(page_controller_service_1.PageController));
exports.TransactionScaper = TransactionScaper;
