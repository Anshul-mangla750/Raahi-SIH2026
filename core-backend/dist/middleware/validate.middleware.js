"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const response_1 = require("../utils/response");
const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            return next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const issues = error.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message,
                }));
                return (0, response_1.sendError)(res, 'Validation Error', 422, issues);
            }
            return (0, response_1.sendError)(res, 'Invalid request data', 422);
        }
    };
};
exports.validate = validate;
//# sourceMappingURL=validate.middleware.js.map