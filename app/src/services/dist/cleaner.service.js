"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var auth_service_1 = require("./auth.service");
var API_URL = 'http://localhost:8080/api/';
var CleanerService = /** @class */ (function () {
    function CleanerService() {
    }
    CleanerService.prototype.getALL = function () {
        return axios_1["default"].get(API_URL + "cleaner/getAll", { withCredentials: true })["catch"](function (error) {
            auth_service_1["default"].checkIfUserAuth(error);
        });
    };
    CleanerService.prototype.getCleaner = function (name) {
        return axios_1["default"].get(API_URL + "cleaner/getCleaner/" + name, { withCredentials: true })["catch"](function (error) {
            auth_service_1["default"].checkIfUserAuth(error);
        });
    };
    CleanerService.prototype.createCleaner = function (data) {
        return axios_1["default"].post(API_URL + "cleaner/create", data, { withCredentials: true })["catch"](function (error) {
            document.location.href = "/";
        });
    };
    CleanerService.prototype.removeCleaner = function (name) {
        return axios_1["default"].post(API_URL + "cleaner/remove", { name: name }, { withCredentials: true })["catch"](function (error) {
            auth_service_1["default"].checkIfUserAuth(error);
        });
    };
    CleanerService.prototype.makeOrder = function (name, cleaner, price, status) {
        return axios_1["default"].post(API_URL + "order/create", { name: name, cleaner: cleaner, price: price, status: status }, { withCredentials: true })["catch"](function (error) {
            auth_service_1["default"].checkIfUserAuth(error);
        });
    };
    CleanerService.prototype.updateOrder = function (data) {
        return axios_1["default"].post(API_URL + "order/update", data, { withCredentials: true })["catch"](function (error) {
            auth_service_1["default"].checkIfUserAuth(error);
        });
    };
    CleanerService.prototype.getAllOrders = function () {
        return axios_1["default"].get(API_URL + "order/getAll", { withCredentials: true })["catch"](function (error) {
            auth_service_1["default"].checkIfUserAuth(error);
        });
    };
    CleanerService.prototype.getAllOrdersBySingleUser = function () {
        return axios_1["default"].get(API_URL + "order/getAllBySingleUser", { withCredentials: true })["catch"](function (error) {
            auth_service_1["default"].checkIfUserAuth(error);
        });
    };
    CleanerService.prototype.completeOrder = function (_id) {
        return axios_1["default"].post(API_URL + "order/complete", { _id: _id }, { withCredentials: true })["catch"](function (error) {
            auth_service_1["default"].checkIfUserAuth(error);
        });
    };
    return CleanerService;
}());
exports["default"] = new CleanerService();
