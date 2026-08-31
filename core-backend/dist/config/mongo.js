"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
const connectMongo = async () => {
    try {
        await mongoose_1.default.connect(env_1.env.mongoUri);
        console.log('✅ MongoDB (Atlas) connected successfully.');
    }
    catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        throw error;
    }
};
exports.connectMongo = connectMongo;
//# sourceMappingURL=mongo.js.map