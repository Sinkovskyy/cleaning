"use strict";
exports.__esModule = true;
var react_bootstrap_1 = require("react-bootstrap");
var react_router_1 = require("react-router");
var auth_service_1 = require("../../services/auth.service");
var flexWrapper_1 = require("../styled/flexWrapper");
var flexDirection_1 = require("../../interfaces/enums/flexDirection");
var react_1 = require("react");
var Header = function (props) {
    var navigate = react_router_1.useNavigate();
    var _a = react_1.useState(), wallet = _a[0], setWallet = _a[1];
    react_1.useEffect(function () {
        if (!wallet) {
            auth_service_1["default"].getCurrentUserWallet().then(function (response) {
                if (response) {
                    setWallet(response.data);
                }
            });
        }
    });
    var logout = function () {
        auth_service_1["default"].logout().then(function (response) {
            navigate('/');
        });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(flexWrapper_1.FlexWrapper, { direction: flexDirection_1.FlexDirection.row },
            React.createElement("h2", null, auth_service_1["default"].getCurrentUser().name),
            React.createElement("h2", null,
                "Wallet:",
                React.createElement("span", null, wallet)),
            React.createElement(react_bootstrap_1.Button, { onClick: logout }, "Logout"))));
};
exports["default"] = Header;
