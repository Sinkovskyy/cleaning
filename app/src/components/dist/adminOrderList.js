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
var OrderCard = function (_a) {
    var order = _a.order, ordersList = _a.ordersList, setOrdersList = _a.setOrdersList;
    var editOrder = function (e) {
        var card = e.target.closest('.card');
        var _id = card.getAttribute("id");
        setOrdersList(ordersList.map(function (element) {
            if (element._id === _id) {
                element.editing = true;
            }
            return element;
        }));
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_bootstrap_1.ListGroup.Item, { as: "li", className: "card", id: order._id },
            react_1["default"].createElement(flexWrapper_1.FlexWrapper, { direction: flexDirection_1.FlexDirection.row },
                react_1["default"].createElement("h4", null, order.name),
                react_1["default"].createElement("h4", null,
                    "Price: ",
                    order.price),
                react_1["default"].createElement("h4", null, order.userName),
                react_1["default"].createElement("h4", null, order.cleaner),
                react_1["default"].createElement("h4", null, new Date(order.date).toISOString().slice(0, 10)),
                react_1["default"].createElement("h4", null, order.status == orderStatus_1.OrderStatus.pending ? orderStatus_1.OrderStatus["new"] : order.status),
                order.status === orderStatus_1.OrderStatus["return"] && react_1["default"].createElement("h4", null, order.message),
                order.status !== orderStatus_1.OrderStatus["return"] && order.status !== orderStatus_1.OrderStatus.completed && react_1["default"].createElement(react_bootstrap_1.Button, { className: "editButton", onClick: editOrder }, "Edit")))));
};
var EditingOrderCard = function (_a) {
    var order = _a.order, ordersList = _a.ordersList, setOrdersList = _a.setOrdersList;
    var _b = react_1.useState(order.status), status = _b[0], setStatus = _b[1];
    var getStatuses = function () {
        var statuses = [];
        for (var status_1 in orderStatus_1.OrderStatus) {
            statuses.push(status_1);
        }
        return statuses;
    };
    var saveOrder = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var card, _id, name, price, userName, cleaner, date, status, message, data;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    card = e.target.closest('.card');
                    _id = card.getAttribute("id");
                    name = card.querySelector('.name').value;
                    price = +(card.querySelector('.price').value);
                    userName = card.querySelector('.userName').value;
                    cleaner = card.querySelector('.cleaner').value;
                    date = card.querySelector('.date').value || order.date;
                    date = new Date(date);
                    status = card.querySelector('.status').value;
                    message = (_a = card.querySelector('.message')) === null || _a === void 0 ? void 0 : _a.value;
                    data = message ? { _id: _id, name: name, price: price, userName: userName, status: status, date: date, cleaner: cleaner, message: message } : { _id: _id, name: name, price: price, userName: userName, status: status, date: date, cleaner: cleaner };
                    return [4 /*yield*/, cleaner_service_1["default"].updateOrder(data)];
                case 1:
                    _b.sent();
                    setOrdersList(ordersList.map(function (element) {
                        if (element._id == _id) {
                            element.name = name;
                            element.price = price;
                            element.userName = userName;
                            element.status = status;
                            element.date = date;
                            element.editing = false;
                        }
                        return element;
                    }));
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_bootstrap_1.ListGroup.Item, { as: "li", className: "card", id: order._id },
            react_1["default"].createElement(flexWrapper_1.FlexWrapper, { direction: flexDirection_1.FlexDirection.row },
                react_1["default"].createElement("input", { type: "text", className: "name", defaultValue: order.name }),
                react_1["default"].createElement("input", { type: "number", className: "price", defaultValue: order.price }),
                react_1["default"].createElement("input", { type: "text", className: "userName", defaultValue: order.userName }),
                react_1["default"].createElement("input", { type: "text", className: "cleaner", defaultValue: order.cleaner }),
                react_1["default"].createElement("input", { type: "datetime-local", className: "date", defaultValue: new Date(order.date).toDateString() }),
                react_1["default"].createElement("select", { className: "status", defaultValue: status, onChange: function (e) {
                        setStatus(e.target.value);
                    } }, getStatuses().map(function (status, index) {
                    var statusValue = status;
                    if (statusValue === orderStatus_1.OrderStatus.pending) {
                        statusValue = orderStatus_1.OrderStatus["new"];
                    }
                    if (status === orderStatus_1.OrderStatus["new"] || status === orderStatus_1.OrderStatus.completed) {
                        return;
                    }
                    return (react_1["default"].createElement("option", { key: index, value: status }, statusValue));
                })),
                (status === orderStatus_1.OrderStatus["return"]) && react_1["default"].createElement("textarea", { className: "message" }),
                react_1["default"].createElement(react_bootstrap_1.Button, { className: "editButton", onClick: saveOrder }, "Save")))));
};
var AdminOrdersList = function () {
    var _a = react_1.useState([]), ordersList = _a[0], setOrdersList = _a[1];
    react_1.useEffect(function () {
        // Retrieve cleaners from db
        if (!ordersList.length) {
            cleaner_service_1["default"].getAllOrders().then(function (response) {
                if (response && response.data.length) {
                    setOrdersList(response.data);
                }
            });
        }
    });
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("h1", null, "Orders List"),
        react_1["default"].createElement(react_bootstrap_1.ListGroup, { as: "ol", numbered: true }, ordersList.map(function (order, index) {
            return (react_1["default"].createElement("div", { key: index }, order.editing ? react_1["default"].createElement(EditingOrderCard, { order: order, ordersList: ordersList, setOrdersList: setOrdersList })
                : react_1["default"].createElement(OrderCard, { order: order, ordersList: ordersList, setOrdersList: setOrdersList })));
        }))));
};
exports["default"] = AdminOrdersList;
