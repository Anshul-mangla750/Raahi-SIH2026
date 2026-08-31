"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MLProxyController = void 0;
const ml_proxy_service_1 = require("./ml-proxy.service");
const response_1 = require("../../utils/response");
class MLProxyController {
    static async getRouteScore(req, res) {
        try {
            const result = await ml_proxy_service_1.MLProxyService.calculateRouteScore(req.body);
            return (0, response_1.sendSuccess)(res, result, 'ML Route risk assessment calculated');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async getDisruptionPrediction(req, res) {
        try {
            const { districtId, weatherSnapshot } = req.body;
            const result = await ml_proxy_service_1.MLProxyService.predictDisruption(districtId, weatherSnapshot);
            return (0, response_1.sendSuccess)(res, result, 'Disruption forecast retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async suggestRoute(req, res) {
        try {
            const { originDistrictId, destDistrictId } = req.body;
            const result = await ml_proxy_service_1.MLProxyService.suggestAlternateRoute(originDistrictId, destDistrictId);
            return (0, response_1.sendSuccess)(res, result, 'Optimized routing suggestion generated');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
}
exports.MLProxyController = MLProxyController;
//# sourceMappingURL=ml-proxy.controller.js.map