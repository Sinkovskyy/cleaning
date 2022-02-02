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
var flexDirection_1 = require("../interfaces/enums/flexDirection");
var orderStatus_1 = require("../interfaces/enums/orderStatus");
var cleaner_service_1 = require("../services/cleaner.service");
var flexWrapper_1 = require("./styled/flexWrapper");
var OrdersList = function () {
    var _a = react_1.useState([]), ordersList = _a[0], setOrdersList = _a[1];
    react_1.useEffect(function () {
        // Retrieve cleaners from db
        if (!ordersList.length) {
            cleaner_service_1["default"].getAllOrdersBySingleUser().then(function (response) {
                if (response && response.data.length) {
                    setOrdersList(response.data);
                }
            });
        }
    });
    var completeOrder = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var card, id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    card = e.target.closest(".orderCard");
                    id = card.getAttribute("id");
                    return [4 /*yield*/, cleaner_service_1["default"].completeOrder(id)];
                case 1:
                    _a.sent();
                    document.location.reload();
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("h1", null, "Orders List"),
        react_1["default"].createElement(react_bootstrap_1.ListGroup, { as: "ol", numbered: true }, ordersList.map(function (order, index) {
            return (react_1["default"].createElement(react_bootstrap_1.ListGroup.Item, { key: index, as: "li", className: "orderCard", id: order._id },
                react_1["default"].createElement(flexWrapper_1.FlexWrapper, { direction: flexDirection_1.FlexDirection.row },
                    react_1["default"].createElement("h4", null, order.name),
                    react_1["default"].createElement("h4", null,
                        "Price: ",
                        order.price),
                    react_1["default"].createElement("h4", null, order.date),
                    react_1["default"].createElement("h4", null, order.cleaner),
                    react_1["default"].createElement("h4", null, order.status),
                    order.status === orderStatus_1.OrderStatus.ready && react_1["default"].createElement(react_bootstrap_1.Button, { onClick: completeOrder }, "Complete"),
                    order.status === orderStatus_1.OrderStatus["return"] && react_1["default"].createElement("h4", null, order.message))));
        }))));
};
exports["default"] = OrdersList;
