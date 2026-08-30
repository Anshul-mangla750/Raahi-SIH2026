export const helpCategoryPills = [
  {
    id: 'track',
    title: 'Track Shipment',
    description: 'Track and trace your consignments',
    icon: 'package-search',
    color: 'emerald',
    iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  },
  {
    id: 'billing',
    title: 'Billing & Payments',
    description: 'Invoices, payments and refunds',
    icon: 'file-text',
    color: 'blue',
    iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  {
    id: 'account',
    title: 'Account & Profile',
    description: 'Update profile and account settings',
    icon: 'user',
    color: 'amber',
    iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
  },
  {
    id: 'vehicle',
    title: 'Vehicle Support',
    description: 'Manage vehicles and documents',
    icon: 'truck',
    color: 'purple',
    iconBg: 'bg-purple-50 text-purple-600 border-purple-200',
  },
  {
    id: 'technical',
    title: 'Technical Support',
    description: 'App, website and technical issues',
    icon: 'settings',
    color: 'teal',
    iconBg: 'bg-teal-50 text-teal-600 border-teal-200',
  },
];

export const contactChannels = [
  {
    id: 'call',
    title: 'Call Support',
    value: '+91 1800 123 4567',
    subtext: 'Mon - Sat (9:00 AM - 7:00 PM)',
    icon: 'phone',
    iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    link: 'tel:+9118001234567',
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp Support',
    value: '+91 98765 43210',
    subtext: 'Mon - Sat (9:00 AM - 7:00 PM)',
    icon: 'whatsapp',
    iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    link: 'https://wa.me/919876543210',
  },
  {
    id: 'email',
    title: 'Email Support',
    value: 'support@raahitransporter.com',
    subtext: "We'll respond within 24 hours",
    icon: 'mail',
    iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
    link: 'mailto:support@raahitransporter.com',
  },
];

export const popularHelpTopics = [
  {
    id: 'topic-1',
    title: 'How to create a new consignment?',
    subtitle: 'Step-by-step guide to create and book a new consignment.',
    icon: 'package-search',
    iconColor: 'text-emerald-600 bg-emerald-50',
    answer:
      "Navigate to the 'My Consignments' page from the left sidebar and click on the green 'New Consignment' button. Fill in cargo details, pickup/drop hubs, and vehicle assignment, then submit.",
  },
  {
    id: 'topic-2',
    title: 'How to track my shipment?',
    subtitle: 'Track your shipment in real-time using tracking ID.',
    icon: 'file-text',
    iconColor: 'text-blue-600 bg-blue-50',
    answer:
      "Open 'Live Tracking & GPS' to see all active vehicles on the Leaflet map. You can also search by Consignment ID to inspect live speed, current highway segment, and estimated arrival time.",
  },
  {
    id: 'topic-3',
    title: 'How to add a new vehicle?',
    subtitle: 'Add and manage your vehicles on the platform.',
    icon: 'truck',
    iconColor: 'text-amber-600 bg-amber-50',
    answer:
      "Go to 'My Vehicles' and click 'Add Vehicle'. Provide registration number (e.g. AS 01 GC 9876), vehicle model, fuel capacity, insurance validity, and assign an onboarded driver.",
  },
  {
    id: 'topic-4',
    title: 'How to download invoice?',
    subtitle: 'Download and view your invoices and payment history.',
    icon: 'receipt',
    iconColor: 'text-purple-600 bg-purple-50',
    answer:
      "Access 'Delivery History' or 'Reports', find your completed consignment row, and click the Download icon to immediately generate an official GST-compliant tax invoice PDF.",
  },
  {
    id: 'topic-5',
    title: 'What are the payment methods?',
    subtitle: 'Learn about supported payment methods and policies.',
    icon: 'credit-card',
    iconColor: 'text-blue-600 bg-blue-50',
    answer:
      "RAAHI supports direct bank RTGS/NEFT transfers, UPI, corporate fleet cards, and verified Proof of Delivery (POD) escrow payouts with automated settlements.",
  },
];

export const supportTicketsList = [
  {
    id: '#SUP-2025-1256',
    subject: 'Unable to track shipment',
    date: '28 May 2025, 10:30 AM',
    status: 'Resolved',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    lineColor: 'bg-emerald-500',
  },
  {
    id: '#SUP-2025-1142',
    subject: 'Invoice not generated',
    date: '26 May 2025, 04:15 PM',
    status: 'In Progress',
    statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
    lineColor: 'bg-amber-500',
  },
  {
    id: '#SUP-2025-0987',
    subject: 'Vehicle document upload issue',
    date: '24 May 2025, 11:20 AM',
    status: 'Open',
    statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
    lineColor: 'bg-blue-500',
  },
  {
    id: '#SUP-2025-0765',
    subject: 'Payment failed but amount deducted',
    date: '22 May 2025, 02:45 PM',
    status: 'Resolved',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    lineColor: 'bg-emerald-500',
  },
  {
    id: '#SUP-2025-0654',
    subject: 'Need help with route planning',
    date: '20 May 2025, 09:10 AM',
    status: 'Resolved',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    lineColor: 'bg-emerald-500',
  },
];

export const bottomHelpResources = [
  {
    id: 'guide',
    title: 'User Guide',
    description: 'Detailed guides and step-by-step instructions',
    icon: 'book',
  },
  {
    id: 'video',
    title: 'Video Tutorials',
    description: 'Watch videos to learn how things work',
    icon: 'play',
  },
  {
    id: 'status',
    title: 'System Status',
    description: 'Check live system status and announcements',
    icon: 'pulse',
  },
];
