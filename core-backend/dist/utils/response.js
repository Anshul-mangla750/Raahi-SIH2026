"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};
exports.sendSuccess = sendSuccess;
const sendError = (res, message = 'Internal Server Error', statusCode = 500, errors = null) => {
    return res.status(statusCode).json({
        success: false,
        message,
        errors,
    });
};
exports.sendError = sendError;
//# sourceMappingURL=response.js.map