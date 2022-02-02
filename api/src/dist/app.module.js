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
var mongoose_1 = require("@nestjs/mongoose");
var user_module_1 = require("./user/user.module");
var cleaner_module_1 = require("./cleaner/cleaner.module");
var config_1 = require("@nestjs/config");
var configuration_1 = require("./config/configuration");
var auth_middleware_1 = require("./middlewares/auth.middleware");
var admin_auth_middleware_1 = require("./middlewares/admin-auth.middleware");
var order_module_1 = require("./order/order.module");
var axios_1 = require("@nestjs/axios");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        consumer.apply(admin_auth_middleware_1.AdminAuthMiddleware).forRoutes({ path: '/api/cleaner/create', method: common_1.RequestMethod.POST }, { path: '/api/cleaner/remove', method: common_1.RequestMethod.POST }, { path: '/api/order/update', method: common_1.RequestMethod.POST }, { path: '/api/order/getAll', method: common_1.RequestMethod.GET });
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes({ path: '/api/cleaner/getAll', method: common_1.RequestMethod.GET }, { path: '/api/cleaner/getCleaner/:name', method: common_1.RequestMethod.GET }, { path: '/api/user/wallet', method: common_1.RequestMethod.GET }, { path: '/api/order/create', method: common_1.RequestMethod.POST }, { path: '/api/order/getAllBySingleUser', method: common_1.RequestMethod.GET }, { path: '/api/order/complete', method: common_1.RequestMethod.POST });
    };
    AppModule = __decorate([
        common_1.Module({
            imports: [
                config_1.ConfigModule.forRoot({
                    envFilePath: '.env',
                    isGlobal: true
                }),
                user_module_1.UserModule,
                cleaner_module_1.CleanerModule,
                mongoose_1.MongooseModule.forRoot("mongodb+srv://" + configuration_1.configuration().db_login + ":" + configuration_1.configuration().db_password + "@cluster0.aklqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"),
                order_module_1.OrderModule,
                axios_1.HttpModule
            ],
            controllers: [],
            providers: []
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
