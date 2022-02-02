"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var API_URL = 'http://localhost:8080/api/user/';
var AuthService = /** @class */ (function () {
    function AuthService() {
        var _this = this;
        // Check if user auth and redirect if not
        this.checkIfUserAuth = function (error) {
            if (error.response.status === 401) {
                _this.logout();
            }
            document.location.href = "/";
        };
    }
    AuthService.prototype.login = function (login, password) {
        return axios_1["default"].post(API_URL + "login", { login: login, password: password }, { withCredentials: true }).then(function (response) {
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                return response.data;
            }
        });
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem("user");
        return axios_1["default"].post(API_URL + "logout", { withCredentials: true });
    };
    AuthService.prototype.register = function (login, password, name, wallet) {
        return axios_1["default"].post(API_URL + "create", { login: login, name: name, password: password, wallet: wallet });
    };
    AuthService.prototype.getCurrentUser = function () {
        return JSON.parse(localStorage.getItem('user'));
    };
    AuthService.prototype.getCurrentUserWallet = function () {
        var _this = this;
        return axios_1["default"].get(API_URL + 'wallet', { withCredentials: true })["catch"](function (error) {
            _this.checkIfUserAuth(error);
        });
    };
    return AuthService;
}());
exports["default"] = new AuthService();
