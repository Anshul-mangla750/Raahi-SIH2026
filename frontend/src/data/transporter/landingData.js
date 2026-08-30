export const navLinks = [
  { name: 'Home', href: '#home', active: true },
  { name: 'Features', href: '#features', active: false },
  { name: 'Dashboard', href: '#dashboard', active: false },
  { name: 'Solutions', href: '#solutions', active: false },
  { name: 'About Us', href: '#about', active: false },
  { name: 'Contact', href: '#contact', active: false },
];

export const heroHighlights = [
  {
    id: 1,
    title: 'Real-time\nAccessibility Monitoring',
    icon: 'shield',
    bgColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  },
  {
    id: 2,
    title: 'AI Disruption\nPrediction',
    icon: 'cloud-rain',
    bgColor: 'bg-blue-50 text-blue-600 border-blue-100',
  },
  {
    id: 3,
    title: 'Smart Route\nOptimization',
    icon: 'route',
    bgColor: 'bg-purple-50 text-purple-600 border-purple-100',
  },
  {
    id: 4,
    title: 'Live Vehicle\nTracking',
    icon: 'truck',
    bgColor: 'bg-orange-50 text-orange-600 border-orange-100',
  },
  {
    id: 5,
    title: 'Instant Alerts &\nNotifications',
    icon: 'bell',
    bgColor: 'bg-rose-50 text-rose-600 border-rose-100',
  },
];

export const infoStripItems = [
  {
    id: 1,
    icon: 'shield-check',
    title: 'Designed for NER',
    subtitle: 'Built for the unique challenges of the region',
  },
  {
    id: 2,
    icon: 'cloud-data',
    title: 'Real-time Data',
    subtitle: 'Weather, traffic, road & field updates in real-time',
  },
  {
    id: 3,
    icon: 'cpu-ai',
    title: 'AI-Powered Insights',
    subtitle: 'Predict disruptions and suggest smarter decisions',
  },
  {
    id: 4,
    icon: 'users-group',
    title: 'For Everyone',
    subtitle: 'Government, Transporters, Field Officers & Citizens',
  },
];

export const featureCards = [
  {
    id: 1,
    title: 'Live Map & Accessibility',
    description: 'Monitor road, bridge and route status across all districts in real-time',
    icon: 'map-pin',
    theme: {
      bg: 'bg-[#ecfdf5]',
      border: 'border-emerald-100',
      iconBg: 'bg-emerald-600',
      iconColor: 'text-white',
      titleColor: 'text-slate-800',
      hoverBorder: 'hover:border-emerald-300',
    },
  },
  {
    id: 2,
    title: 'AI Disruption Prediction',
    description: 'Predict landslides, floods, road damage and congestion before it happens.',
    icon: 'brain',
    theme: {
      bg: 'bg-[#eff6ff]',
      border: 'border-blue-100',
      iconBg: 'bg-blue-600',
      iconColor: 'text-white',
      titleColor: 'text-slate-800',
      hoverBorder: 'hover:border-blue-300',
    },
  },
  {
    id: 3,
    title: 'Smart Route Engine',
    description: 'Get AI-optimized alternate routes with estimated delays and risk scores.',
    icon: 'route-curved',
    theme: {
      bg: 'bg-[#faf5ff]',
      border: 'border-purple-100',
      iconBg: 'bg-purple-600',
      iconColor: 'text-white',
      titleColor: 'text-slate-800',
      hoverBorder: 'hover:border-purple-300',
    },
  },
  {
    id: 4,
    title: 'Vehicle Tracking',
    description: 'Track essential supplies, medicines, food and materials with GPS.',
    icon: 'truck-solid',
    theme: {
      bg: 'bg-[#fff7ed]',
      border: 'border-orange-100',
      iconBg: 'bg-orange-500',
      iconColor: 'text-white',
      titleColor: 'text-slate-800',
      hoverBorder: 'hover:border-orange-300',
    },
  },
  {
    id: 5,
    title: 'Instant Alerts',
    description: 'Get real-time alerts for blockages, delays and high-risk corridors.',
    icon: 'bell-alert',
    theme: {
      bg: 'bg-[#fef2f2]',
      border: 'border-rose-100',
      iconBg: 'bg-rose-500',
      iconColor: 'text-white',
      titleColor: 'text-slate-800',
      hoverBorder: 'hover:border-rose-300',
    },
  },
  {
    id: 6,
    title: 'Field Reporting App',
    description: 'Upload geo-tagged updates, photos and incident reports offline.',
    icon: 'mobile-app',
    theme: {
      bg: 'bg-[#f0fdfa]',
      border: 'border-teal-100',
      iconBg: 'bg-teal-600',
      iconColor: 'text-white',
      titleColor: 'text-slate-800',
      hoverBorder: 'hover:border-teal-300',
    },
  },
];

export const statsItems = [
  {
    id: 1,
    value: '12,500+',
    label: 'KM of Roads Monitored',
    icon: 'road',
    valueColor: 'text-emerald-600',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
  },
  {
    id: 2,
    value: '122+',
    label: 'Districts Covered',
    icon: 'building',
    valueColor: 'text-blue-600',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
  },
  {
    id: 3,
    value: '8,450+',
    label: 'Active Vehicles',
    icon: 'truck',
    valueColor: 'text-purple-600',
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50',
  },
  {
    id: 4,
    value: '2,300+',
    label: 'Alerts Generated',
    icon: 'alert-triangle',
    valueColor: 'text-orange-500',
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-50',
  },
  {
    id: 5,
    value: '1.2L+',
    label: 'Deliveries Tracked',
    icon: 'package',
    valueColor: 'text-teal-600',
    iconColor: 'text-teal-600',
    iconBg: 'bg-teal-50',
  },
];

export const nerStates = [
  { name: 'Arunachal Pradesh', x: '72%', y: '10%' },
  { name: 'Assam', x: '63%', y: '23%' },
  { name: 'Nagaland', x: '80%', y: '34%' },
  { name: 'Meghalaya', x: '53%', y: '31%' },
  { name: 'Manipur', x: '77%', y: '44%' },
  { name: 'Tripura', x: '59%', y: '48%' },
  { name: 'Mizoram', x: '71%', y: '50%' },
];
