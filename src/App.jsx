import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import UpiPage from './pages/UpiPage';
import PayoutPage from './pages/PayoutPage';
import CheckoutPage from './pages/CheckoutPage';
import AnalyticsPage from './pages/AnalyticsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PlansPage from './pages/PlansPage';
import HistoryPage from './pages/HistoryPage';
import { useAuth } from './context/AuthContext';
import './index.css';

// Protected Route Component
const ProtectedRoute = ({ children, requirePlan = false }) => {
  const { user, activePlan } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requirePlan && !activePlan) {
    return <Navigate to="/plans" replace />;
  }
  
  return children;
};

function App() {
  return (
    <>
      <Navbar />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route path="/landing" element={<LandingPage />} />
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Routes */}
          <Route path="/plans" element={
            <ProtectedRoute>
              <PlansPage />
            </ProtectedRoute>
          } />

          <Route path="/checkout/:planId" element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute requirePlan={true}>
              <DashboardPage />
            </ProtectedRoute>
          } />
          
          <Route path="/upi" element={
            <ProtectedRoute requirePlan={true}>
              <UpiPage />
            </ProtectedRoute>
          } />
          
          <Route path="/payout" element={
            <ProtectedRoute requirePlan={true}>
              <PayoutPage />
            </ProtectedRoute>
          } />
          
          <Route path="/analytics" element={
            <ProtectedRoute requirePlan={true}>
              <AnalyticsPage />
            </ProtectedRoute>
          } />

          <Route path="/history" element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </>
  );
}

export default App;
