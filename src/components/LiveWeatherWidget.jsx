import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, CloudLightning, CheckCircle2, CloudRain } from 'lucide-react';

const WEATHER_STATES = [
  {
    id: 'clear',
    title: 'Current State: Clear',
    risk: 'Low Risk',
    color: 'var(--accent-blue)',
    icon: <Sun size={32} color="var(--accent-blue)" />,
    bgGlow: 'rgba(59,130,246,0.15)'
  },
  {
    id: 'rain',
    title: 'Current State: Heavy Rain',
    risk: 'Critical Risk',
    color: 'var(--accent-yellow)',
    icon: <CloudLightning size={32} color="var(--accent-yellow)" />,
    bgGlow: 'rgba(245,158,11,0.15)'
  },
  {
    id: 'payout',
    title: 'Threshold Exceeded!',
    risk: 'Smart Contract Executed',
    color: 'var(--accent-green)',
    icon: <CheckCircle2 size={32} color="var(--accent-green)" />,
    bgGlow: 'rgba(16,185,129,0.15)'
  }
];

const LiveWeatherWidget = () => {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentState((prev) => (prev + 1) % WEATHER_STATES.length);
    }, 4000); // 4 seconds per state
    return () => clearInterval(timer);
  }, []);

  const state = WEATHER_STATES[currentState];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card"
      style={{
        width: '320px',
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
        border: `1px solid ${state.color.replace('var(--', '').replace(')', '') === 'accent-blue' ? 'rgba(59,130,246,0.3)' : state.id === 'rain' ? 'rgba(245,158,11,0.3)' : 'rgba(16,185,129,0.3)'}`,
        boxShadow: `0 8px 32px ${state.bgGlow}`,
        transition: 'all 0.5s ease-in-out'
      }}
    >
      {/* Dynamic Background Glow */}
      <motion.div 
        animate={{ backgroundColor: state.bgGlow }}
        transition={{ duration: 1 }}
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          filter: 'blur(50px)',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>
            Live Simulation
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <motion.div 
              animate={{ opacity: [1, 0.4, 1] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: state.color }} 
            />
            <span style={{ fontSize: '0.8rem', color: state.color, fontWeight: 'bold' }}>Active</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={state.id}
              initial={{ opacity: 0, y: 10, rotate: -15 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -10, rotate: 15 }}
              transition={{ duration: 0.4 }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '0.8rem',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              {state.icon}
            </motion.div>
          </AnimatePresence>

          <div style={{ flex: 1 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={state.id + "-text"}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.4 }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.2rem' }}>{state.title}</div>
                <div style={{ color: state.color, fontSize: '0.9rem', fontWeight: '600' }}>{state.risk}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        {/* Progress Bar for the cycle */}
        <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden', marginTop: '0.5rem' }}>
          <motion.div 
            key={state.id + "-progress"}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 4, ease: "linear" }}
            style={{ height: '100%', backgroundColor: state.color }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LiveWeatherWidget;
