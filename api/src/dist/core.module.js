"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CoreModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var jwt_1 = require("@nestjs/jwt");
var mongoose_1 = require("@nestjs/mongoose");
var configuration_1 = require("./config/configuration");
var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        common_1.Global(),
        common_1.Module({
            imports: [
                config_1.ConfigModule.forRoot({
                    envFilePath: ['.env'],
                    isGlobal: true
                }),
                jwt_1.JwtModule.register({
                    secret: "secret"
                }),
                mongoose_1.MongooseModule.forRoot("mongodb+srv://" + configuration_1.configuration().db_login + ":" + configuration_1.configuration().db_password + "@cluster0.aklqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"),
            ],
            exports: [jwt_1.JwtModule]
        })
    ], CoreModule);
    return CoreModule;
}());
exports.CoreModule = CoreModule;
