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
var passport_1 = require("../middlewares/passport");
var iota_1 = require("../middlewares/iota");
//Import models from MongoDB
var User = require('../models/User');
//Create functions for export
module.exports = {
    signup: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, newUser, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!req.body.email || !req.body.username || !req.body.passHash) {
                        return [2 /*return*/, res.status(400).json({ error: "Check inputed values." })];
                    }
                    return [4 /*yield*/, User.findOne({ email: req.body.email })];
                case 1:
                    user = _a.sent();
                    if (user) {
                        return [2 /*return*/, res.status(400).json({ error: "User already exist." })];
                    }
                    newUser = new User({
                        username: req.body.username,
                        email: req.body.email,
                        passHash: req.body.passHash,
                        typeNPC: req.body.typeNPC
                    });
                    newUser.save();
                    token = (0, passport_1.generateToken)({
                        id: newUser.id,
                        username: req.body.username,
                    });
                    (0, iota_1.createAccount)()
                        .then(function (newData) { return __awaiter(void 0, void 0, void 0, function () {
                        var data, updates;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    data = newData;
                                    updates = {
                                        token: token,
                                        seed: data.seed,
                                        address: data.address,
                                        mnemonic: data.mnemonic,
                                    };
                                    return [4 /*yield*/, User.findOneAndUpdate({ _id: newUser._id.toString() }, { $set: updates })];
                                case 1:
                                    _a.sent();
                                    res.status(201).json({
                                        message: "User Signin",
                                        token: token,
                                        username: newUser.username,
                                        email: newUser.email,
                                        address: updates.address,
                                        type: newUser.typeNPC
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    }); },
    signin: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, username, email, passHash, option, hasUser;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    3;
                    //((!A.B)+(A.!B)).C
                    if (!(((!req.body.email && req.body.username) || (req.body.email && !req.body.username)) && req.body.passHash)) {
                        return [2 /*return*/, res.status(401).json({ message: 'Check values inputed' })];
                    }
                    _a = req.body, username = _a.username, email = _a.email, passHash = _a.passHash;
                    option = {};
                    if (email) {
                        option.email = email;
                    }
                    if (username) {
                        option.username = username;
                    }
                    console.log(option);
                    return [4 /*yield*/, User.findOne(option)];
                case 1:
                    hasUser = _b.sent();
                    console.log(hasUser);
                    if (passHash !== hasUser.passHash) {
                        return [2 /*return*/, res.status(401).json({ message: 'Not Authorized' })];
                    }
                    res.json({
                        message: "User Signin",
                        token: hasUser.token,
                        username: hasUser.username,
                        email: hasUser.email,
                        address: hasUser.address,
                        type: hasUser.typeNPC
                    });
                    return [2 /*return*/];
            }
        });
    }); },
};
