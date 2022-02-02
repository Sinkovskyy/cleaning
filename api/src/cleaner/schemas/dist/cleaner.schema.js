"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CleanerSchema = exports.Cleaner = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var Cleaner = /** @class */ (function () {
    function Cleaner() {
    }
    __decorate([
        mongoose_1.Prop({ required: true, unique: true })
    ], Cleaner.prototype, "name");
    __decorate([
        mongoose_1.Prop({ required: true })
    ], Cleaner.prototype, "description");
    __decorate([
        mongoose_1.Prop({ required: true })
    ], Cleaner.prototype, "services");
    __decorate([
        mongoose_1.Prop({ required: true })
    ], Cleaner.prototype, "images");
    Cleaner = __decorate([
        mongoose_1.Schema()
    ], Cleaner);
    return Cleaner;
}());
exports.Cleaner = Cleaner;
exports.CleanerSchema = mongoose_1.SchemaFactory.createForClass(Cleaner);
