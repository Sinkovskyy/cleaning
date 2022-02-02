"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var cleaner_service_1 = require("../services/cleaner.service");
var flexWrapper_1 = require("./styled/flexWrapper");
var flexDirection_1 = require("../interfaces/enums/flexDirection");
var clenearNameIsUnique = function (name, cleanersList) {
    for (var i in cleanersList) {
        if (name == cleanersList[i].name && !cleanersList[i].editing) {
            return false;
        }
    }
    return true;
};
var CleanerCard = function (_a) {
    var cleaner = _a.cleaner, cleanersList = _a.cleanersList, setCleanersList = _a.setCleanersList;
    var removeCleanerListner = function (e) {
        var button = e.target;
        var card = button.closest(".card");
        var id = card.getAttribute("id");
        setCleanersList(cleanersList.filter(function (element) {
            if (element.name == id) {
                cleaner_service_1["default"].removeCleaner(element.name);
                return;
            }
            return 1;
        }));
    };
    return (react_1["default"].createElement("div", { className: 'card', id: cleaner.name },
        react_1["default"].createElement(flexWrapper_1.FlexWrapper, { direction: flexDirection_1.FlexDirection.row },
            react_1["default"].createElement("span", { className: 'name' }, cleaner.name),
            react_1["default"].createElement("span", { className: 'description' }, cleaner.description),
            react_1["default"].createElement(react_bootstrap_1.Button, { onClick: removeCleanerListner }, "Remove")),
        react_1["default"].createElement("div", { className: 'services' }, cleaner.services.map(function (service, index) { return (react_1["default"].createElement(flexWrapper_1.FlexWrapper, { key: index, direction: flexDirection_1.FlexDirection.row, className: 'service' },
            react_1["default"].createElement("span", null, service.name),
            react_1["default"].createElement("span", null, service.price))); })),
        react_1["default"].createElement("div", { className: 'images' },
            react_1["default"].createElement(flexWrapper_1.FlexWrapper, { direction: flexDirection_1.FlexDirection.row, className: 'images' }, cleaner.images.map(function (img, index) { return (react_1["default"].createElement("img", { key: index, src: img })); })))));
};
var EditableCleanerCard = function (_a) {
    var cleaner = _a.cleaner, cleanersList = _a.cleanersList, setCleanersList = _a.setCleanersList;
    // TODO: async request to save data
    var saveCleanerDataListner = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var button, card, id, name, description, servicesNodes, images, services;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    button = e.target;
                    card = button.closest(".card");
                    id = card.getAttribute("id");
                    name = card.querySelector(".name").value;
                    description = card.querySelector(".description").value;
                    servicesNodes = Array.from(card.querySelectorAll('.service'));
                    return [4 /*yield*/, getAllFiles()];
                case 1:
                    images = _a.sent();
                    services = [];
                    if (!name || !description) {
                        return [2 /*return*/];
                    }
                    // Parse node elements array to Service object array
                    services = servicesNodes.map(function (service) {
                        var serviceName = service.querySelector(".service_name").value;
                        var price = +service.querySelector(".service_price").value;
                        return { name: serviceName, price: price };
                    });
                    // Filter not valid services
                    services = services.filter(function (service) {
                        if (!service.price || !service.name || service.price < 0) {
                            return;
                        }
                        return 1;
                    });
                    if (!services.length) {
                        return [2 /*return*/];
                    }
                    setCleanersList(cleanersList.map(function (element) {
                        if (id == element.name) {
                            if (!clenearNameIsUnique(name, cleanersList)) {
                                return element;
                            }
                            element.editing = false;
                            element.name = name;
                            element.description = description;
                            element.services = services;
                            element.images = images;
                            cleaner_service_1["default"].createCleaner(element);
                        }
                        return element;
                    }));
                    return [2 /*return*/];
            }
        });
    }); };
    var removeCleanerSercviceListener = function (e) {
        var button = e.target;
        var card = button.closest('.card');
        var service_name = button.closest('.service').querySelector(".service_name").value;
        var id = card.getAttribute("id");
        var servicesNodes = Array.from(card.querySelectorAll('.service'));
        var services = [];
        // Parse node elements array to Service object array
        services = servicesNodes.map(function (element) {
            var serviceName = element.querySelector('.service_name').value;
            var price = +element.querySelector('.service_price').value;
            return { name: serviceName, price: price };
        });
        // Remove current service
        services = services.filter(function (element) {
            if (service_name == element.name) {
                return;
            }
            return 1;
        });
        setCleanersList(cleanersList.map(function (element) {
            if (id == element.name) {
                if (!clenearNameIsUnique(id, cleanersList)) {
                    return element;
                }
                element.services = services;
            }
            return element;
        }));
    };
    var addCleanerServiceListener = function (e) {
        setCleanersList(cleanersList.map(function (element) {
            if (element.name == cleaner.name) {
                var service = { name: "", price: 0 };
                element.services.push(service);
            }
            return element;
        }));
    };
    var cancelCleanerListner = function (e) {
        var button = e.target;
        var card = button.closest(".card");
        var id = card.getAttribute("id");
        setCleanersList(cleanersList.filter(function (element) {
            if (element.name == id) {
                return;
            }
            return 1;
        }));
    };
    var getAllFiles = function () { return __awaiter(void 0, void 0, void 0, function () {
        var files, binaries, images;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    files = document.querySelector("#filesInput").files;
                    binaries = Array.prototype.slice.call(files).map(function (file) {
                        var reader = new FileReader();
                        // Create a new promise
                        return new Promise(function (resolve) {
                            // Resolve the promise after reading file
                            reader.onload = function () { return resolve(reader.result); };
                            // Reade the file as a text
                            reader.readAsDataURL(file);
                        });
                    });
                    return [4 /*yield*/, Promise.all(binaries)];
                case 1:
                    images = _a.sent();
                    return [2 /*return*/, images];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: 'card', id: cleaner.name },
        react_1["default"].createElement(flexWrapper_1.FlexWrapper, { direction: flexDirection_1.FlexDirection.row },
            react_1["default"].createElement("input", { className: 'name', type: 'text', defaultValue: cleaner.name, placeholder: 'name' }),
            react_1["default"].createElement("input", { className: 'description', type: 'text', defaultValue: cleaner.description, placeholder: 'description' }),
            react_1["default"].createElement(react_bootstrap_1.Button, { onClick: saveCleanerDataListner }, "Save"),
            react_1["default"].createElement(react_bootstrap_1.Button, { onClick: cancelCleanerListner }, "Cancel")),
        react_1["default"].createElement("div", { className: 'services' },
            cleaner.services.map(function (service, index) { return (react_1["default"].createElement(flexWrapper_1.FlexWrapper, { key: index, direction: flexDirection_1.FlexDirection.row, className: 'service' },
                react_1["default"].createElement("input", { className: 'service_name', type: 'text', defaultValue: service.name, placeholder: 'Service name' }),
                react_1["default"].createElement("input", { className: 'service_price', type: 'number', defaultValue: service.price, placeholder: 'Price' }),
                react_1["default"].createElement(react_bootstrap_1.Button, { onClick: removeCleanerSercviceListener }, "Remove"))); }),
            react_1["default"].createElement(react_bootstrap_1.Button, { onClick: addCleanerServiceListener }, "Add Service")),
        react_1["default"].createElement("input", { type: "file", id: "filesInput", multiple: true, name: "file" }),
        react_1["default"].createElement("img", { id: "img" })));
};
var AdminCleanersList = function () {
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
    var addCleanerListener = function () {
        for (var i in cleanersList) {
            if (cleanersList[i].editing) {
                return;
            }
        }
        ;
        var newCleaner = new Array({ name: "", description: "", services: [], images: [], editing: true });
        setCleanersList(__spreadArrays(cleanersList, newCleaner));
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("h1", null, "Cleaners List"),
        react_1["default"].createElement(react_bootstrap_1.ListGroup, { as: "ol", numbered: true }, cleanersList.map(function (cleaner, index) {
            return (react_1["default"].createElement(react_bootstrap_1.ListGroup.Item, { key: index, as: "li" }, cleaner.editing ?
                react_1["default"].createElement(EditableCleanerCard, { cleaner: cleaner, cleanersList: cleanersList, setCleanersList: setCleanersList }) :
                react_1["default"].createElement(CleanerCard, { cleaner: cleaner, cleanersList: cleanersList, setCleanersList: setCleanersList })));
        })),
        react_1["default"].createElement(react_bootstrap_1.Button, { onClick: addCleanerListener }, "Add Cleaner")));
};
exports["default"] = AdminCleanersList;
