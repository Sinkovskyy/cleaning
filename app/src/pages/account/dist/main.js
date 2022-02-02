"use strict";
exports.__esModule = true;
var react_1 = require("react");
var cleanersList_1 = require("../../components/cleanersList");
var header_1 = require("../../components/account/header");
var ordersList_1 = require("../../components/ordersList");
var AccountMainPage = function () {
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(header_1["default"], null),
        react_1["default"].createElement(cleanersList_1["default"], null),
        react_1["default"].createElement(ordersList_1["default"], null)));
};
exports["default"] = AccountMainPage;
