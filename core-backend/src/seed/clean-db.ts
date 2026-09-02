import bcrypt from 'bcrypt';
import { sequelize, connectPostgres } from '../config/db';
import { connectMongo } from '../config/mongo';
import { redisClient } from '../config/redis';
import {
  User,
  District,
  Road,
  Bridge,
  Route,
  RiskScore,
  Vehicle,
  Driver,
  Trip,
  Delivery,
} from '../models/postgres';
import { FieldReport, Alert, AuditLog, NotificationsLog } from '../models/mongo';

export async function resetDatabase() {
  console.log('🧹 Starting database cleanup (preserving only Admin & Transporter)...');

  await connectPostgres();
  await connectMongo();

  // 1. Clear PostgreSQL operational tables in reverse dependency order
  console.log('🗑️  Deleting PostgreSQL operational tables...');
  await Delivery.destroy({ where: {}, truncate: false });
  await Trip.destroy({ where: {}, truncate: false });
  await Driver.destroy({ where: {}, truncate: false });
  await Vehicle.destroy({ where: {}, truncate: false });
  await RiskScore.destroy({ where: {}, truncate: false });
  await Route.destroy({ where: {}, truncate: false });
  await Bridge.destroy({ where: {}, truncate: false });
  await Road.destroy({ where: {}, truncate: false });
  await District.destroy({ where: {}, truncate: false });

  // 2. Clear all users and keep only Admin and Transporter
  console.log('👤 Resetting Users table to Admin and Transporter accounts only...');
  await User.destroy({ where: {}, truncate: false });

  const adminHash = await bcrypt.hash('admin123', 12);
  const transporterHash = await bcrypt.hash('transporter123', 12);

  await User.bulkCreate([
    {
      id: 'usr_admin_001',
      name: 'System Admin',
      email: 'admin@raahi.gov.in',
      password_hash: adminHash,
      role: 'admin',
      agency: 'Ministry of Development of North Eastern Region (MDoNER)',
      phone: '+91 9876500001',
    },
    {
      id: 'usr_transporter_003',
      name: 'Brahmaputra Logistics Admin',
      email: 'pranab@brahmaputrafleet.com',
      password_hash: transporterHash,
      role: 'transporter',
      transporter_id: 'transporter_01',
      agency: 'Brahmaputra Heavy Freight Logistics Pvt Ltd',
      phone: '+91 9876500003',
    },
  ]);
  console.log('✅ Admin & Transporter users preserved.');

  // 3. Clear MongoDB collections
  console.log('🗑️  Deleting MongoDB collections...');
  await FieldReport.deleteMany({});
  await Alert.deleteMany({});
  await AuditLog.deleteMany({});
  if (NotificationsLog) {
    await NotificationsLog.deleteMany({});
  }
  console.log('✅ MongoDB collections cleared.');

  // 4. Clear Redis cache keys
  try {
    const keys = await redisClient.keys('*');
    if (keys && keys.length > 0) {
      for (const k of keys) {
        await redisClient.del(k);
      }
      console.log(`✅ Redis cache cleared (${keys.length} keys deleted).`);
    } else {
      console.log('✅ Redis cache is empty.');
    }
  } catch (err: any) {
    console.warn('⚠️ Redis cache clear warning (skipped):', err.message);
  }

  // 5. Output Verification Counts
  const userCount = await User.count();
  const deliveryCount = await Delivery.count();
  const tripCount = await Trip.count();
  const vehicleCount = await Vehicle.count();
  const driverCount = await Driver.count();
  const routeCount = await Route.count();
  const districtCount = await District.count();
  const fieldReportCount = await FieldReport.countDocuments();
  const alertCount = await Alert.countDocuments();

  console.log('\n📊 --- Verification Summary ---');
  console.log(`Users preserved: ${userCount} (Expected: 2)`);
  console.log(`Deliveries: ${deliveryCount}`);
  console.log(`Trips: ${tripCount}`);
  console.log(`Vehicles: ${vehicleCount}`);
  console.log(`Drivers: ${driverCount}`);
  console.log(`Routes: ${routeCount}`);
  console.log(`Districts: ${districtCount}`);
  console.log(`MongoDB Field Reports: ${fieldReportCount}`);
  console.log(`MongoDB Alerts: ${alertCount}`);
  console.log('✨ Database reset complete and ready for real API data!');
}

resetDatabase()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error during cleanup:', err);
    process.exit(1);
  });
