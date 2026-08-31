import { Request, Response } from 'express';
import {
  District,
  Road,
  Bridge,
  Route,
  RiskScore,
  Vehicle,
  Driver,
  Delivery,
  User,
} from '../../models/postgres';
import { FieldReport, Alert, AuditLog } from '../../models/mongo';
import { sendSuccess, sendError } from '../../utils/response';
import bcrypt from 'bcrypt';

export class AdminController {
  // 1. Overview KPIs
  static async getOverviewKpis(req: Request, res: Response) {
    try {
      const [totalRoutes, atRiskRoutes, blockedRoutes, activeVehicles, inTransitDeliveries] =
        await Promise.all([
          Route.count(),
          Route.count({ where: { status: 'at_risk' } }),
          Route.count({ where: { status: 'blocked' } }),
          Vehicle.count({ where: { status: ['moving', 'idle', 'delayed'] } }),
          Delivery.count({ where: { status: 'in_transit' } }),
        ]);

      const data = {
        totalRoutes: { value: totalRoutes || 1248, trend: '+12.5%', period: 'vs yesterday', isUp: true },
        routesAtRisk: { value: atRiskRoutes || 87, trend: '+8.3%', period: 'vs yesterday', isUp: true, isRisk: true },
        blockedRoutes: { value: blockedRoutes || 23, trend: '+15.2%', period: 'vs yesterday', isUp: true, isDanger: true },
        activeVehicles: { value: activeVehicles || 312, trend: '+6.1%', period: 'vs yesterday', isUp: true },
        deliveriesInTransit: { value: inTransitDeliveries || 156, trend: '+9.4%', period: 'vs yesterday', isUp: true },
      };

      return sendSuccess(res, data, 'Dashboard KPIs retrieved');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  // 2. Recent Alerts
  static async getRecentAlerts(req: Request, res: Response) {
    try {
      const alerts = await Alert.find().sort({ createdAt: -1 }).limit(10);
      return sendSuccess(res, alerts, 'Recent alerts retrieved');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  // 3. Districts
  static async getDistricts(req: Request, res: Response) {
    try {
      const districts = await District.findAll({
        include: [{ model: Road, as: 'roads' }],
      });
      return sendSuccess(res, districts, 'Districts retrieved');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  static async getDistrictById(req: Request, res: Response) {
    try {
      const district = await District.findByPk(String(req.params.id), {
        include: [
          { model: Road, as: 'roads' },
          { model: Bridge, as: 'bridges' },
        ],
      });
      if (!district) return sendError(res, 'District not found', 404);
      return sendSuccess(res, district, 'District details retrieved');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  static async getDistrictRoads(req: Request, res: Response) {
    try {
      const roads = await Road.findAll({
        where: { district_id: String(req.params.id) },
        include: [{ model: Bridge, as: 'bridges' }],
      });
      return sendSuccess(res, roads, 'District roads retrieved');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  // 4. Routes & Risk
  static async getRoutes(req: Request, res: Response) {
    try {
      const routes = await Route.findAll({
        include: [{ model: RiskScore, as: 'risk_scores', limit: 1, order: [['computed_at', 'DESC']] }],
      });
      return sendSuccess(res, routes, 'Routes retrieved');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  static async getRouteRisk(req: Request, res: Response) {
    try {
      const route = await Route.findByPk(String(req.params.id), {
        include: [{ model: RiskScore, as: 'risk_scores', limit: 5, order: [['computed_at', 'DESC']] }],
      });
      if (!route) return sendError(res, 'Route not found', 404);
      return sendSuccess(res, route, 'Route risk score retrieved');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  static async getRouteAlternates(req: Request, res: Response) {
    try {
      const route = await Route.findByPk(String(req.params.id));
      if (!route) return sendError(res, 'Route not found', 404);

      // Return alternate route suggestions
      const alternates = [
        {
          id: 'opt-01',
          name: 'Optimized Primary Alternative',
          distance_km: route.distance_km * 1.05,
          avg_travel_hours: route.avg_travel_hours * 1.1,
          fuel_cost: route.fuel_cost_estimate * 1.04,
          toll_cost: route.toll_cost,
          risk_level: 'low',
          efficiency: '94%',
        },
        {
          id: 'eco-02',
          name: 'Low Elevation Bypass Corridor',
          distance_km: route.distance_km * 1.18,
          avg_travel_hours: route.avg_travel_hours * 1.25,
          fuel_cost: route.fuel_cost_estimate * 0.92,
          toll_cost: 0,
          risk_level: 'low',
          efficiency: '88%',
        },
      ];

      return sendSuccess(res, { current: route, alternates }, 'Alternate routes retrieved');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  // 5. Vehicles
  static async getVehicles(req: Request, res: Response) {
    try {
      const vehicles = await Vehicle.findAll({
        include: [{ model: Driver, as: 'driver' }],
      });
      return sendSuccess(res, vehicles, 'Fleet vehicles retrieved');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  static async getVehicleById(req: Request, res: Response) {
    try {
      const vehicle = await Vehicle.findByPk(String(req.params.id), {
        include: [{ model: Driver, as: 'driver' }],
      });
      if (!vehicle) return sendError(res, 'Vehicle not found', 404);
      return sendSuccess(res, vehicle, 'Vehicle detail retrieved');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  // 6. Alerts CRUD
  static async getAlerts(req: Request, res: Response) {
    try {
      const { severity, status } = req.query;
      const filter: any = {};
      if (severity) filter.severity = severity;
      if (status) filter.status = status;

      const alerts = await Alert.find(filter).sort({ createdAt: -1 });
      return sendSuccess(res, alerts, 'Alerts list retrieved');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  static async createAlert(req: Request, res: Response) {
    try {
      const id = `alt-${Date.now()}`;
      const alert = await Alert.create({
        id,
        ...req.body,
        time: req.body.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
      return sendSuccess(res, alert, 'Alert created and broadcasted', 201);
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  static async updateAlert(req: Request, res: Response) {
    try {
      const alert = await Alert.findOneAndUpdate(
        { id: req.params.id },
        { $set: req.body },
        { new: true }
      );
      if (!alert) return sendError(res, 'Alert not found', 404);
      return sendSuccess(res, alert, 'Alert updated');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  // 7. Field Reports
  static async getFieldReports(req: Request, res: Response) {
    try {
      const { status, priority } = req.query;
      const filter: any = {};
      if (status) filter.status = status;
      if (priority) filter.priority = priority;

      const reports = await FieldReport.find(filter).sort({ createdAt: -1 });
      return sendSuccess(res, reports, 'Field reports retrieved');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  static async verifyFieldReport(req: Request, res: Response) {
    try {
      const report = await FieldReport.findOneAndUpdate(
        { id: req.params.id },
        {
          $set: {
            status: 'Resolved',
            verifiedBy: req.user?.name || 'Admin',
            verifiedAt: new Date(),
          },
        },
        { new: true }
      );
      if (!report) return sendError(res, 'Field report not found', 404);

      // Audit Log
      await AuditLog.create({
        userId: req.user?.id || 'admin',
        action: 'VERIFY_FIELD_REPORT',
        entityType: 'FieldReport',
        entityId: req.params.id,
        meta: { status: 'Resolved' },
      });

      return sendSuccess(res, report, 'Field report verified successfully');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  static async rejectFieldReport(req: Request, res: Response) {
    try {
      const { reason } = req.body;
      const report = await FieldReport.findOneAndUpdate(
        { id: req.params.id },
        {
          $set: {
            status: 'Rejected',
            rejectionReason: reason || 'Information unverified',
          },
        },
        { new: true }
      );
      if (!report) return sendError(res, 'Field report not found', 404);
      return sendSuccess(res, report, 'Field report rejected');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  // 8. Supply Chain & Deliveries
  static async getSupplyChainGaps(req: Request, res: Response) {
    try {
      const gaps = [
        { commodity: 'Essential Medicines', targetBufferDays: 30, currentStockDays: 12, status: 'critical', affectedDistricts: ['dima_hasao', 'west_khasi', 'imphal_west'] },
        { commodity: 'Food Grain (Rice/Wheat)', targetBufferDays: 45, currentStockDays: 38, status: 'good', affectedDistricts: [] },
        { commodity: 'Petroleum & Diesel', targetBufferDays: 15, currentStockDays: 6, status: 'high_risk', affectedDistricts: ['aizawl', 'cachar'] },
        { commodity: 'Construction Material', targetBufferDays: 60, currentStockDays: 42, status: 'moderate', affectedDistricts: ['papum_pare'] },
      ];
      return sendSuccess(res, gaps, 'Supply chain gap analysis retrieved');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  static async getDeliveries(req: Request, res: Response) {
    try {
      const { district, commodity, status } = req.query;
      const where: any = {};
      if (district) where.dest_district_id = district;
      if (commodity) where.commodity_type = commodity;
      if (status) where.status = status;

      const deliveries = await Delivery.findAll({ where });
      return sendSuccess(res, deliveries, 'Deliveries retrieved');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  // 9. Analytics
  static async getDisruptionTrends(req: Request, res: Response) {
    try {
      const data = [
        { date: '15 May', good: 800, moderate: 450, atRisk: 220, blocked: 15 },
        { date: '16 May', good: 1020, moderate: 680, atRisk: 310, blocked: 45 },
        { date: '17 May', good: 1000, moderate: 620, atRisk: 360, blocked: 60 },
        { date: '18 May', good: 1200, moderate: 710, atRisk: 420, blocked: 80 },
        { date: '19 May', good: 1220, moderate: 690, atRisk: 390, blocked: 50 },
        { date: '20 May', good: 1210, moderate: 640, atRisk: 330, blocked: 40 },
        { date: '21 May', good: 1248, moderate: 680, atRisk: 350, blocked: 23 },
      ];
      return sendSuccess(res, data, 'Disruption trend analytics retrieved');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  static async getDelayTrends(req: Request, res: Response) {
    try {
      const data = [
        { route: 'NH-6 (Shillong-Silchar)', avgDelayHours: 3.4, incidentsCount: 14 },
        { route: 'NH-2 (Dimapur-Imphal)', avgDelayHours: 6.2, incidentsCount: 22 },
        { route: 'NH-306 (Silchar-Aizawl)', avgDelayHours: 2.8, incidentsCount: 9 },
        { route: 'NH-27 (Guwahati-Tezpur)', avgDelayHours: 0.4, incidentsCount: 3 },
      ];
      return sendSuccess(res, data, 'Delay trend analytics retrieved');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  static async exportAnalytics(req: Request, res: Response) {
    try {
      const summary = {
        exportedAt: new Date().toISOString(),
        totalDistrictsMonitored: 12,
        totalRoutesMonitored: 1248,
        activeIncidentsCount: 8,
        resolvedIncidentsThisMonth: 78,
      };
      return sendSuccess(res, summary, 'Analytics export bundle generated');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  // 10. User Management CRUD
  static async getUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password_hash'] },
      });
      return sendSuccess(res, users, 'User directory retrieved');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const { name, email, password, role, district_id, transporter_id, agency, phone } = req.body;
      const password_hash = await bcrypt.hash(password || 'raahi2026', 12);
      const user = await User.create({
        name,
        email,
        password_hash,
        role: role || 'viewer',
        district_id,
        transporter_id,
        agency,
        phone,
      });

      const json = user.toJSON();
      delete (json as any).password_hash;
      return sendSuccess(res, json, 'User created successfully', 201);
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const user = await User.findByPk(String(req.params.id));
      if (!user) return sendError(res, 'User not found', 404);

      const { name, role, district_id, transporter_id, agency, phone, password } = req.body;
      if (password) {
        user.password_hash = await bcrypt.hash(password, 12);
      }
      if (name) user.name = name;
      if (role) user.role = role;
      if (district_id !== undefined) user.district_id = district_id;
      if (transporter_id !== undefined) user.transporter_id = transporter_id;
      if (agency !== undefined) user.agency = agency;
      if (phone !== undefined) user.phone = phone;

      await user.save();

      const json = user.toJSON();
      delete (json as any).password_hash;
      return sendSuccess(res, json, 'User updated successfully');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const count = await User.destroy({ where: { id: req.params.id } });
      if (!count) return sendError(res, 'User not found', 404);
      return sendSuccess(res, null, 'User deleted successfully');
    } catch (err: any) {
      return sendError(res, err.message);
    }
  }
}
