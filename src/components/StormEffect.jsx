import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const RainDrop = ({ delay, left, duration, scale }) => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: '100vh', opacity: [0, 0.5, 0.6, 0] }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: 'linear'
      }}
      style={{
        position: 'absolute',
        top: '-10%',
        left: `${left}%`,
        width: '2px',
        height: '45px',
        background: 'linear-gradient(transparent, rgba(255, 255, 255, 0.8))',
        transform: `scale(${scale})`,
        zIndex: 0
      }}
    />
  );
};

const StormEffect = () => {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    // Generate 60 random raindrops for a heavy rain effect
    const newDrops = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 0.4 + Math.random() * 0.4, // Faster drops
      scale: 0.5 + Math.random() * 0.7
    }));
    setDrops(newDrops);
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {/* Lightning Flashes */}
      <motion.div
        animate={{ opacity: [0, 0, 0, 0, 0, 0.8, 0, 0.4, 0, 0, 0] }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: 'easeInOut',
          times: [0, 0.4, 0.6, 0.8, 0.85, 0.88, 0.9, 0.92, 0.95, 0.98, 1] 
        }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--accent-blue)', // slightly blueish white flash
          mixBlendMode: 'lighten',
          zIndex: 0
        }}
      />
      
      {/* Extra bright core lightning flash */}
      <motion.div
        animate={{ opacity: [0, 0, 0, 0, 0, 0.9, 0, 0.5, 0, 0, 0] }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: 'easeInOut',
          times: [0, 0.4, 0.6, 0.8, 0.85, 0.88, 0.9, 0.92, 0.95, 0.98, 1]
        }}
        style={{
          position: 'absolute',
          inset: 0,
          background: '#ffffff',
          mixBlendMode: 'overlay',
          zIndex: 0
        }}
      />
      
      {/* Rain Drops */}
      {drops.map((drop) => (
        <RainDrop key={drop.id} {...drop} />
      ))}
    </div>
  );
};

export default StormEffect;
