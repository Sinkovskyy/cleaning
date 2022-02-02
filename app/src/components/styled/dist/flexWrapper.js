"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.FlexWrapper = void 0;
var styled_components_1 = require("styled-components");
exports.FlexWrapper = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display:flex;\n    justify-content:flex-start;\n    align-items-center;\n    width:100%;\n    gap:20px;\n    flex-direction:", "\n    "], ["\n    display:flex;\n    justify-content:flex-start;\n    align-items-center;\n    width:100%;\n    gap:20px;\n    flex-direction:", "\n    "])), function (props) { return (props.direction); });
var templateObject_1;
