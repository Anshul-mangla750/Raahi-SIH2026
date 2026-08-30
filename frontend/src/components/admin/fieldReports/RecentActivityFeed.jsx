import React from 'react';
import { AlertOctagon, CheckCircle2, AlertTriangle, CloudRain, ChevronRight } from 'lucide-react';
import { RECENT_ACTIVITY_FEED } from '@/data/admin/mockData';
import { useApp } from '@/contexts/AppContext';

export const RecentActivityFeed = () => {
  const { setCurrentPage } = useApp();

  const getActivityIcon = (type) => {
    switch (type) {
      case 'danger':
        return <AlertOctagon size={16} color="#EF4444" />;
      case 'success':
        return <CheckCircle2 size={16} color="#10B981" />;
      case 'warning':
        return <AlertTriangle size={16} color="#F59E0B" />;
      case 'info':
        return <CloudRain size={16} color="#3B82F6" />;
      default:
        return <AlertTriangle size={16} color="#64748B" />;
    }
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div className="card-header" style={{ marginBottom: '16px' }}>
          <h2 className="card-title" style={{ margin: 0 }}>Recent Activity</h2>
        </div>

        <div className="recent-activity-list">
          {RECENT_ACTIVITY_FEED.map((act) => (
            <div key={act.id} className="activity-item">
              <div className="activity-left">
                {getActivityIcon(act.type)}
                <span>{act.text}</span>
              </div>
              <span className="activity-time">{act.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button
          className="btn btn-outline"
          style={{ width: '100%', padding: '8px 16px', fontSize: '12px' }}
          onClick={() => setCurrentPage('alerts')}
        >
          <span>View All Activity</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};
