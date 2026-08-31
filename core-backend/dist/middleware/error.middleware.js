"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_1 = require("../utils/response");
const errorHandler = (err, req, res, next) => {
    console.error('Unhandled Error:', err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const errors = err.errors || null;
    return (0, response_1.sendError)(res, message, statusCode, errors);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map