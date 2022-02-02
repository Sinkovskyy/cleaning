"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var styled_components_1 = require("styled-components");
var auth_service_1 = require("../services/auth.service");
var accessTypes_1 = require("../interfaces/enums/accessTypes");
var Container = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n   \n    max-width:100%;\n    width:400px;\n    margin:400px auto;\n"], ["\n   \n    max-width:100%;\n    width:400px;\n    margin:400px auto;\n"])));
var AuthPage = function () {
    var auth = function (e) {
        e.preventDefault();
        var login = document.querySelector('.login').value;
        var password = document.querySelector('.password').value;
        auth_service_1["default"].login(login, password).then(function (response) {
            if (response) {
                if (response.type === accessTypes_1.AccessTypes.admin) {
                    window.location.href = "/admin";
                }
                if (response.type === accessTypes_1.AccessTypes.common) {
                    window.location.href = "/account";
                }
            }
        });
    };
    return (react_1["default"].createElement(Container, null,
        react_1["default"].createElement("h1", null, "Login"),
        react_1["default"].createElement(react_bootstrap_1.Form, null,
            react_1["default"].createElement(react_bootstrap_1.Form.Group, { className: "mb-3" },
                react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Login"),
                react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: "login", className: "login", placeholder: "Enter login" })),
            react_1["default"].createElement(react_bootstrap_1.Form.Group, { className: "mb-3" },
                react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Password"),
                react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: "password", className: "password", placeholder: "Password" })),
            react_1["default"].createElement(react_bootstrap_1.Button, { variant: "primary", type: "submit", onClick: auth }, "Submit"),
            react_1["default"].createElement("a", { href: "/registration" }, "Registrate"))));
};
exports["default"] = AuthPage;
var templateObject_1;
