import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Shield, Home, Activity, PieChart, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, activePlan, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/landing');
  };

  return (
    <nav className="glass-navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => navigate('/landing')} style={{ cursor: 'pointer' }}>
          <Shield size={24} color="var(--accent-blue)" />
          <span className="font-bold">Aura-InsureKL</span>
        </div>
        
        <div className="navbar-links">
          {user ? (
            <>
              {activePlan && (
                <>
                  <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Home size={16} /> Dashboard
                  </NavLink>
                  <NavLink to="/payout" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Activity size={16} /> Auto-Claim
                  </NavLink>
                  <NavLink to="/analytics" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <PieChart size={16} /> AI Logic
                  </NavLink>
                </>
              )}
              
              <div style={{ width: '1px', background: 'var(--panel-border)', margin: '0 0.5rem' }} />

              <NavLink to="/plans" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>Plans</NavLink>
              <NavLink to="/history" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>History</NavLink>
              
              <div className="nav-item" style={{ color: 'var(--text-primary)' }}>
                <User size={16} /> {user.name.split(' ')[0]}
              </div>
              <button 
                onClick={handleLogout} 
                className="nav-item" 
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--accent-red)' }}
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/landing" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>Home</NavLink>
              <NavLink to="/login" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>Login</NavLink>
              <NavLink to="/register" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} style={{ background: 'var(--accent-blue)', color: 'white' }}>Get Protected</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
