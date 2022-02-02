"use strict";
exports.__esModule = true;
var auth_middleware_1 = require("./middlewares/auth.middleware");
describe('AuthMiddleware', function () {
    it('should be defined', function () {
        expect(new auth_middleware_1.AuthMiddleware()).toBeDefined();
    });
});
