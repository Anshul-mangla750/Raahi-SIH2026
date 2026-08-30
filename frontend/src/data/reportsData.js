export const reportsKPIData = [
  {
    id: 'total',
    title: 'Total Deliveries',
    value: '156',
    trend: '↑ 18% from last 7 days',
    color: '#10B981',
    icon: 'calendar',
    points: [30, 42, 38, 55, 48, 62, 70],
  },
  {
    id: 'delivered',
    title: 'Delivered',
    value: '142',
    trend: '↑ 15% from last 7 days',
    color: '#2563EB',
    icon: 'check-circle',
    points: [28, 38, 35, 50, 44, 58, 65],
  },
  {
    id: 'in-transit',
    title: 'In Transit',
    value: '10',
    trend: '↑ 5% from last 7 days',
    color: '#F59E0B',
    icon: 'truck',
    points: [4, 6, 5, 8, 7, 9, 10],
  },
  {
    id: 'failed',
    title: 'Failed / Cancelled',
    value: '4',
    trend: '↓ 33% from last 7 days',
    isNegative: true,
    color: '#EF4444',
    icon: 'x-circle',
    points: [6, 5, 4, 3, 4, 3, 2],
  },
  {
    id: 'distance',
    title: 'Total Distance Covered',
    value: '12,845 km',
    trend: '↑ 12% from last 7 days',
    color: '#8B5CF6',
    icon: 'map-pin',
    points: [18, 21, 20, 24, 23, 26, 28],
  },
];

export const deliveriesOverTimeData = [
  { date: '22 May', Delivered: 42, InTransit: 16, Failed: 2 },
  { date: '23 May', Delivered: 52, InTransit: 20, Failed: 1 },
  { date: '24 May', Delivered: 60, InTransit: 22, Failed: 3 },
  { date: '25 May', Delivered: 58, InTransit: 18, Failed: 2 },
  { date: '26 May', Delivered: 58, InTransit: 12, Failed: 2 },
  { date: '27 May', Delivered: 68, InTransit: 18, Failed: 1 },
  { date: '28 May', Delivered: 72, InTransit: 21, Failed: 2 },
];

export const deliveriesByStatusData = [
  { name: 'Delivered', value: 142, percentage: '91.0%', color: '#10B981' },
  { name: 'In Transit', value: 10, percentage: '6.4%', color: '#F59E0B' },
  { name: 'Failed/Cancelled', value: 4, percentage: '2.6%', color: '#EF4444' },
];

export const deliveriesByVehicleData = [
  { vehicle: 'AS 01 GC 9876', deliveries: 38 },
  { vehicle: 'AS 12 AB 3456', deliveries: 32 },
  { vehicle: 'AS 01 GC 1234', deliveries: 28 },
  { vehicle: 'AS 15 AC 6789', deliveries: 20 },
  { vehicle: 'AS 11 AD 2468', deliveries: 18 },
  { vehicle: 'Others', deliveries: 20 },
];

export const topRoutesData = [
  {
    route: 'Guwahati → Tezpur',
    deliveries: 24,
    successful: 22,
    failed: 2,
    successRate: '91.67%',
    rateNum: 91.67,
  },
  {
    route: 'Guwahati → Jorhat',
    deliveries: 20,
    successful: 18,
    failed: 2,
    successRate: '90.00%',
    rateNum: 90.0,
  },
  {
    route: 'Guwahati → Dibrugarh',
    deliveries: 18,
    successful: 16,
    failed: 2,
    successRate: '88.89%',
    rateNum: 88.89,
  },
  {
    route: 'Tezpur → Shillong',
    deliveries: 16,
    successful: 15,
    failed: 1,
    successRate: '93.75%',
    rateNum: 93.75,
  },
  {
    route: 'Jorhat → Dibrugarh',
    deliveries: 14,
    successful: 12,
    failed: 2,
    successRate: '85.71%',
    rateNum: 85.71,
  },
];

export const vehiclePerformanceData = [
  {
    vehicle: 'AS 01 GC 9876',
    deliveries: 38,
    distance: '3,245',
    successRate: '94.74%',
  },
  {
    vehicle: 'AS 12 AB 3456',
    deliveries: 32,
    distance: '2,850',
    successRate: '93.75%',
  },
  {
    vehicle: 'AS 01 GC 1234',
    deliveries: 28,
    distance: '2,430',
    successRate: '92.86%',
  },
  {
    vehicle: 'AS 15 AC 6789',
    deliveries: 20,
    distance: '1,780',
    successRate: '90.00%',
  },
  {
    vehicle: 'AS 11 AD 2468',
    deliveries: 18,
    distance: '1,620',
    successRate: '88.89%',
  },
];

export const performanceSummaryData = [
  {
    id: 'on-time',
    label: 'On-time Delivery Rate',
    value: '92.31%',
    trend: '↑ 6.21%',
    isGood: true,
    icon: 'clock-check',
  },
  {
    id: 'avg-time',
    label: 'Average Delivery Time',
    value: '18h 42m',
    trend: '↓ 8.24%',
    isGood: true,
    icon: 'clock-timer',
  },
  {
    id: 'cancelled',
    label: 'Cancelled Shipments',
    value: '4',
    trend: '↑ 33.33%',
    isGood: false,
    icon: 'cancel',
  },
  {
    id: 'rating',
    label: 'Customer Satisfaction',
    value: '4.6/5',
    trend: '↑ 4.55%',
    isGood: true,
    icon: 'star',
  },
];

export const recentReportsData = [
  {
    id: 'REP-2025-001',
    name: 'Delivery Performance Report',
    type: 'Overview',
    duration: '21 May - 28 May 2025',
    generatedOn: '28 May 2025, 08:30 AM',
    generatedBy: 'Rajesh Sharma',
    status: 'Ready',
  },
  {
    id: 'REP-2025-002',
    name: 'Vehicle Performance Report',
    type: 'Vehicles',
    duration: '21 May - 28 May 2025',
    generatedOn: '28 May 2025, 08:30 AM',
    generatedBy: 'Rajesh Sharma',
    status: 'Ready',
  },
  {
    id: 'REP-2025-003',
    name: 'Route Analysis Report',
    type: 'Routes',
    duration: '21 May - 28 May 2025',
    generatedOn: '28 May 2025, 08:30 AM',
    generatedBy: 'Rajesh Sharma',
    status: 'Ready',
  },
  {
    id: 'REP-2025-004',
    name: 'Payment Summary Report',
    type: 'Payments',
    duration: '21 May - 28 May 2025',
    generatedOn: '28 May 2025, 08:30 AM',
    generatedBy: 'Rajesh Sharma',
    status: 'Ready',
  },
];
