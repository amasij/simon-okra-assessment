"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var bank_controller_1 = require("./controllers/bank.controller");
var scrape_controller_1 = require("./controllers/scrape.controller");
var customer_controller_1 = require("./controllers/customer.controller");
var scrape_service_1 = require("./services/scrape.service");
var formatter_service_1 = require("./services/formatter.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [],
            controllers: [
                app_controller_1.AppController,
                bank_controller_1.BankController,
                scrape_controller_1.ScrapeController,
                customer_controller_1.CustomerController
            ],
            providers: [
                app_service_1.AppService,
                scrape_service_1.ScrapeService,
                formatter_service_1.FormatterService
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
