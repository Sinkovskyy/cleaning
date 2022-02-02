"use strict";
exports.__esModule = true;
exports.validationSchema = void 0;
var Joi = require("joi");
exports.validationSchema = Joi.object({
    NODE_ENV: Joi.string().valid("development").required()
});
