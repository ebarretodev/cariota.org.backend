"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.Promise = global.Promise;
var modelSchema = new mongoose_1.default.Schema({
    name: String,
    slug: String,
});
var modelName = "Categories";
if (mongoose_1.default.connection && mongoose_1.default.connection.models[modelName]) {
    module.exports = mongoose_1.default.connection.models[modelName];
}
else {
    module.exports = mongoose_1.default.model(modelName, modelSchema);
}
