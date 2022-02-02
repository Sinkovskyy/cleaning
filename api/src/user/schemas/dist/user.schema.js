"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserSchema = exports.User = exports.UserRights = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var UserRights;
(function (UserRights) {
    UserRights["admin"] = "admin";
    UserRights["common"] = "common";
})(UserRights = exports.UserRights || (exports.UserRights = {}));
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        mongoose_1.Prop({
            required: true,
            unique: true
        })
    ], User.prototype, "login");
    __decorate([
        mongoose_1.Prop()
    ], User.prototype, "name");
    __decorate([
        mongoose_1.Prop({
            required: true
        })
    ], User.prototype, "password");
    __decorate([
        mongoose_1.Prop({
            required: true
        })
    ], User.prototype, "type");
    __decorate([
        mongoose_1.Prop()
    ], User.prototype, "wallet");
    User = __decorate([
        mongoose_1.Schema()
    ], User);
    return User;
}());
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
