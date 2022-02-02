"use strict";
exports.__esModule = true;
var admin_auth_middleware_1 = require("./admin-auth.middleware");
describe('AdminAuthMiddleware', function () {
    it('should be defined', function () {
        expect(new admin_auth_middleware_1.AdminAuthMiddleware()).toBeDefined();
    });
});
