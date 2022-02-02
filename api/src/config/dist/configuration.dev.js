"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configuration = void 0;

var configuration = function configuration() {
  return {
    jwt_secret: process.env.JWT_SECRET,
    port: process.env.PORT
  };
};

exports.configuration = configuration;