export const initialRouteStops = [
  {
    id: 'stop-1',
    stepNumber: 1,
    name: 'Guwahati, Assam',
    type: 'Start Location',
    time: '08:00AM',
    status: 'start',
    coords: [26.1445, 91.7362],
  },
  {
    id: 'stop-2',
    stepNumber: 2,
    name: 'Nagaon, Assam',
    type: 'Stop 1',
    time: '09:15AM',
    status: 'stop-green',
    coords: [26.3463, 92.6841],
  },
  {
    id: 'stop-3',
    stepNumber: 3,
    name: 'Tezpur, Assam',
    type: 'Stop 2',
    time: '10:30AM',
    status: 'stop-green',
    coords: [26.6338, 92.7926],
  },
  {
    id: 'stop-4',
    stepNumber: 4,
    name: 'Morigaon Bypass, Assam',
    type: 'Stop 3',
    time: '11:15AM',
    status: 'stop-blue',
    coords: [26.5800, 93.3500],
  },
  {
    id: 'stop-5',
    stepNumber: 5,
    name: 'Jorhat, Assam',
    type: 'Stop 4',
    time: '01:00PM',
    status: 'stop-blue',
    coords: [26.7509, 94.2037],
  },
  {
    id: 'stop-6',
    stepNumber: 6,
    name: 'Dibrugarh, Assam',
    type: 'Destination',
    time: '02:30PM',
    status: 'destination',
    coords: [27.4728, 94.9120],
  },
];

export const routePlanningPolyline = [
  [26.1445, 91.7362], // 1 Guwahati
  [26.2100, 92.0500],
  [26.2550, 92.3400],
  [26.3463, 92.6841], // 2 Nagaon
  [26.4800, 92.7500],
  [26.6338, 92.7926], // 3 Tezpur
  [26.5600, 93.1000],
  [26.5800, 93.3500], // 4 Morigaon Bypass / Corridor
  [26.6200, 93.7500],
  [26.7509, 94.2037], // 5 Jorhat
  [26.9800, 94.4500],
  [27.1500, 94.6800],
  [27.4728, 94.9120], // 6 Dibrugarh
];

export const routeOverviewMetrics = [
  {
    id: 'distance',
    title: 'Distance',
    value: '342 km',
    icon: 'distance',
  },
  {
    id: 'stops',
    title: 'Total Stops',
    value: '6',
    icon: 'stops',
  },
  {
    id: 'time',
    title: 'Estimated Time',
    value: '6h 30m',
    icon: 'time',
  },
  {
    id: 'fuel',
    title: 'Fuel Cost (Est.)',
    value: '₹ 3,850',
    icon: 'fuel',
  },
  {
    id: 'toll',
    title: 'Toll Cost (Est.)',
    value: '₹ 1,250',
    icon: 'toll',
  },
];

export const routeEstimatesData = {
  totalDistance: '342 km',
  totalTime: '6h 30m',
  fuelCost: '₹ 3,850',
  tollCost: '₹ 1,250',
  totalCost: '₹ 5,100',
};
