import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  trend,
  period = 'vs yesterday',
  isUp = true,
  isRisk = false,
  isDanger = false,
  icon: Icon,
  iconBg = 'var(--primary-50)',
  iconColor = 'var(--primary-600)',
}) => {
  return (
    <div className="stat-card">
      {Icon && (
        <div
          className="stat-icon-wrapper"
          style={{ backgroundColor: iconBg, color: iconColor }}
        >
          <Icon size={24} />
        </div>
      )}
      <div className="stat-info">
        <div className="stat-title">{title}</div>
        <div className="stat-value-row">
          <span className="stat-value">{value}</span>
          {trend && (
            <span
              className={`stat-trend ${
                isDanger || isRisk ? 'down' : isUp ? 'up' : 'down'
              }`}
            >
              {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {trend}
            </span>
          )}
        </div>
        {period && <div className="stat-subtitle">{period}</div>}
      </div>
    </div>
  );
};
