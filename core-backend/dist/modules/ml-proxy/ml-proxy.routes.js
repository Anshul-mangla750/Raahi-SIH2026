"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ml_proxy_controller_1 = require("./ml-proxy.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticateJwt);
router.post('/route-score', ml_proxy_controller_1.MLProxyController.getRouteScore);
router.post('/disruption-predict', ml_proxy_controller_1.MLProxyController.getDisruptionPrediction);
router.post('/route-suggest', ml_proxy_controller_1.MLProxyController.suggestRoute);
exports.default = router;
//# sourceMappingURL=ml-proxy.routes.js.map