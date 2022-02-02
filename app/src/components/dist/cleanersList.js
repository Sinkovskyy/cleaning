"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var flexDirection_1 = require("../interfaces/enums/flexDirection");
var cleaner_service_1 = require("../services/cleaner.service");
var flexWrapper_1 = require("./styled/flexWrapper");
var CleanerList = function () {
    var _a = react_1.useState([]), cleanersList = _a[0], setCleanersList = _a[1];
    react_1.useEffect(function () {
        // Retrieve cleaners from db
        if (!cleanersList.length) {
            cleaner_service_1["default"].getALL().then(function (response) {
                if (response && response.data.length) {
                    setCleanersList(response.data);
                }
            });
        }
    });
    return (React.createElement(React.Fragment, null,
        React.createElement("h1", null, "Cleaners List"),
        React.createElement(react_bootstrap_1.ListGroup, { as: "ol", numbered: true }, cleanersList.map(function (cleaner, index) {
            return (React.createElement("a", { href: "/account/cleaner/" + cleaner.name, key: index },
                React.createElement(react_bootstrap_1.ListGroup.Item, { as: "li" },
                    React.createElement(flexWrapper_1.FlexWrapper, { direction: flexDirection_1.FlexDirection.row },
                        React.createElement("span", null, cleaner.name),
                        React.createElement("img", { src: cleaner.images[0] })))));
        }))));
};
exports["default"] = CleanerList;
