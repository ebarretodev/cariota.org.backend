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
Object.defineProperty(exports, "__esModule", { value: true });
var User = require('../models/User');
var Categories = require('../models/Categories');
var Services = require('../models/Services');
//Create functions for export
module.exports = {
    list: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, sort, _c, offset, _d, limit, q, filters, listTotal, total, listNPC, list, i;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _a = req.query, _b = _a.sort, sort = _b === void 0 ? 'asc' : _b, _c = _a.offset, offset = _c === void 0 ? 0 : _c, _d = _a.limit, limit = _d === void 0 ? 8 : _d, q = _a.q;
                    filters = { typeNPC: true };
                    if (q) {
                        //@ts-ignore
                        filters.username = { '$regex': q, '$options': 'i' };
                    }
                    return [4 /*yield*/, User.find(filters)];
                case 1:
                    listTotal = _e.sent();
                    total = listTotal.length;
                    return [4 /*yield*/, User.find(filters)
                            .sort({ username: (sort == 'desc' ? -1 : 1) })
                            //@ts-ignore
                            .skip(parseInt(offset))
                            //@ts-ignore
                            .limit(parseInt(limit))
                            .exec()];
                case 2:
                    listNPC = _e.sent();
                    list = [];
                    for (i in listNPC) {
                        list.push({
                            name: listNPC[i].username,
                            email: listNPC[i].email,
                        });
                    }
                    res.status(200).json({ message: "NPCs list", total: total, list: list });
                    return [2 /*return*/];
            }
        });
    }); },
    listCategories: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var listAll, list, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Categories.find()];
                case 1:
                    listAll = _a.sent();
                    list = [];
                    for (i in listAll) {
                        list.push({
                            name: listAll[i].name,
                            slug: listAll[i].slug,
                        });
                    }
                    res.json({ message: "Categories list", list: list });
                    return [2 /*return*/];
            }
        });
    }); },
    listServices: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, sort, _c, offset, _d, limit, q, c, filters, cat, services;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _a = req.query, _b = _a.sort, sort = _b === void 0 ? 'asc' : _b, _c = _a.offset, offset = _c === void 0 ? 0 : _c, _d = _a.limit, limit = _d === void 0 ? 8 : _d, q = _a.q, c = _a.c;
                    filters = {};
                    //@ts-ignore
                    if (q) {
                        filters.name = { '$regex': q, '$options': 'i' };
                    }
                    if (!c) return [3 /*break*/, 2];
                    return [4 /*yield*/, Categories.findOne({ name: c })];
                case 1:
                    cat = _e.sent();
                    console.log(cat);
                    //@ts-ignore
                    filters.category = cat._id.toString();
                    _e.label = 2;
                case 2: return [4 /*yield*/, Services.find(filters)
                        .sort({ name: (sort == 'desc' ? -1 : 1) })
                        //@ts-ignore
                        .skip(parseInt(offset))
                        //@ts-ignore
                        .limit(parseInt(limit))
                        .exec()];
                case 3:
                    services = _e.sent();
                    res.json({ message: "NPC's services", services: services });
                    return [2 /*return*/];
            }
        });
    }); },
    addService: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, name, type, value, time, category, cat, newService;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, name = _a.name, type = _a.type, value = _a.value, time = _a.time, category = _a.category;
                    return [4 /*yield*/, Categories.findOne({ name: category })];
                case 1:
                    cat = _b.sent();
                    newService = new Services({
                        //@ts-ignore
                        idNPC: req.user._id.toString(),
                        name: name,
                        category: cat._id.toString(),
                        type: type,
                        value: value,
                        time: time
                    });
                    newService.save();
                    res.json({ message: "NPC's services added" });
                    return [2 /*return*/];
            }
        });
    }); },
    useService: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.json({ message: "NPC use service" });
            return [2 /*return*/];
        });
    }); },
};
