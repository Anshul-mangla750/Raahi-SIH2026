"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSeed = runSeed;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../config/db");
const mongo_1 = require("../config/mongo");
const postgres_1 = require("../models/postgres");
const mongo_2 = require("../models/mongo");
async function runSeed() {
    console.log('🌱 Starting comprehensive database seed for NER LogiSmart Platform...');
    await (0, db_1.connectPostgres)();
    await (0, mongo_1.connectMongo)();
    // Sync PostgreSQL schema (force: true to re-create clean tables for seeding)
    await db_1.sequelize.sync({ force: true });
    console.log('✅ PostgreSQL tables synchronized (clean schema).');
    // 1. Seed Users
    const passwordHash = await bcrypt_1.default.hash('admin123', 12);
    const transporterHash = await bcrypt_1.default.hash('transporter123', 12);
    const driverHash = await bcrypt_1.default.hash('driver123', 12);
    const officialHash = await bcrypt_1.default.hash('official123', 12);
    const userHash = await bcrypt_1.default.hash('user123', 12);
    await postgres_1.User.bulkCreate([
        {
            id: 'usr_admin_001',
            name: 'Dr. Mukul Sharma',
            email: 'admin@raahi.gov.in',
            password_hash: passwordHash,
            role: 'admin',
            agency: 'Ministry of Development of North Eastern Region (MDoNER)',
            phone: '+91 9876500001',
        },
        {
            id: 'usr_official_002',
            name: 'Debashis Hazarika',
            email: 'd.hazarika@nhidcl.gov.in',
            password_hash: officialHash,
            role: 'district_officer',
            district_id: 'kamrup',
            agency: 'NHIDCL Regional Office Guwahati',
            phone: '+91 9876500002',
        },
        {
            id: 'usr_transporter_003',
            name: 'Pranab Gogoi',
            email: 'pranab@brahmaputrafleet.com',
            password_hash: transporterHash,
            role: 'transporter',
            transporter_id: 'transporter_01',
            agency: 'Brahmaputra Heavy Freight Logistics Pvt Ltd',
            phone: '+91 9876500003',
        },
        {
            id: 'usr_driver_004',
            name: 'Rakesh Das',
            email: 'rakesh.das@brahmaputra.in',
            password_hash: driverHash,
            role: 'driver',
            transporter_id: 'transporter_01',
            phone: '9876543210',
        },
        {
            id: 'usr_user_005',
            name: 'Arun Sharma',
            email: 'arun.sharma@northeastlogistics.in',
            password_hash: userHash,
            role: 'viewer',
            agency: 'Assam Essential Supplies Corporation',
            phone: '+91 9876500005',
        },
    ]);
    console.log('✅ Users seeded.');
    // 2. Seed Districts
    const districtsData = [
        { id: 'kamrup', name: 'Kamrup Metropolitan (Guwahati)', state: 'Assam', connectivity_status: 'accessible', connectivity_score: 92, population: 1253938, lat: 26.1445, lng: 91.7362 },
        { id: 'sonitpur', name: 'Sonitpur (Tezpur)', state: 'Assam', connectivity_status: 'accessible', connectivity_score: 84, population: 1924110, lat: 26.6528, lng: 92.7926 },
        { id: 'cachar', name: 'Cachar (Silchar)', state: 'Assam', connectivity_status: 'partial', connectivity_score: 68, population: 1736617, lat: 24.8170, lng: 92.7985 },
        { id: 'dima_hasao', name: 'Dima Hasao (Haflong)', state: 'Assam', connectivity_status: 'partial', connectivity_score: 58, population: 214102, lat: 25.1764, lng: 93.0232 },
        { id: 'east_khasi', name: 'East Khasi Hills (Shillong)', state: 'Meghalaya', connectivity_status: 'accessible', connectivity_score: 88, population: 825922, lat: 25.5788, lng: 91.8933 },
        { id: 'west_khasi', name: 'West Khasi Hills (Nongstoin)', state: 'Meghalaya', connectivity_status: 'partial', connectivity_score: 65, population: 383461, lat: 25.5244, lng: 91.2662 },
        { id: 'dimapur', name: 'Dimapur', state: 'Nagaland', connectivity_status: 'accessible', connectivity_score: 80, population: 378811, lat: 25.9060, lng: 93.7270 },
        { id: 'kohima', name: 'Kohima', state: 'Nagaland', connectivity_status: 'partial', connectivity_score: 72, population: 267988, lat: 25.6751, lng: 94.1086 },
        { id: 'imphal_west', name: 'Imphal West', state: 'Manipur', connectivity_status: 'blocked', connectivity_score: 42, population: 517992, lat: 24.8170, lng: 93.9368 },
        { id: 'aizawl', name: 'Aizawl', state: 'Mizoram', connectivity_status: 'partial', connectivity_score: 64, population: 400309, lat: 23.7271, lng: 92.7176 },
        { id: 'papum_pare', name: 'Papum Pare (Itanagar)', state: 'Arunachal Pradesh', connectivity_status: 'accessible', connectivity_score: 78, population: 176573, lat: 27.0844, lng: 93.6053 },
        { id: 'west_tripura', name: 'West Tripura (Agartala)', state: 'Tripura', connectivity_status: 'accessible', connectivity_score: 86, population: 918200, lat: 23.8315, lng: 91.2868 },
    ];
    await postgres_1.District.bulkCreate(districtsData);
    console.log('✅ Districts seeded.');
    // 3. Seed Roads
    const roadsData = [
        { id: 'NH-27', name: 'National Highway 27 (East-West Corridor)', district_id: 'kamrup', road_type: '4-Lane National Highway', condition: 'good', slope_risk: 15, length_km: 180 },
        { id: 'NH-37', name: 'National Highway 37 (Brahmaputra Valley Trunk)', district_id: 'sonitpur', road_type: '2-Lane National Highway', condition: 'good', slope_risk: 20, length_km: 145 },
        { id: 'NH-6', name: 'National Highway 6 (Shillong-Silchar Corridor)', district_id: 'dima_hasao', road_type: 'Hill Highway', condition: 'damaged', slope_risk: 75, length_km: 210 },
        { id: 'NH-2', name: 'National Highway 2 (Dimapur-Kohima-Imphal)', district_id: 'dimapur', road_type: 'Mountain Highway', condition: 'blocked', slope_risk: 85, length_km: 195 },
        { id: 'NH-306', name: 'National Highway 306 (Silchar-Aizawl Lifeline)', district_id: 'cachar', road_type: '2-Lane Hill Road', condition: 'damaged', slope_risk: 65, length_km: 130 },
        { id: 'NH-415', name: 'National Highway 415 (Banderdewa-Itanagar)', district_id: 'papum_pare', road_type: '4-Lane Highway', condition: 'good', slope_risk: 30, length_km: 60 },
    ];
    await postgres_1.Road.bulkCreate(roadsData);
    console.log('✅ Roads seeded.');
    // 4. Seed Bridges
    const bridgesData = [
        { id: 'BR-01', name: 'Saraighat Double Decker Bridge', road_id: 'NH-27', district_id: 'kamrup', status: 'operational', load_capacity_tons: 60, lat: 26.1287, lng: 91.6811 },
        { id: 'BR-02', name: 'Kolia Bhomora Setu (Brahmaputra)', road_id: 'NH-37', district_id: 'sonitpur', status: 'operational', load_capacity_tons: 50, lat: 26.6044, lng: 92.8622 },
        { id: 'BR-03', name: 'Jatinga Valley Viaduct', road_id: 'NH-6', district_id: 'dima_hasao', status: 'damaged', load_capacity_tons: 25, lat: 25.1200, lng: 93.0300 },
        { id: 'BR-04', name: 'Barak River Suspension Bridge', road_id: 'NH-306', district_id: 'cachar', status: 'operational', load_capacity_tons: 40, lat: 24.8300, lng: 92.8100 },
    ];
    await postgres_1.Bridge.bulkCreate(bridgesData);
    console.log('✅ Bridges seeded.');
    // 5. Seed Routes & Risk Scores
    const routesData = [
        { id: 'R-01', name: 'Guwahati → Tezpur (NH-27/37)', origin_district_id: 'kamrup', dest_district_id: 'sonitpur', road_ids: ['NH-27', 'NH-37'], distance_km: 175, avg_travel_hours: 3.5, status: 'good', current_risk_score: 18, fuel_cost_estimate: 2450, toll_cost: 320 },
        { id: 'R-02', name: 'Guwahati → Shillong (NH-6)', origin_district_id: 'kamrup', dest_district_id: 'east_khasi', road_ids: ['NH-6'], distance_km: 98, avg_travel_hours: 2.2, status: 'good', current_risk_score: 22, fuel_cost_estimate: 1550, toll_cost: 180 },
        { id: 'R-03', name: 'Silchar → Aizawl (NH-306)', origin_district_id: 'cachar', dest_district_id: 'aizawl', road_ids: ['NH-306'], distance_km: 168, avg_travel_hours: 6.0, status: 'at_risk', current_risk_score: 68, fuel_cost_estimate: 3200, toll_cost: 0 },
        { id: 'R-04', name: 'Dimapur → Kohima → Imphal (NH-2)', origin_district_id: 'dimapur', dest_district_id: 'imphal_west', road_ids: ['NH-2'], distance_km: 215, avg_travel_hours: 8.5, status: 'blocked', current_risk_score: 92, fuel_cost_estimate: 4800, toll_cost: 250 },
        { id: 'R-05', name: 'Guwahati → Itanagar (NH-415)', origin_district_id: 'kamrup', dest_district_id: 'papum_pare', road_ids: ['NH-27', 'NH-415'], distance_km: 330, avg_travel_hours: 7.0, status: 'good', current_risk_score: 28, fuel_cost_estimate: 4900, toll_cost: 450 },
    ];
    await postgres_1.Route.bulkCreate(routesData);
    await postgres_1.RiskScore.bulkCreate([
        { route_id: 'R-01', score: 18, risk_level: 'low', factors: { rainfall_24h_mm: 5.2, slope_risk: 15, road_condition: 'good', congestion: 'low' } },
        { route_id: 'R-02', score: 22, risk_level: 'low', factors: { rainfall_24h_mm: 12.0, slope_risk: 35, road_condition: 'good', congestion: 'moderate' } },
        { route_id: 'R-03', score: 68, risk_level: 'high', factors: { rainfall_24h_mm: 45.8, slope_risk: 70, road_condition: 'damaged', congestion: 'high' } },
        { route_id: 'R-04', score: 92, risk_level: 'critical', factors: { rainfall_24h_mm: 82.4, slope_risk: 85, road_condition: 'blocked', congestion: 'blocked' } },
        { route_id: 'R-05', score: 28, risk_level: 'low', factors: { rainfall_24h_mm: 8.4, slope_risk: 25, road_condition: 'good', congestion: 'low' } },
    ]);
    console.log('✅ Routes and Risk Scores seeded.');
    // 6. Seed Vehicles & Drivers
    await postgres_1.Vehicle.bulkCreate([
        { id: 'AS-01-AB-1234', model: 'Tata 407 LPT', transporter_id: 'transporter_01', type: 'Light Commercial Vehicle', capacity_kg: 3500, status: 'moving', current_lat: 26.2006, current_lng: 92.9376, speed: 45, fuel_percent: 78, current_route: 'Guwahati → Tezpur' },
        { id: 'AS-01-CD-5678', model: 'BharatBenz 1214R', transporter_id: 'transporter_01', type: 'Medium Duty Truck', capacity_kg: 7500, status: 'moving', current_lat: 26.6528, current_lng: 92.7926, speed: 60, fuel_percent: 85, current_route: 'Guwahati → Mangaldai' },
        { id: 'AS-01-EF-9012', model: 'Eicher Pro 2049', transporter_id: 'transporter_01', type: 'Medium Duty Truck', capacity_kg: 5000, status: 'moving', current_lat: 26.3452, current_lng: 92.6840, speed: 55, fuel_percent: 62, current_route: 'Nagaon → Dimapur' },
        { id: 'AS-01-GH-3456', model: 'Tata 1109 Heavy', transporter_id: 'transporter_01', type: 'Heavy Commercial Vehicle', capacity_kg: 11000, status: 'delayed', current_lat: 26.0022, current_lng: 92.8580, speed: 40, fuel_percent: 45, current_route: 'Hojai → Nagaon' },
        { id: 'AS-01-IJ-7890', model: 'Ashok Leyland 1616', transporter_id: 'transporter_01', type: 'Heavy Commercial Vehicle', capacity_kg: 16000, status: 'stopped', current_lat: 25.5788, current_lng: 91.8933, speed: 0, fuel_percent: 30, current_route: 'Shillong → Hojai' },
        { id: 'AS-01-KL-1122', model: 'Tata 407 Gold', transporter_id: 'transporter_01', type: 'Light Commercial Vehicle', capacity_kg: 3500, status: 'offline', current_lat: 26.1445, current_lng: 91.7362, speed: 0, fuel_percent: 90, current_route: 'Depot Base Guwahati' },
    ]);
    await postgres_1.Driver.bulkCreate([
        { id: 'DRV-01', name: 'Rakesh Das', phone: '9876543210', license_number: 'AS-0120190045123', license_expiry: new Date('2028-12-31'), vehicle_id: 'AS-01-AB-1234', transporter_id: 'transporter_01', status: 'active', rating: 4.9 },
        { id: 'DRV-02', name: 'Manoj Kalita', phone: '9876543211', license_number: 'AS-0120180034871', license_expiry: new Date('2027-08-15'), vehicle_id: 'AS-01-CD-5678', transporter_id: 'transporter_01', status: 'active', rating: 4.7 },
        { id: 'DRV-03', name: 'Anupam Saikia', phone: '9876543212', license_number: 'AS-0220200056912', license_expiry: new Date('2029-03-20'), vehicle_id: 'AS-01-EF-9012', transporter_id: 'transporter_01', status: 'active', rating: 4.8 },
        { id: 'DRV-04', name: 'Bikash Borah', phone: '9876543213', license_number: 'AS-0320170021456', license_expiry: new Date('2026-11-10'), vehicle_id: 'AS-01-GH-3456', transporter_id: 'transporter_01', status: 'active', rating: 4.6 },
        { id: 'DRV-05', name: 'Jitu Kalita', phone: '9876543214', license_number: 'ML-0120190089341', license_expiry: new Date('2028-05-25'), vehicle_id: 'AS-01-IJ-7890', transporter_id: 'transporter_01', status: 'active', rating: 4.5 },
    ]);
    console.log('✅ Vehicles and Drivers seeded.');
    // 7. Seed Deliveries / Consignments
    await postgres_1.Delivery.bulkCreate([
        { id: 'CON-2025-0891', transporter_id: 'transporter_01', origin_district_id: 'kamrup', dest_district_id: 'sonitpur', commodity_type: 'medicine', priority: 'critical', consignee_name: 'Tezpur Civil Hospital Emergency Cell', consignee_phone: '+91 9435012345', weight_kg: 850, status: 'in_transit' },
        { id: 'CON-2025-0892', transporter_id: 'transporter_01', origin_district_id: 'kamrup', dest_district_id: 'papum_pare', commodity_type: 'food', priority: 'high', consignee_name: 'FCI Depot Banderdewa', consignee_phone: '+91 9435023456', weight_kg: 3200, status: 'in_transit' },
        { id: 'CON-2025-0893', transporter_id: 'transporter_01', origin_district_id: 'cachar', dest_district_id: 'aizawl', commodity_type: 'fuel', priority: 'critical', consignee_name: 'Mizoram State Petroleum Reserve', consignee_phone: '+91 9435034567', weight_kg: 6000, status: 'delayed' },
        { id: 'CON-2025-0894', transporter_id: 'transporter_01', origin_district_id: 'kamrup', dest_district_id: 'east_khasi', commodity_type: 'construction', priority: 'medium', consignee_name: 'PWD Meghalaya Infrastructure Div', consignee_phone: '+91 9435045678', weight_kg: 4500, status: 'delivered', delivered_at: new Date('2026-05-20T14:30:00Z') },
    ]);
    console.log('✅ Deliveries seeded.');
    // 8. Seed MongoDB Field Reports
    await mongo_2.FieldReport.deleteMany({});
    await mongo_2.FieldReport.insertMany([
        {
            id: 'FR-2025-0128',
            type: 'Road Damage',
            iconType: 'damage',
            location: 'NH-27, Tezpur Assam',
            districtId: 'sonitpur',
            reportedBy: 'Rakesh Das (Driver)',
            priority: 'High',
            status: 'In Progress',
            reportedOn: '21 May 2025 10:15 AM',
            image: '/assets/field-reports/landslide.jpg',
            description: 'Heavy road surface breakdown and fallen debris blocking lane 2 near the foothills.',
            coordinates: { lat: 26.6528, lng: 92.7926 },
        },
        {
            id: 'FR-2025-0127',
            type: 'Traffic Jam',
            iconType: 'traffic',
            location: 'NH-37, Nagaon Assam',
            districtId: 'kamrup',
            reportedBy: 'Anupam Saikia (Driver)',
            priority: 'Medium',
            status: 'Resolved',
            reportedOn: '21 May 2025 09:45 AM',
            image: '/assets/field-reports/traffic.jpg',
            description: 'Cargo vehicle congestion near toll gate cleared by traffic police.',
            coordinates: { lat: 26.3452, lng: 92.6840 },
        },
        {
            id: 'FR-2025-0126',
            type: 'Accident',
            iconType: 'accident',
            location: 'NH-27, Dhekiajuli Assam',
            districtId: 'sonitpur',
            reportedBy: 'Bikash Borah (Driver)',
            priority: 'High',
            status: 'In Progress',
            reportedOn: '21 May 2025 09:20 AM',
            image: '/assets/field-reports/traffic.jpg',
            description: 'Minor collision between utility truck and auto rickshaw; emergency crew dispatched.',
            coordinates: { lat: 26.7000, lng: 92.5000 },
        },
        {
            id: 'FR-2025-0125',
            type: 'Road Block',
            iconType: 'block',
            location: 'NH-2, Diphu Assam',
            districtId: 'dima_hasao',
            reportedBy: 'Manoj Kalita (Driver)',
            priority: 'High',
            status: 'Pending',
            reportedOn: '21 May 2025 08:50 AM',
            image: '/assets/field-reports/landslide.jpg',
            description: 'Tree fell across road due to gusty winds; clearance team requested.',
            coordinates: { lat: 25.8500, lng: 93.4300 },
        },
        {
            id: 'FR-2025-0124',
            type: 'Weather Issue',
            iconType: 'weather',
            location: 'NH-37, Hojai Assam',
            districtId: 'kamrup',
            reportedBy: 'Jitu Kalita (Driver)',
            priority: 'Medium',
            status: 'Resolved',
            reportedOn: '21 May 2025 08:30 AM',
            image: '/assets/field-reports/waterlogged.jpg',
            description: 'Dense morning fog reducing visibility to 20m; now dissipated.',
            coordinates: { lat: 26.0022, lng: 92.8580 },
        },
    ]);
    console.log('✅ MongoDB Field Reports seeded.');
    // 9. Seed MongoDB Alerts
    await mongo_2.Alert.deleteMany({});
    await mongo_2.Alert.insertMany([
        {
            id: 'alt-1',
            title: 'Landslide reported on NH-13 near Jorhat, Assam',
            type: 'landslide',
            severity: 'High',
            severityClass: 'high',
            districtId: 'sonitpur',
            routeId: 'R-01',
            location: 'Jorhat, Assam',
            time: '10:15 AM',
            message: 'Debris blockage covering both lanes on NH-13 mile marker 44. Clearance machinery deployed.',
            translations: {
                en: 'Landslide reported on NH-13 near Jorhat, Assam',
                as: 'যোৰহাটৰ ওচৰত NH-13 ত ভূমিস্খলনৰ খবৰ',
                bn: 'জোড়হাটের কাছে NH-13 এ ভূমিধসের খবর',
            },
            status: 'active',
        },
        {
            id: 'alt-2',
            title: 'Heavy rainfall predicted in East Khasi Hills',
            type: 'weather_warning',
            severity: 'Medium',
            severityClass: 'medium',
            districtId: 'east_khasi',
            routeId: 'R-02',
            location: 'East Khasi Hills',
            time: '09:45 AM',
            message: 'IMD red watch issued for heavy rain and surface runoff across Shillong bypass.',
            translations: {
                en: 'Heavy rainfall predicted in East Khasi Hills',
                as: 'পূব খাচী পাহাৰত প্ৰচণ্ড বৰষুণৰ সম্ভাৱনা',
            },
            status: 'active',
        },
        {
            id: 'alt-3',
            title: 'Traffic congestion on NH-27 near Lumding',
            type: 'congestion',
            severity: 'Medium',
            severityClass: 'medium',
            districtId: 'dima_hasao',
            location: 'Lumding, Assam',
            time: '09:20 AM',
            message: 'Slow moving freight movement due to railway gate crossing.',
            status: 'active',
        },
        {
            id: 'alt-4',
            title: 'Route cleared on NH-2 near Dimapur',
            type: 'route_cleared',
            severity: 'Low',
            severityClass: 'low',
            districtId: 'dimapur',
            location: 'Dimapur, Nagaland',
            time: '08:50 AM',
            message: 'NH-2 section between Chumukedima and Kohima re-opened for normal commercial traffic.',
            status: 'resolved',
        },
    ]);
    console.log('✅ MongoDB Alerts seeded.');
    console.log('🎉 Full database seeding completed successfully!');
}
// If run directly via CLI
if (require.main === module) {
    runSeed()
        .then(() => {
        console.log('Done!');
        process.exit(0);
    })
        .catch((err) => {
        console.error('Seed error:', err);
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map