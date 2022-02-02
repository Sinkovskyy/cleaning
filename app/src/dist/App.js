"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_router_1 = require("react-router");
var routes_1 = require("./config/routes");
var auth_service_1 = require("./services/auth.service");
var App = function () {
    var _a = react_1.useState({ login: null, type: null }), user = _a[0], setUser = _a[1];
    react_1.useEffect(function () {
        if (!user.login) {
            var userData = auth_service_1["default"].getCurrentUser();
            if (userData) {
                setUser({
                    login: userData.login,
                    type: userData.type
                });
            }
        }
    });
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
            react_1["default"].createElement(react_router_1.Routes, null, routes_1["default"].map(function (route, index) {
                if ((route.access && (route.access === user.type)) || !route.access) {
                    return react_1["default"].createElement(react_router_dom_1.Route, { key: index, path: route.path, element: react_1["default"].createElement(route.component, null) });
                }
            })))));
};
exports["default"] = App;
