"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var API_URL = 'http://localhost:8080/api/';
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.getALLCleaners = function () {
        return axios_1["default"].get(API_URL + "cleaner/getAll", { withCredentials: true });
    };
    UserService.prototype.getCreate = function () {
        return axios_1["default"].get(API_URL + "cleaner/getAll", { withCredentials: true });
    };
    return UserService;
}());
exports["default"] = new UserService();
