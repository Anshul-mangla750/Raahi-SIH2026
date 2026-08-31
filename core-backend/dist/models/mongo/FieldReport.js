"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldReport = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const FieldReportSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    iconType: { type: String, default: 'damage' },
    location: { type: String, required: true },
    districtId: { type: String, default: 'kamrup' },
    reportedBy: { type: String, required: true },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low', 'Informational'],
        default: 'Medium',
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'],
        default: 'Pending',
    },
    reportedOn: { type: String, required: true },
    image: { type: String, default: '/assets/field-reports/landslide.jpg' },
    photos: [{ type: String }],
    description: { type: String, required: true },
    coordinates: {
        lat: { type: Number },
        lng: { type: Number },
    },
    verifiedBy: { type: String },
    verifiedAt: { type: Date },
    rejectionReason: { type: String },
}, { timestamps: true });
exports.FieldReport = mongoose_1.default.model('FieldReport', FieldReportSchema);
//# sourceMappingURL=FieldReport.js.map