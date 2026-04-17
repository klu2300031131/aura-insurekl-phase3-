import React from 'react';

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-grid">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
