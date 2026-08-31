import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, Clock, Route } from 'lucide-react';
import { kpisData } from '../../data/transporterData';
import ApiClient from '@/lib/api';

export default function TransporterKPIs() {
  const [data, setData] = useState(kpisData);

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        const res = await ApiClient.getTransporterKpis();
        if (res?.success && res.data) {
          const live = res.data;
          setData([
            {
              id: 'total-consignments',
              title: 'Total Consignments',
              value: `${live.totalCompletedDeliveries || 1248}`,
              change: '+12.5%',
              trend: 'up',
              icon: 'package',
              color: 'emerald',
              sparkline: [45, 52, 58, 65, 72, 80, 88],
            },
            {
              id: 'active-vehicles',
              title: 'Active Fleet',
              value: `${live.totalFleet || 6}`,
              change: '+6.2%',
              trend: 'up',
              icon: 'truck',
              color: 'blue',
              sparkline: [20, 22, 24, 25, 26, 27, 28],
            },
            {
              id: 'in-transit',
              title: 'In Transit',
              value: `${live.deliveriesInTransit || 2}`,
              change: '+3.1%',
              trend: 'up',
              icon: 'truck-road',
              color: 'indigo',
              sparkline: [12, 14, 15, 14, 16, 17, 18],
            },
            {
              id: 'delayed-deliveries',
              title: 'Delayed Deliveries',
              value: `${live.delayedDeliveries || 1}`,
              change: '-1.4%',
              trend: 'down',
              icon: 'clock',
              color: 'amber',
              sparkline: [8, 7, 6, 6, 5, 4, 3],
            },
            {
              id: 'on-time-rate',
              title: 'On-Time Rate',
              value: live.onTimeRate || '94.6%',
              change: '+2.8%',
              trend: 'up',
              icon: 'road',
              color: 'purple',
              sparkline: [88, 89, 91, 92, 93, 94, 94.6],
            },
          ]);
        }
      } catch (e) {
        console.warn('Using fallback transporter KPIs:', e);
      }
    };
    fetchKPIs();
  }, []);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'package':
        return <Package className="w-5 h-5 stroke-[2.2]" />;
      case 'truck':
      case 'truck-road':
        return <Truck className="w-5 h-5 stroke-[2.2]" />;
      case 'clock':
        return <Clock className="w-5 h-5 stroke-[2.2]" />;
      case 'road':
        return <Route className="w-5 h-5 stroke-[2.2]" />;
      default:
        return <Package className="w-5 h-5 stroke-[2.2]" />;
    }
  };

  const renderSparkline = (points, strokeColor) => {
    if (!points || !Array.isArray(points) || points.length < 2) return null;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 100;
    const height = 24;

    const pathD = points
      .map((val, idx) => {
        const x = (idx / (points.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 6) - 3;
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-6 overflow-visible" preserveAspectRatio="none">
        <path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-stretch">
      {data.map((kpi, idx) => (
        <motion.div
          key={kpi.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: idx * 0.05 }}
          whileHover={{ y: -2, scale: 1.01 }}
          className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">{kpi.title}</span>
            <div className="p-2 rounded-lg bg-slate-50 text-slate-700">{getIcon(kpi.icon)}</div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-bold text-slate-900">{kpi.value}</span>
            <span className={`text-xs font-semibold ${kpi.trend === 'up' || kpi.isIncrease ? 'text-emerald-600' : 'text-rose-600'}`}>
              {kpi.change || kpi.trend}
            </span>
          </div>
          <div className="mt-2">
            {renderSparkline(kpi.sparkline || kpi.points, kpi.color === 'emerald' || kpi.sparklineColor === '#10B981' ? '#059669' : '#2563EB')}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
