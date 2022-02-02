"use strict";
exports.__esModule = true;
var react_1 = require("react");
var adminCleanersList_1 = require("../components/adminCleanersList");
var react_router_1 = require("react-router");
var react_bootstrap_1 = require("react-bootstrap");
var auth_service_1 = require("../services/auth.service");
var adminOrderList_1 = require("../components/adminOrderList");
var AdminPage = function (props) {
    var navigate = react_router_1.useNavigate();
    var logout = function () {
        auth_service_1["default"].logout().then(function (response) {
            navigate('/');
        });
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_bootstrap_1.Button, { onClick: logout }, "Logout"),
        react_1["default"].createElement(adminCleanersList_1["default"], null),
        react_1["default"].createElement(adminOrderList_1["default"], null)));
};
exports["default"] = AdminPage;
