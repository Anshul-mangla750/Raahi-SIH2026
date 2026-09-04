export const DISTRICT_OPTIONS = [
  { id: 'tezpur', name: 'Tezpur District, Assam', state: 'Assam' },
  { id: 'kamrup', name: 'Kamrup Metropolitan, Assam', state: 'Assam' },
  { id: 'nagaon', name: 'Nagaon District, Assam', state: 'Assam' },
  { id: 'dibrugarh', name: 'Dibrugarh District, Assam', state: 'Assam' },
  { id: 'cachar', name: 'Cachar District, Assam', state: 'Assam' },
];

export const DISTRICT_KPI_STATS = [
  {
    id: 'total_routes',
    label: 'Total Routes',
    value: '24',
    supportingText: 'In District',
    type: 'road',
    theme: {
      iconBg: '#F0FDF4',
      iconBorder: '#DCFCE7',
      iconColor: '#16A34A',
    },
  },
  {
    id: 'connected_routes',
    label: 'Connected Routes',
    value: '18',
    supportingText: '75% of total',
    type: 'network',
    theme: {
      iconBg: '#EFF6FF',
      iconBorder: '#DBEAFE',
      iconColor: '#2563EB',
    },
  },
  {
    id: 'partially_accessible',
    label: 'Partially Accessible',
    value: '4',
    supportingText: '17% of total',
    type: 'warning',
    theme: {
      iconBg: '#FFFBEB',
      iconBorder: '#FEF3C7',
      iconColor: '#D97706',
    },
  },
  {
    id: 'not_accessible',
    label: 'Not Accessible',
    value: '2',
    supportingText: '8% of total',
    type: 'danger',
    theme: {
      iconBg: '#FEF2F2',
      iconBorder: '#FEE2E2',
      iconColor: '#DC2626',
    },
  },
];

export const DISTRICT_SUMMARY_DATA = {
  district: 'Tezpur District',
  totalRoads: '1,245 km',
  population: '9,34,000',
  area: '2,867 sq km',
  lastUpdated: '21 May 2025, 10:15 AM',
};

export const ROUTE_CONNECTIVITY_DATA = [
  {
    id: 'rt-1',
    name: 'NH-27',
    type: 'National Highway',
    from: 'Guwahati',
    to: 'Tezpur',
    distance: '112 km',
    status: 'Good',
    accessibilityPct: 95,
    lastUpdated: '21 May 2025, 09:45 AM',
  },
  {
    id: 'rt-2',
    name: 'NH-15',
    type: 'National Highway',
    from: 'Tezpur',
    to: 'Dibrugarh',
    distance: '205 km',
    status: 'Good',
    accessibilityPct: 90,
    lastUpdated: '21 May 2025, 09:30 AM',
  },
  {
    id: 'rt-3',
    name: 'NH-217',
    type: 'National Highway',
    from: 'Tezpur',
    to: 'Jorhat',
    distance: '178 km',
    status: 'Moderate',
    accessibilityPct: 60,
    lastUpdated: '21 May 2025, 08:50 AM',
  },
  {
    id: 'rt-4',
    name: 'SH-2',
    type: 'State Highway',
    from: 'Tezpur',
    to: 'Bhalukpong',
    distance: '96 km',
    status: 'Moderate',
    accessibilityPct: 55,
    lastUpdated: '21 May 2025, 08:40 AM',
  },
  {
    id: 'rt-5',
    name: 'SH-16',
    type: 'State Highway',
    from: 'Tezpur',
    to: 'Nameri',
    distance: '74 km',
    status: 'Poor',
    accessibilityPct: 20,
    lastUpdated: '21 May 2025, 07:55 AM',
  },
];
