"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehicles_controller_1 = require("./vehicles.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// GPS ping endpoint (supports device tokens / simulated pings)
router.post('/:id/ping', vehicles_controller_1.VehiclesController.pingPosition);
// Authenticated live fleet coordinates
router.get('/live', auth_middleware_1.authenticateJwt, vehicles_controller_1.VehiclesController.getLivePositions);
exports.default = router;
//# sourceMappingURL=vehicles.routes.js.map