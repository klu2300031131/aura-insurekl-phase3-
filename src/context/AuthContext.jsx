import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [activePlan, setActivePlan] = useState(null);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from local storage on mount
    const storedUser = localStorage.getItem('insureklUser');
    const storedPlan = localStorage.getItem('insureklPlan');
    const allClaims = JSON.parse(localStorage.getItem('insureklClaims') || '[]');
    
    let currentUser = null;
    if (storedUser) {
      currentUser = JSON.parse(storedUser);
      setUser(currentUser);
    }
    
    if (storedPlan) setActivePlan(JSON.parse(storedPlan));
    
    if (currentUser) {
      // Filter claims for the logged-in user
      const userClaims = allClaims.filter(c => c.userEmail === currentUser.email);
      setClaims(userClaims);
    } else {
      setClaims([]);
    }
    
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulate login logic, usually we'd verify password
    const users = JSON.parse(localStorage.getItem('insureklUsers') || '[]');
    const existing = users.find(u => u.email === email);
    
    if (existing && password === existing.password) {
      setUser(existing);
      localStorage.setItem('insureklUser', JSON.stringify(existing));
      
      // Load this user's claims
      const allClaims = JSON.parse(localStorage.getItem('insureklClaims') || '[]');
      setClaims(allClaims.filter(c => c.userEmail === email));
      // Look up if this old user previously selected a plan
      const userPlans = JSON.parse(localStorage.getItem('insureklUserPlans') || '{}');
      if (userPlans[existing.email]) {
        setActivePlan(userPlans[existing.email]);
        localStorage.setItem('insureklPlan', JSON.stringify(userPlans[existing.email]));
        return { success: true, hasPlan: true };
      }
      
      return { success: true, hasPlan: false };
    }
    return { success: false, hasPlan: false };
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('insureklUsers') || '[]');
    if (users.find(u => u.email === email)) return false; // Already exists
    
    const newUser = { name, email, password, id: Date.now().toString() };
    users.push(newUser);
    localStorage.setItem('insureklUsers', JSON.stringify(users));
    
    setUser(newUser);
    localStorage.setItem('insureklUser', JSON.stringify(newUser));
    setClaims([]); // New user starts with empty history
    return true;
  };

  const logout = () => {
    setUser(null);
    setActivePlan(null);
    setClaims([]);
    localStorage.removeItem('insureklUser');
    localStorage.removeItem('insureklPlan');
  };

  const selectPlan = (plan) => {
    setActivePlan(plan);
    localStorage.setItem('insureklPlan', JSON.stringify(plan));
    
    if (user) {
      const userPlans = JSON.parse(localStorage.getItem('insureklUserPlans') || '{}');
      userPlans[user.email] = plan;
      localStorage.setItem('insureklUserPlans', JSON.stringify(userPlans));
    }
  };

  const addClaim = (claimObj) => {
    if (!user) return;
    
    const claimWithUser = { ...claimObj, userEmail: user.email };
    
    // Add to state
    setClaims(prev => [claimWithUser, ...prev]);
    
    // Add to all claims in localStorage
    const allClaims = JSON.parse(localStorage.getItem('insureklClaims') || '[]');
    const updatedAllClaims = [claimWithUser, ...allClaims];
    localStorage.setItem('insureklClaims', JSON.stringify(updatedAllClaims));
  };

  return (
    <AuthContext.Provider value={{ user, activePlan, claims, login, register, logout, selectPlan, addClaim, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
