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
exports.__esModule = true;
exports.Auth = void 0;
var bcrypt_1 = require("bcrypt");
var base_model_1 = require("./base.model");
var Auth = /** @class */ (function (_super) {
    __extends(Auth, _super);
    function Auth() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loginTime = new Date();
        _this.otp = process.env.OTP;
        return _this;
    }
    Auth.prototype.setEmail = function (email) {
        this.email = email;
        return this;
    };
    Auth.prototype.setPassword = function (password) {
        this.password = this.hashPassword(password);
        return this;
    };
    Auth.prototype.toSchema = function () {
        return {
            email: this.email,
            password: this.password,
            loginTime: this.loginTime,
            otp: this.otp,
            dateCreated: this.dateCreated
        };
    };
    Auth.prototype.hashPassword = function (plainPassword) {
        return bcrypt_1["default"].hashSync(plainPassword, 15);
    };
    return Auth;
}(base_model_1.BaseModel));
exports.Auth = Auth;
