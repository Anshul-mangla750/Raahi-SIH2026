import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { ChevronDown } from 'lucide-react';
import {
  deliveriesOverTimeData,
  deliveriesByStatusData,
  deliveriesByVehicleData,
} from '../../data/reportsData';

// Custom Tooltip for Line Chart
const CustomLineTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0B1E36] text-white p-2.5 rounded-xl shadow-lg border border-slate-700 text-xs font-semibold">
        <div className="text-slate-400 mb-1 font-bold">{label} 2025</div>
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-3 text-emerald-400">
            <span>Delivered:</span>
            <span className="font-bold">{payload[0]?.value}</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-amber-400">
            <span>In Transit:</span>
            <span className="font-bold">{payload[1]?.value}</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-rose-400">
            <span>Failed:</span>
            <span className="font-bold">{payload[2]?.value}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function ReportsChartsRow() {
  const [timePeriod1, setTimePeriod1] = useState('Last 7 Days');
  const [timePeriod2, setTimePeriod2] = useState('Last 7 Days');
  const [timePeriod3, setTimePeriod3] = useState('Last 7 Days');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
      {/* Card 1: Deliveries Over Time */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-sm sm:text-base font-black text-[#0B1E36] tracking-tight">
              Deliveries Over Time
            </h3>
            <button
              type="button"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200/90 text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>{timePeriod1}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 mb-3">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Delivered</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>In Transit</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Failed</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full h-48 sm:h-52">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={deliveriesOverTimeData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#94A3B8' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#94A3B8' }}
              />
              <Tooltip content={<CustomLineTooltip />} />
              <Line
                type="monotone"
                dataKey="Delivered"
                stroke="#10B981"
                strokeWidth={2.5}
                dot={{ r: 3.5, fill: '#10B981', strokeWidth: 1.5, stroke: '#FFFFFF' }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="InTransit"
                stroke="#F59E0B"
                strokeWidth={2.5}
                dot={{ r: 3.5, fill: '#F59E0B', strokeWidth: 1.5, stroke: '#FFFFFF' }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="Failed"
                stroke="#EF4444"
                strokeWidth={2.5}
                dot={{ r: 3.5, fill: '#EF4444', strokeWidth: 1.5, stroke: '#FFFFFF' }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Card 2: Deliveries by Status */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-sm sm:text-base font-black text-[#0B1E36] tracking-tight">
            Deliveries by Status
          </h3>
          <button
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200/90 text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <span>{timePeriod2}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
        </div>

        {/* Donut Chart + Legend Side-by-Side */}
        <div className="flex items-center justify-between gap-2 h-48 sm:h-52">
          {/* Donut with Center Count */}
          <div className="relative w-1/2 h-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deliveriesByStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={74}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {deliveriesByStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center Count */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl sm:text-2xl font-black text-slate-900 leading-none">
                156
              </span>
              <span className="text-[10px] font-bold text-slate-400 mt-0.5">
                Total
              </span>
            </div>
          </div>

          {/* Right Legend */}
          <div className="w-1/2 space-y-3 text-[11px] font-bold">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span className="text-slate-700">Delivered</span>
              </div>
              <span className="text-slate-400">142(91.0%)</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0" />
                <span className="text-slate-700">In Transit</span>
              </div>
              <span className="text-slate-400">10(6.4%)</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 flex-shrink-0" />
                <span className="text-slate-700">Failed/Cancelled</span>
              </div>
              <span className="text-slate-400">4(2.6%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Deliveries by Vehicle */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-sm sm:text-base font-black text-[#0B1E36] tracking-tight">
            Deliveries by Vehicle
          </h3>
          <button
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200/90 text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <span>{timePeriod3}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
        </div>

        {/* Horizontal Bar Chart */}
        <div className="w-full h-48 sm:h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={deliveriesByVehicleData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: '#94A3B8' }}
              />
              <YAxis
                type="category"
                dataKey="vehicle"
                axisLine={false}
                tickLine={false}
                width={115}
                tick={{ fontSize: 9, fill: '#64748B', fontWeight: 600 }}
              />
              <Tooltip
                cursor={{ fill: '#F8FAFC' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#0B1E36] text-white px-2 py-1 rounded-lg text-[10px] font-bold">
                        {payload[0].value} Deliveries
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="deliveries"
                fill="#0D7A48"
                radius={[0, 4, 4, 0]}
                barSize={9}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
