import React from 'react';
import { X, CheckCircle, AlertTriangle, Info, AlertOctagon } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '380px',
      }}
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isDanger = toast.type === 'danger';

        return (
          <div
            key={toast.id}
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderLeft: `4px solid ${
                isSuccess
                  ? 'var(--color-success)'
                  : isWarning
                  ? 'var(--color-warning)'
                  : isDanger
                  ? 'var(--color-danger)'
                  : 'var(--color-info)'
              }`,
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              animation: 'fadeIn 0.2s ease-out',
            }}
          >
            {isSuccess && <CheckCircle size={18} color="var(--color-success)" style={{ marginTop: 2 }} />}
            {isWarning && <AlertTriangle size={18} color="var(--color-warning)" style={{ marginTop: 2 }} />}
            {isDanger && <AlertOctagon size={18} color="var(--color-danger)" style={{ marginTop: 2 }} />}
            {!isSuccess && !isWarning && !isDanger && (
              <Info size={18} color="var(--color-info)" style={{ marginTop: 2 }} />
            )}

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {toast.title}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                {toast.message}
              </div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              style={{ color: 'var(--text-muted)', padding: 0 }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
