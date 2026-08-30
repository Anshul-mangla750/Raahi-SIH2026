export const sidebarNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', active: true },
  { id: 'consignments', label: 'My Consignments', icon: 'package', active: false },
  { id: 'vehicles', label: 'My Vehicles', icon: 'truck', active: false },
  { id: 'tracking', label: 'Live Tracking & GPS', icon: 'map-pin', active: false },
  { id: 'routes', label: 'Route Planning', icon: 'route', active: false },
  { id: 'alerts', label: 'Alerts', icon: 'bell', badge: '4', active: false },
  { id: 'history', label: 'Delivery History', icon: 'history', active: false },
  { id: 'reports', label: 'Reports', icon: 'bar-chart', active: false },
];

export const sidebarSecondaryItems = [
  { id: 'profile', label: 'Profile', icon: 'user' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
  { id: 'help', label: 'Help & Support', icon: 'headset' },
];

export const kpisData = [
  {
    id: 1,
    title: 'Active Consignments',
    value: '18',
    subtitle: 'In Transit',
    trend: '↑ 12% from yesterday',
    isIncrease: true,
    icon: 'package',
    iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    sparklineColor: '#10B981',
    points: [12, 14, 13, 16, 15, 17, 18],
  },
  {
    id: 2,
    title: 'Delivered Today',
    value: '7',
    subtitle: 'Shipments',
    trend: '↑ 16% from yesterday',
    isIncrease: true,
    icon: 'truck',
    iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
    sparklineColor: '#2563EB',
    points: [4, 5, 4, 6, 5, 6, 7],
  },
  {
    id: 3,
    title: 'Delayed Deliveries',
    value: '2',
    subtitle: 'Shipments',
    trend: '↓ 20% from yesterday',
    isIncrease: false,
    trendColor: 'text-rose-500',
    icon: 'clock',
    iconBg: 'bg-orange-50 text-orange-500 border border-orange-100',
    sparklineColor: '#EF4444',
    points: [5, 4, 4, 3, 3, 2, 2],
  },
  {
    id: 4,
    title: 'Vehicles On Road',
    value: '12',
    subtitle: 'Active',
    trend: '↑ 8% from yesterday',
    isIncrease: true,
    icon: 'truck-road',
    iconBg: 'bg-purple-50 text-purple-600 border border-purple-100',
    sparklineColor: '#8B5CF6',
    points: [9, 10, 10, 11, 11, 12, 12],
  },
  {
    id: 5,
    title: 'Total Distance Today',
    value: '1,248 km',
    subtitle: 'Travelled',
    trend: '↑ 14% from yesterday',
    isIncrease: true,
    icon: 'road',
    
    iconBg: 'bg-teal-50 text-teal-600 border border-teal-100',
    sparklineColor: '#0D9488',
    points: [950, 1050, 1100, 1150, 1200, 1220, 1248],
  },
];

export const liveTrackingData = {
  activeVehicle: {
    id: 'AS 01 GC 9876',
    status: 'In Transit',
    route: 'Guwahati → Dibrugarh',
    eta: '11:30 AM',
    distanceRemaining: '82 km to go',
  },
  locations: [
    { name: 'Guwahati', isOrigin: true, x: 22, y: 72 },
    { name: 'Nagaon', x: 42, y: 64 },
    { name: 'Tezpur', x: 50, y: 48 },
    { name: 'Golaghat', x: 68, y: 52 },
    { name: 'Dibrugarh', isDestination: true, x: 86, y: 28 },
    { name: 'Tinsukia', x: 94, y: 24 },
  ],
};

export const alertsData = [
  {
    id: 1,
    title: 'Landslide Warning',
    route: 'NH-13A (Haflong Section)',
    description: 'High risk of landslides. Drive safe.',
    time: '15 min ago',
    type: 'danger',
  },
  {
    id: 2,
    title: 'Heavy Rainfall Alert',
    route: 'Dibrugarh District',
    description: 'Moderate to heavy rainfall expected.',
    time: '45 min ago',
    type: 'warning',
  },
  {
    id: 3,
    title: 'Route Diversion',
    route: 'Jorhat to Golaghat',
    description: 'Use alternate route via NH-715.',
    time: '1 hr ago',
    type: 'warning',
  },
];

export const consignmentStatusData = {
  total: 18,
  breakdown: [
    { label: 'In Transit', count: 12, percent: '66.7%', color: '#10B981', dotClass: 'bg-emerald-500' },
    { label: 'Delivered', count: 7, percent: '38.9%', color: '#2563EB', dotClass: 'bg-blue-600' },
    { label: 'Delayed', count: 2, percent: '11.1%', color: '#F97316', dotClass: 'bg-orange-500' },
    { label: 'Cancelled', count: 0, percent: '0%', color: '#94A3B8', dotClass: 'bg-slate-400' },
  ],
};

export const onTimeDeliveryData = {
  rate: '92%',
  period: 'This Week',
  points: [50, 60, 70, 55, 65, 75, 92],
  dates: ['15 May', '16 May', '17 May', '18 May', '19 May', '20 May', '21 May'],
};

export const topRoutesData = [
  { route: 'Guwahati → Dibrugarh', count: 8, max: 10 },
  { route: 'Guwahati → Imphal', count: 5, max: 10 },
  { route: 'Silchar → Aizawl', count: 4, max: 10 },
  { route: 'Tezpur → Jorhat', count: 3, max: 10 },
  { route: 'Nagaon → Itanagar', count: 2, max: 10 },
];

export const recentConsignmentsData = [
  {
    id: 'CONS-250521-001',
    from: 'Guwahati',
    to: 'Dibrugarh',
    vehicleNo: 'AS 01 GC 9876',
    status: 'In Transit',
    statusType: 'in-transit',
    eta: '11:30 AM, 21 May',
  },
  {
    id: 'CONS-250521-002',
    from: 'Silchar',
    to: 'Aizawl',
    vehicleNo: 'AS 11 EC 3456',
    status: 'In Transit',
    statusType: 'in-transit',
    eta: '02:15 PM, 21 May',
  },
  {
    id: 'CONS-250521-003',
    from: 'Tezpur',
    to: 'Jorhat',
    vehicleNo: 'AS 15 DC 6789',
    status: 'Delayed',
    statusType: 'delayed',
    eta: '04:45 PM, 21 May',
  },
  {
    id: 'CONS-250521-004',
    from: 'Nagaon',
    to: 'Itanagar',
    vehicleNo: 'AS 01 JC 1234',
    status: 'Delivered',
    statusType: 'delivered',
    eta: '10:20 AM, 21 May',
  },
];
