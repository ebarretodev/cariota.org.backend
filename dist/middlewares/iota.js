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
exports.getMessage = exports.outputsDetailed = exports.getBalance = exports.sendValue = exports.sendMessage = exports.createAccount = void 0;
//Start environment variables
require('dotenv').config();
var ClientBuilder = require('@iota/client').ClientBuilder;
// client for messages will connect to Devnet and Local PoW.
var client = new ClientBuilder()
    .node(process.env.IOTA_URL_NETWORK)
    .localPow(true)
    .build();
var createAccount = function () { return __awaiter(void 0, void 0, void 0, function () {
    var mnemonic, seed, newAddressInput, address, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mnemonic = client.generateMnemonic();
                seed = client.mnemonicToHexSeed(mnemonic);
                return [4 /*yield*/, client.getAddresses(seed)
                        .accountIndex(0)
                        .range(0, 1)
                        .get()];
            case 1:
                newAddressInput = _a.sent();
                address = newAddressInput[0];
                data = {
                    mnemonic: mnemonic,
                    seed: seed,
                    address: address,
                };
                return [2 /*return*/, data];
        }
    });
}); };
exports.createAccount = createAccount;
/**************************************************************
                Controlls to send and receive value and message
***************************************************************** */
//index standard must be: "CARIOTA MESSAGE: ${user}"
//messageData standar must be a json parse {"from": {user}, "to": {npc}, Value: {Number}, "Message":{mesage description}}
var sendMessage = function (seed, address, index, dataMessage) { return __awaiter(void 0, void 0, void 0, function () {
    var message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.message()
                    .seed(seed)
                    .index(index)
                    .data(dataMessage)
                    .submit()];
            case 1:
                message = _a.sent();
                return [2 /*return*/, message.messageId];
        }
    });
}); };
exports.sendMessage = sendMessage;
var sendValue = function (seed, address, value, index, dataMessage) { return __awaiter(void 0, void 0, void 0, function () {
    var message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.message()
                    .seed(seed)
                    .dustAllowanceOutput(address, value)
                    .index(index)
                    .data(dataMessage)
                    .submit()];
            case 1:
                message = _a.sent();
                return [2 /*return*/, message.messageId];
        }
    });
}); };
exports.sendValue = sendValue;
/**************************************************************
                Controlls to send and receive value and message
***************************************************************** */
var getBalance = function (address) { return __awaiter(void 0, void 0, void 0, function () {
    var balance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.getAddressBalance(address)];
            case 1:
                balance = _a.sent();
                return [2 /*return*/, balance];
        }
    });
}); };
exports.getBalance = getBalance;
var errorMessage = { error: 'Message no longer available on Tangle', timestamp: 0 };
var outputsDetailed = function (address) { return __awaiter(void 0, void 0, void 0, function () {
    var outputs, testAddress, detailedList, _a, _b, _i, i, data, _c, testTransactionId, transaction, _d, data, data;
    var _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0: return [4 /*yield*/, client.findOutputs([], [address])];
            case 1:
                outputs = _g.sent();
                return [4 /*yield*/, client.bech32ToHex(address)];
            case 2:
                testAddress = _g.sent();
                detailedList = [];
                _a = [];
                for (_b in outputs)
                    _a.push(_b);
                _i = 0;
                _g.label = 3;
            case 3:
                if (!(_i < _a.length)) return [3 /*break*/, 19];
                i = _a[_i];
                if (!(outputs[i].outputIndex == 1)) return [3 /*break*/, 8];
                data = void 0;
                _g.label = 4;
            case 4:
                _g.trys.push([4, 6, , 7]);
                return [4 /*yield*/, requestData(outputs[i], 'receive')];
            case 5:
                data = _g.sent();
                return [3 /*break*/, 7];
            case 6:
                _c = _g.sent();
                data = errorMessage;
                return [3 /*break*/, 7];
            case 7:
                detailedList.push(data);
                return [3 /*break*/, 18];
            case 8:
                testTransactionId = outputs[i].transactionId;
                _g.label = 9;
            case 9:
                if (!true) return [3 /*break*/, 18];
                transaction = void 0;
                _g.label = 10;
            case 10:
                _g.trys.push([10, 12, , 13]);
                return [4 /*yield*/, client.getIncludedMessage(testTransactionId)];
            case 11:
                transaction = _g.sent();
                return [3 /*break*/, 13];
            case 12:
                _d = _g.sent();
                transaction = errorMessage;
                return [3 /*break*/, 18];
            case 13:
                if (!(((_e = transaction.message) === null || _e === void 0 ? void 0 : _e.payload.essence.outputs[0].address.address) === testAddress)) return [3 /*break*/, 15];
                return [4 /*yield*/, requestData(transaction, 'send')];
            case 14:
                data = _g.sent();
                detailedList.push(data);
                testTransactionId = transaction.message.payload.essence.inputs[0].transactionId;
                return [3 /*break*/, 17];
            case 15:
                if (!(((_f = transaction.message) === null || _f === void 0 ? void 0 : _f.payload.essence.outputs[1].address.address) === testAddress)) return [3 /*break*/, 17];
                return [4 /*yield*/, requestData(transaction, 'receive')];
            case 16:
                data = _g.sent();
                detailedList.push(data);
                return [3 /*break*/, 18];
            case 17: return [3 /*break*/, 9];
            case 18:
                _i++;
                return [3 /*break*/, 3];
            case 19: return [2 /*return*/, detailedList.sort(function (a, b) { return b.timestamp - a.timestamp; })];
        }
    });
}); };
exports.outputsDetailed = outputsDetailed;
var requestData = function (transaction, type) { return __awaiter(void 0, void 0, void 0, function () {
    var messageId, messageMetadata, milestone, timestamp, amount, description;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                messageId = transaction.messageId;
                return [4 /*yield*/, client.getMessage().metadata(transaction.messageId)];
            case 1:
                messageMetadata = _a.sent();
                return [4 /*yield*/, client.getMilestone(messageMetadata.referencedByMilestoneIndex)];
            case 2:
                milestone = _a.sent();
                timestamp = milestone.timestamp;
                amount = 0;
                try {
                    //@ts-ignore
                    amount = transaction.amount ? transaction.amount : transaction.message.payload.essence.outputs[1].amount;
                }
                catch (_b) {
                    amount = 0;
                }
                description = "".concat(type.toUpperCase(), ": ").concat(amount / 1000000, "Mi");
                return [2 /*return*/, { timestamp: timestamp, description: description, type: type, amount: amount, messageId: messageId }];
        }
    });
}); };
//on Construction
var getMessage = function (index) { return __awaiter(void 0, void 0, void 0, function () {
    var message_ids, _i, message_ids_1, message_id, message_wrapper;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.getMessage().index(index)];
            case 1:
                message_ids = _a.sent();
                _i = 0, message_ids_1 = message_ids;
                _a.label = 2;
            case 2:
                if (!(_i < message_ids_1.length)) return [3 /*break*/, 5];
                message_id = message_ids_1[_i];
                return [4 /*yield*/, client.getMessage().data(message_id)];
            case 3:
                message_wrapper = _a.sent();
                console.log(Buffer.from(message_wrapper.message.payload.data, 'hex').toString('utf8'));
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getMessage = getMessage;
