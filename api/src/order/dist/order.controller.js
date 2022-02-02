"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.OrderController = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("mongoose");
var order_schema_1 = require("./schemas/order.schema");
var OrderController = /** @class */ (function () {
    function OrderController(orderService, userService) {
        this.orderService = orderService;
        this.userService = userService;
    }
    OrderController.prototype.create = function (data, request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var jwt_token, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jwt_token = request.cookies['jwt'];
                        return [4 /*yield*/, this.orderService.create(jwt_token, data)];
                    case 1:
                        order = _a.sent();
                        if (!order) {
                            throw new common_1.HttpException("Bad Request", common_1.HttpStatus.BAD_REQUEST);
                        }
                        response.status(common_1.HttpStatus.CREATED).send();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderController.prototype.update = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var login, wallet, setValueResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(data.status == order_schema_1.OrderStatus["return"])) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.orderService.getUserLoginByOrderId(data._id)];
                    case 1:
                        login = _a.sent();
                        return [4 /*yield*/, this.userService.getWallet(login)];
                    case 2:
                        wallet = (_a.sent());
                        return [4 /*yield*/, this.userService.setWalletState(login, wallet + data.price)];
                    case 3:
                        setValueResponse = _a.sent();
                        if (!setValueResponse) {
                            throw new common_1.HttpException("Wallet error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/, this.orderService.update({ _id: new mongoose_1.Types.ObjectId(data._id) }, data)];
                }
            });
        });
    };
    OrderController.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.orderService.getAll()];
            });
        });
    };
    OrderController.prototype.getAllBySingleUser = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var jwt_token, login;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jwt_token = request.cookies['jwt'];
                        return [4 /*yield*/, this.userService.getUserLogin(jwt_token)];
                    case 1:
                        login = _a.sent();
                        if (!login) {
                            throw new common_1.HttpException("Server error", common_1.HttpStatus.UNAUTHORIZED);
                        }
                        return [2 /*return*/, this.orderService.getAllOrdersBySingleUser({ login: login })];
                }
            });
        });
    };
    OrderController.prototype.complete = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.orderService.compeleteOrder(_id)];
            });
        });
    };
    __decorate([
        common_1.Post('create'),
        __param(0, common_1.Body()),
        __param(1, common_1.Req()),
        __param(2, common_1.Res())
    ], OrderController.prototype, "create");
    __decorate([
        common_1.Post('update'),
        __param(0, common_1.Body())
    ], OrderController.prototype, "update");
    __decorate([
        common_1.Get('getAll')
    ], OrderController.prototype, "getAll");
    __decorate([
        common_1.Get('getAllBySingleUser'),
        __param(0, common_1.Req())
    ], OrderController.prototype, "getAllBySingleUser");
    __decorate([
        common_1.Post('complete'),
        __param(0, common_1.Body("_id"))
    ], OrderController.prototype, "complete");
    OrderController = __decorate([
        common_1.Controller('api/order')
    ], OrderController);
    return OrderController;
}());
exports.OrderController = OrderController;
