"use strict";
exports.__esModule = true;
var accessTypes_1 = require("../interfaces/enums/accessTypes");
var auth_1 = require("../pages/auth");
var admin_1 = require("../pages/admin");
var notfound_1 = require("../pages/notfound");
var registration_1 = require("../pages/registration");
var main_1 = require("../pages/account/main");
var cleaner_1 = require("../pages/account/cleaner");
var routes = [
    {
        path: "*",
        component: notfound_1["default"]
    },
    {
        path: "/",
        component: auth_1["default"]
    },
    {
        path: "/login",
        component: auth_1["default"]
    },
    {
        path: "/registration",
        component: registration_1["default"]
    },
    {
        path: "/admin",
        component: admin_1["default"],
        access: accessTypes_1.AccessTypes.admin
    },
    {
        path: "/account",
        component: main_1["default"],
        access: accessTypes_1.AccessTypes.common
    },
    {
        path: "/account/cleaner/:name",
        component: cleaner_1["default"],
        access: accessTypes_1.AccessTypes.common
    }
];
exports["default"] = routes;
