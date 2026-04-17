import React from 'react';

const MetricCard = ({ title, value, icon, className = '', style = {}, delay = 0, onClick, children }) => {
  return (
    <div 
      className={`glass-card ${className}`} 
      style={{ 
        ...style,
        animationDelay: `${delay * 0.1}s`,
        animationFillMode: 'both',
        cursor: onClick ? 'pointer' : 'default'
      }}
      onClick={onClick}
    >
      <div className="flex justify-between" style={{ marginBottom: '1rem' }}>
        <h3 className="text-secondary font-medium">{title}</h3>
        {icon && <div style={{ color: 'var(--accent-blue)' }}>{icon}</div>}
      </div>
      <div className="metric-value">
        {value}
      </div>
      {children}
    </div>
  );
};

export default MetricCard;
