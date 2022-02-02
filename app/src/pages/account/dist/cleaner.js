"use strict";
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
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var react_router_1 = require("react-router");
var header_1 = require("../../components/account/header");
var flexWrapper_1 = require("../../components/styled/flexWrapper");
var flexDirection_1 = require("../../interfaces/enums/flexDirection");
var cleaner_service_1 = require("../../services/cleaner.service");
var orderStatus_1 = require("../../interfaces/enums/orderStatus");
var auth_service_1 = require("../../services/auth.service");
var CleanerPage = function (props) {
    var name = react_router_1.useParams().name;
    var _a = react_1.useState({}), cleaner = _a[0], setCleaner = _a[1];
    var _b = react_1.useState(), wallet = _b[0], setWallet = _b[1];
    react_1.useEffect(function () {
        //  Retrieve cleaner data from backend
        if (!Object.keys(cleaner).length) {
            cleaner_service_1["default"].getCleaner(name).then(function (response) {
                if (response) {
                    setCleaner(response.data);
                }
            });
        }
        if (!wallet) {
            auth_service_1["default"].getCurrentUserWallet().then(function (response) {
                if (response) {
                    setWallet(response.data);
                }
            });
        }
    });
    var makeOrder = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var serviceCard, serviceName, servicePrice;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    serviceCard = e.target.closest('.service');
                    serviceName = serviceCard.querySelector('.name').innerHTML;
                    servicePrice = (+serviceCard.querySelector('.price').innerHTML);
                    if (wallet < servicePrice) {
                        alert("Not enough money");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, cleaner_service_1["default"].makeOrder(serviceName, cleaner.name, servicePrice, orderStatus_1.OrderStatus.pending)];
                case 1:
                    _a.sent();
                    setWallet(wallet - servicePrice);
                    document.location.reload();
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(header_1["default"], null),
        react_1["default"].createElement("h1", null, cleaner.name),
        react_1["default"].createElement("h2", null, "Services"),
        (cleaner.services || []).map(function (service, index) {
            return (react_1["default"].createElement(flexWrapper_1.FlexWrapper, { className: "service", key: index, direction: flexDirection_1.FlexDirection.row },
                react_1["default"].createElement("h3", { className: "name" }, service.name),
                react_1["default"].createElement("h4", null,
                    "Price: ",
                    react_1["default"].createElement("span", { className: "price" }, service.price)),
                react_1["default"].createElement(react_bootstrap_1.Button, { onClick: makeOrder }, "Order")));
        })));
};
exports["default"] = CleanerPage;
