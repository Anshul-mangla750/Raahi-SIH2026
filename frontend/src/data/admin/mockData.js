// Comprehensive Mock Data for RAAHI / NER LogiSmart Logistics Management System

export const DASHBOARD_METRICS = {
  totalRoutes: { value: '1,248', trend: '+12.5%', period: 'vs yesterday', isUp: true },
  routesAtRisk: { value: '87', trend: '+8.3%', period: 'vs yesterday', isUp: true, isRisk: true },
  blockedRoutes: { value: '23', trend: '+15.2%', period: 'vs yesterday', isUp: true, isDanger: true },
  activeVehicles: { value: '312', trend: '+6.1%', period: 'vs yesterday', isUp: true },
  deliveriesInTransit: { value: '156', trend: '+9.4%', period: 'vs yesterday', isUp: true },
};

export const AI_RISK_PREDICTIONS = {
  totalRisks: 87,
  lastUpdated: '30 mins ago',
  breakdown: [
    { label: 'High Risk', count: 23, percentage: 26, color: '#EF4444' },
    { label: 'Medium Risk', count: 36, percentage: 41, color: '#F59E0B' },
    { label: 'Low Risk', count: 28, percentage: 32, color: '#10B981' },
  ],
};

export const WEATHER_DATA = {
  city: 'Guwahati',
  temp: '24°C',
  condition: 'Light Rain',
  humidity: '78%',
  wind: '12 km/h',
  rainfall: '6.4 mm',
};

export const DELIVERIES_OVERVIEW = {
  total: 156,
  period: 'This Week',
  breakdown: [
    { label: 'Delivered', count: 78, percentage: 50, color: '#10B981' },
    { label: 'In Transit', count: 56, percentage: 36, color: '#3B82F6' },
    { label: 'Delayed', count: 14, percentage: 9, color: '#F59E0B' },
    { label: 'Canceled', count: 8, percentage: 5, color: '#EF4444' },
  ],
};

export const ACTIVE_VEHICLES_FEED = [
  { id: 'AS01AB1234', route: 'Guwahati → Itanagar', status: 'On Time', statusType: 'on-time', speed: '45 km/h', driver: 'Rakesh Das', vehicle: 'Tata 407' },
  { id: 'AS02CD5678', route: 'Silchar → Aizawl', status: 'Delayed', statusType: 'delayed', speed: '60 km/h', driver: 'Manoj Kalita', vehicle: 'BharatBenz 1214' },
  { id: 'ML01EF9012', route: 'Shillong → Tura', status: 'On Time', statusType: 'on-time', speed: '55 km/h', driver: 'Anupam Saikia', vehicle: 'Eicher Pro 2049' },
  { id: 'NL01GH3456', route: 'Dimapur → Kohima', status: 'Delayed', statusType: 'delayed', speed: '40 km/h', driver: 'Bikash Borah', vehicle: 'Tata 1109' },
  { id: 'MN01IJ7890', route: 'Imphal → Ukhrul', status: 'On Time', statusType: 'on-time', speed: '35 km/h', driver: 'Jitu Kalita', vehicle: 'Ashok Leyland' },
];

export const RECENT_ALERTS = [
  {
    id: 'alt-1',
    title: 'Landslide reported on NH-13 near Jorhat, Assam',
    time: '10:15 AM',
    severity: 'High',
    severityClass: 'high',
    location: 'Jorhat, Assam',
  },
  {
    id: 'alt-2',
    title: 'Heavy rainfall predicted in East Khasi Hills',
    time: '09:45 AM',
    severity: 'Medium',
    severityClass: 'medium',
    location: 'East Khasi Hills',
  },
  {
    id: 'alt-3',
    title: 'Traffic congestion on NH-27 near Lumding',
    time: '09:20 AM',
    severity: 'Medium',
    severityClass: 'medium',
    location: 'Lumding, Assam',
  },
  {
    id: 'alt-4',
    title: 'Route cleared on NH-2 near Dimapur',
    time: '08:50 AM',
    severity: 'Low',
    severityClass: 'low',
    location: 'Dimapur, Nagaland',
  },
];

export const RECENT_FIELD_REPORTS = [
  {
    id: 'fr-d1',
    title: 'Road blocked due to landslide',
    location: 'West Khasi Hills',
    time: 'Today, 09:30 AM',
    image: '/assets/field-reports/landslide.jpg',
  },
  {
    id: 'fr-d2',
    title: 'Bridge damage reported on local route',
    location: 'Dima Hasao',
    time: 'Today, 08:45 AM',
    image: '/assets/field-reports/bridge_damage.jpg',
  },
  {
    id: 'fr-d3',
    title: 'Waterlogging on NH-306',
    location: 'Cachar',
    time: 'Today, 07:30 AM',
    image: '/assets/field-reports/waterlogged.jpg',
  },
];

export const ROUTE_STATUS_TREND = [
  { date: '15 May', good: 800, moderate: 450, atRisk: 220, blocked: 15 },
  { date: '16 May', good: 1020, moderate: 680, atRisk: 310, blocked: 45 },
  { date: '17 May', good: 1000, moderate: 620, atRisk: 360, blocked: 60 },
  { date: '18 May', good: 1200, moderate: 710, atRisk: 420, blocked: 80 },
  { date: '19 May', good: 1220, moderate: 690, atRisk: 390, blocked: 50 },
  { date: '20 May', good: 1210, moderate: 640, atRisk: 330, blocked: 40 },
  { date: '21 May', good: 1248, moderate: 680, atRisk: 350, blocked: 23 },
];

export const DISTRICT_CONNECTIVITY = [
  { district: 'Kamrup (M)', good: '82%', moderate: '12%', atRisk: '4%', blocked: '2%', score: 82, status: 'good' },
  { district: 'Dima Hasao', good: '68%', moderate: '18%', atRisk: '9%', blocked: '5%', score: 68, status: 'moderate' },
  { district: 'West Khasi Hills', good: '65%', moderate: '20%', atRisk: '10%', blocked: '5%', score: 65, status: 'moderate' },
  { district: 'Lohit', good: '74%', moderate: '15%', atRisk: '7%', blocked: '4%', score: 74, status: 'good' },
  { district: 'Mamit', good: '60%', moderate: '20%', atRisk: '12%', blocked: '8%', score: 60, status: 'moderate' },
];

// VEHICLE TRACKING DATA
export const VEHICLE_TRACKING_STATS = {
  totalVehicles: { value: 86, label: 'Active Fleet' },
  vehiclesOnRoute: { value: 58, label: '67% of total' },
  completedDeliveries: { value: 126, label: 'Today' },
  activeAlerts: { value: 7, label: 'Requires Attention', isWarning: true },
  avgOnTimeDelivery: { value: '94.6%', label: 'This Month' },
};

export const LIVE_VEHICLES_LIST = [
  {
    id: 'AS-01-AB-1234',
    model: 'Tata 407',
    driver: 'Rakesh Das',
    status: 'Moving',
    statusClass: 'moving',
    speed: '45 km/h',
    time: '10:30 AM',
    route: 'Guwahati → Tezpur',
    lat: 26.2006,
    lng: 92.9376,
    fuel: '78%',
  },
  {
    id: 'AS-01-CD-5678',
    model: 'BharatBenz 1214',
    driver: 'Manoj Kalita',
    status: 'Moving',
    statusClass: 'moving',
    speed: '60 km/h',
    time: '10:30 AM',
    route: 'Guwahati → Mangaldai',
    lat: 26.6528,
    lng: 92.7926,
    fuel: '85%',
  },
  {
    id: 'AS-01-EF-9012',
    model: 'Eicher Pro 2049',
    driver: 'Anupam Saikia',
    status: 'Moving',
    statusClass: 'moving',
    speed: '55 km/h',
    time: '10:29 AM',
    route: 'Nagaon → Dimapur',
    lat: 26.3452,
    lng: 92.6840,
    fuel: '62%',
  },
  {
    id: 'AS-01-GH-3456',
    model: 'Tata 1109',
    driver: 'Bikash Borah',
    status: 'Delayed',
    statusClass: 'delayed',
    speed: '40 km/h',
    time: '10:28 AM',
    route: 'Hojai → Nagaon',
    lat: 26.0022,
    lng: 92.8580,
    fuel: '45%',
  },
  {
    id: 'AS-01-IJ-7890',
    model: 'Ashok Leyland',
    driver: 'Jitu Kalita',
    status: 'Stopped',
    statusClass: 'stopped',
    speed: '0 km/h',
    time: '10:25 AM',
    route: 'Shillong → Hojai',
    lat: 25.5788,
    lng: 91.8933,
    fuel: '30%',
  },
  {
    id: 'AS-01-KL-1122',
    model: 'Tata 407',
    driver: 'Nitulpal Dutta',
    status: 'Offline',
    statusClass: 'offline',
    speed: '-',
    time: '10:10 AM',
    route: 'Depot Base',
    lat: 26.1445,
    lng: 91.7362,
    fuel: '90%',
  },
];

export const FLEET_OVERVIEW_DATA = [
  { label: 'Moving', count: 58, percentage: 67, color: '#10B981' },
  { label: 'Idle', count: 12, percentage: 14, color: '#3B82F6' },
  { label: 'Stopped', count: 9, percentage: 10, color: '#EF4444' },
  { label: 'Delayed', count: 7, percentage: 8, color: '#F59E0B' },
  { label: 'Offline', count: 0, percentage: 0, color: '#94A3B8' },
];

export const VEHICLE_ALERTS_SUMMARY = [
  { type: 'Over Speeding', count: 3, icon: 'speed', color: '#EF4444' },
  { type: 'Route Deviation', count: 2, icon: 'route', color: '#EF4444' },
  { type: 'GPS Signal Lost', count: 1, icon: 'gps', color: '#F59E0B' },
  { type: 'Maintenance Due', count: 1, icon: 'tool', color: '#3B82F6' },
];

export const RECENT_TRIPS = [
  { vehicle: 'AS-01-AB-1234', driver: 'Rakesh Das', route: 'Guwahati → Tezpur', startTime: '08:00 AM', status: 'In Progress', statusClass: 'in-progress', progress: 65 },
  { vehicle: 'AS-01-CD-5678', driver: 'Manoj Kalita', route: 'Guwahati → Mangaldai', startTime: '07:30 AM', status: 'In Progress', statusClass: 'in-progress', progress: 80 },
  { vehicle: 'AS-01-EF-9012', driver: 'Anupam Saikia', route: 'Nagaon → Dimapur', startTime: '06:45 AM', status: 'In Progress', statusClass: 'in-progress', progress: 55 },
  { vehicle: 'AS-01-GH-3456', driver: 'Bikash Borah', route: 'Hojai → Nagaon', startTime: '07:00 AM', status: 'Delayed', statusClass: 'delayed', progress: 40 },
  { vehicle: 'AS-01-IJ-7890', driver: 'Jitu Kalita', route: 'Shillong → Hojai', startTime: '06:30 AM', status: 'Stopped', statusClass: 'stopped', progress: 0 },
];

export const VEHICLE_PERFORMANCE_METRICS = {
  totalDistance: '18,560 km',
  totalFuel: '2,450 L',
  avgFuelEfficiency: '7.6 km/L',
  totalEngineHours: '1,245 hrs',
  totalDeliveries: '1,248',
};

// ROUTE OPTIMIZATION DATA
export const ROUTE_SUMMARY = {
  totalDistance: '468 km',
  totalTime: '10h 45m',
  fuelCost: '₹ 6,240',
  stops: 6,
  efficiency: '92%',
  savingsTime: '1h 25m',
  savingsFuel: '₹ 1,320',
};

export const ROUTE_SEQUENCE = [
  { id: 'S', name: 'Start: Guwahati, Assam', distance: 'Origin', time: '08:00 AM', isTerminal: true },
  { id: '1', name: 'Jorhat, Assam', distance: '104 km • 1h 45m', time: '09:45 AM' },
  { id: '2', name: 'Nagaon, Assam', distance: '84 km • 1h 15m', time: '11:30 AM' },
  { id: '3', name: 'Hojai, Assam', distance: '98 km • 1h 10m', time: '01:00 PM' },
  { id: '4', name: 'Shillong, Meghalaya', distance: '91 km • 1h 20m', time: '02:20 PM' },
  { id: '5', name: 'Dimapur, Nagaland', distance: '86 km • 1h 05m', time: '04:30 PM' },
  { id: '6', name: 'Tezpur, Assam', distance: '71 km • 55m', time: '05:35 PM' },
  { id: 'E', name: 'End: Guwahati, Assam', distance: 'Final Stop', time: '06:45 PM', isTerminal: true },
];

export const DISTANCE_COMPARISON = [
  { name: 'Current Route', distance: 520, isCurrent: true },
  { name: 'Optimized Route', distance: 468, isOptimized: true },
  { name: 'Shortest Route', distance: 452, isShortest: true },
  { name: 'Alternative 1', distance: 485 },
  { name: 'Alternative 2', distance: 510 },
];

export const COST_BREAKDOWN = [
  { label: 'Fuel Cost', amount: '₹ 3,240', percentage: 52, color: '#10B981' },
  { label: 'Driver Cost', amount: '₹ 1,800', percentage: 29, color: '#3B82F6' },
  { label: 'Toll Cost', amount: '₹ 900', percentage: 14, color: '#F59E0B' },
  { label: 'Miscellaneous', amount: '₹ 300', percentage: 5, color: '#8B5CF6' },
];

export const ALTERNATIVE_ROUTES = [
  { id: 'opt', name: 'Optimized Route', distance: '468 km', time: '10h 45m', fuelCost: '₹ 6,240', tolls: '₹ 900', stops: 6, efficiency: '92%', selected: true },
  { id: 'short', name: 'Shortest Route', distance: '452 km', time: '11h 30m', fuelCost: '₹ 5,920', tolls: '₹ 1,050', stops: 6, efficiency: '88%' },
  { id: 'fast', name: 'Fastest Route', distance: '468 km', time: '10h 20m', fuelCost: '₹ 6,540', tolls: '₹ 1,200', stops: 6, efficiency: '90%' },
  { id: 'eco', name: 'Most Economical', distance: '510 km', time: '11h 15m', fuelCost: '₹ 5,720', tolls: '₹ 800', stops: 7, efficiency: '85%' },
];

export const ROUTE_INSIGHTS = [
  'Optimized route saves 1h 25m and ₹ 1,320 in fuel cost.',
  'Traffic is moderate on NH-27 and NH-37.',
  'Road conditions are good for heavy vehicles.',
  'No weather alerts on this route.',
];

// FIELD REPORTS DATA
export const FIELD_REPORT_STATS = {
  totalReports: { value: 128, label: 'All Time' },
  reportsThisMonth: { value: 36, label: '28% of total' },
  resolvedReports: { value: 78, label: '61% of total' },
  pendingReports: { value: 32, label: '25% of total' },
  overdueReports: { value: 8, label: 'Requires Attention', isDanger: true },
};

export const FIELD_REPORTS_TABLE = [
  {
    id: 'FR-2025-0128',
    type: 'Road Damage',
    iconType: 'damage',
    location: 'NH-27, Tezpur Assam',
    reportedBy: 'Rakesh Das (Driver)',
    priority: 'High',
    status: 'In Progress',
    reportedOn: '21 May 2025 10:15 AM',
    image: '/assets/field-reports/landslide.jpg',
    description: 'Heavy road surface breakdown and fallen debris blocking lane 2 near the foothills.',
  },
  {
    id: 'FR-2025-0127',
    type: 'Traffic Jam',
    iconType: 'traffic',
    location: 'NH-37, Nagaon Assam',
    reportedBy: 'Anupam Saikia (Driver)',
    priority: 'Medium',
    status: 'Resolved',
    reportedOn: '21 May 2025 09:45 AM',
    image: '/assets/field-reports/traffic.jpg',
    description: 'Cargo vehicle congestion near toll gate cleared by traffic police.',
  },
  {
    id: 'FR-2025-0126',
    type: 'Accident',
    iconType: 'accident',
    location: 'NH-27, Dhekiajuli Assam',
    reportedBy: 'Bikash Borah (Driver)',
    priority: 'High',
    status: 'In Progress',
    reportedOn: '21 May 2025 09:20 AM',
    image: '/assets/field-reports/traffic.jpg',
    description: 'Minor collision between utility truck and auto rickshaw; emergency crew dispatched.',
  },
  {
    id: 'FR-2025-0125',
    type: 'Road Block',
    iconType: 'block',
    location: 'NH-2, Diphu Assam',
    reportedBy: 'Manoj Kalita (Driver)',
    priority: 'High',
    status: 'Pending',
    reportedOn: '21 May 2025 08:50 AM',
    image: '/assets/field-reports/landslide.jpg',
    description: 'Tree fell across road due to gusty winds; clearance team requested.',
  },
  {
    id: 'FR-2025-0124',
    type: 'Weather Issue',
    iconType: 'weather',
    location: 'NH-37, Hojai Assam',
    reportedBy: 'Jitu Kalita (Driver)',
    priority: 'Medium',
    status: 'Resolved',
    reportedOn: '21 May 2025 08:30 AM',
    image: '/assets/field-reports/waterlogged.jpg',
    description: 'Dense morning fog reducing visibility to 20m; now dissipated.',
  },
  {
    id: 'FR-2025-0123',
    type: 'Fuel Shortage',
    iconType: 'fuel',
    location: 'NH-27, Tezpur Assam',
    reportedBy: 'Nitulpal Dutta (Driver)',
    priority: 'Low',
    status: 'Resolved',
    reportedOn: '21 May 2025 08:10 AM',
    image: '/assets/field-reports/bridge_damage.jpg',
    description: 'Highway petrol pump restocked with diesel.',
  },
  {
    id: 'FR-2025-0122',
    type: 'Vehicle Breakdown',
    iconType: 'breakdown',
    location: 'NH-2, Lumding Assam',
    reportedBy: 'Ashok Leyland (Driver)',
    priority: 'High',
    status: 'In Progress',
    reportedOn: '21 May 2025 07:55 AM',
    image: '/assets/field-reports/waterlogged.jpg',
    description: 'Transmission failure on uphill stretch; mobile mechanic en route.',
  },
  {
    id: 'FR-2025-0121',
    type: 'Other Issue',
    iconType: 'other',
    location: 'NH-37, Morigaon Assam',
    reportedBy: 'Sanjib Ahmed (Driver)',
    priority: 'Low',
    status: 'Pending',
    reportedOn: '21 May 2025 07:40 AM',
    image: '/assets/field-reports/traffic.jpg',
    description: 'Streetlight outage at bypass junction creating night driving hazard.',
  },
];

export const REPORTS_BY_TYPE = [
  { label: 'Road Damage', count: 32, percentage: 25, color: '#10B981' },
  { label: 'Traffic Jam', count: 24, percentage: 19, color: '#3B82F6' },
  { label: 'Accident', count: 20, percentage: 16, color: '#EF4444' },
  { label: 'Road Block', count: 18, percentage: 14, color: '#F59E0B' },
  { label: 'Weather Issue', count: 14, percentage: 11, color: '#8B5CF6' },
  { label: 'Others', count: 20, percentage: 15, color: '#64748B' },
];

export const REPORTS_TREND = [
  { date: '15 May', count: 18 },
  { date: '16 May', count: 22 },
  { date: '17 May', count: 17 },
  { date: '18 May', count: 25 },
  { date: '19 May', count: 20 },
  { date: '20 May', count: 28 },
  { date: '21 May', count: 36 },
];

export const REPORTS_BY_PRIORITY = [
  { label: 'High', count: 48, percentage: 38, color: '#EF4444' },
  { label: 'Medium', count: 44, percentage: 34, color: '#F59E0B' },
  { label: 'Low', count: 22, percentage: 17, color: '#10B981' },
  { label: 'Informational', count: 14, percentage: 11, color: '#64748B' },
];

export const RECENT_ACTIVITY_FEED = [
  { id: 'act-1', text: 'New road damage reported on NH-27, Tezpur', time: '10:15 AM', type: 'danger' },
  { id: 'act-2', text: 'Traffic jam report on NH-37 resolved', time: '09:45 AM', type: 'success' },
  { id: 'act-3', text: 'Accident reported on NH-27, Dhekiajuli', time: '09:20 AM', type: 'warning' },
  { id: 'act-4', text: 'Road block reported on NH-2, Diphu', time: '08:50 AM', type: 'danger' },
  { id: 'act-5', text: 'Weather issue reported on NH-37, Hojai', time: '08:30 AM', type: 'info' },
];
