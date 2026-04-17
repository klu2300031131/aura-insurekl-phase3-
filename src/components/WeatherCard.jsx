import { Cloud, CloudRain, Sun, MapPin, Zap, AlertOctagon, Wind } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WeatherCard = ({ status, locationName, isAutoDetecting, delay = 0, className = '', style = {} }) => {
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 120);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div 
      className={`glass-card ${className} ${status === 'earthquake' ? 'earthquake-shake' : ''}`} 
      style={{ 
        ...style,
        position: 'relative',
        overflow: 'hidden',
        animationDelay: `${delay * 0.1}s`,
        animationFillMode: 'both'
      }}
    >
      <div style={{ position: 'relative', zIndex: 3 }}>
        <div className="flex align-center justify-between" style={{ marginBottom: '1.5rem' }}>
          <h3 className="text-secondary font-medium flex align-center gap-2">
            <MapPin size={18} color={isAutoDetecting ? "var(--accent-green)" : "var(--accent-blue)"} />
            {locationName}
          </h3>
          <span className="badge active glow-pulse flex align-center gap-1">
             {isAutoDetecting ? <><Zap size={12} fill="currentColor"/> LIVE GPS </> : 'MANUAL OVERRIDE'}
          </span>
        </div>

        <div className="flex align-center gap-4 py-2" style={{ transition: 'all 0.5s ease', minHeight: '80px' }}>
          {status === 'sunny' && (
            <>
              <Sun size={48} color="var(--accent-yellow)" style={{ flexShrink: 0, filter: 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.8))' }} />
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Clear Skies</div>
                <div className="text-sm text-green font-medium">Calm Weather. Safe driving conditions.</div>
              </div>
            </>
          )}

          {status === 'cloudy' && (
             <>
              <motion.div
                animate={{ x: [-3, 4, -3], y: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <Cloud size={52} color="var(--text-secondary)" fill="#888" style={{ flexShrink: 0, filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5))' }} />
              </motion.div>
              <div style={{ zIndex: 3 }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Overcast & Cloudy</div>
                <div className="text-sm text-yellow font-medium">Monitoring forming storm cells. Prepare.</div>
              </div>
            </>
          )}

          {status === 'rain' && (
            <>
              <CloudRain size={48} color="var(--accent-cyan)" style={{ flexShrink: 0, filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.8))' }} />
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-cyan)' }}>Severe Weather Detected</div>
                <div className="text-sm text-red font-bold">DANGER: High impact on gig earnings.</div>
              </div>
            </>
          )}

          {status === 'flood' && (
            <>
              <CloudRain size={48} color="var(--accent-cyan)" style={{ flexShrink: 0, filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.8))' }} />
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-cyan)' }}>Catastrophic Flooding</div>
                <div className="text-sm text-red font-bold">DANGER: Impassable roads. Stop deliveries.</div>
              </div>
            </>
          )}

          {status === 'earthquake' && (
            <>
              <AlertOctagon size={48} color="var(--accent-red)" style={{ flexShrink: 0, filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.8))' }} />
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-red)' }}>Seismic Activity</div>
                <div className="text-sm text-red font-bold">DANGER: Drop, Cover, and Hold on.</div>
              </div>
            </>
          )}

          {status === 'curfew' && (
            <>
              <AlertOctagon size={48} color="var(--accent-red)" style={{ flexShrink: 0, filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.8))' }} />
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-red)' }}>Section 144 / Curfew Active</div>
                <div className="text-sm text-red font-bold">DANGER: State Emergency declared. Stop operations.</div>
              </div>
            </>
          )}

          {status === 'pollution' && (
            <>
              <Wind size={48} color="var(--accent-yellow)" style={{ flexShrink: 0, filter: 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.8))' }} />
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-yellow)' }}>Toxic Air Quality (AQI 500+)</div>
                <div className="text-sm text-yellow font-bold">WARNING: Severe health hazard. Stay indoors.</div>
              </div>
            </>
          )}
        </div>

        {/* --- SIMPLIFIED WEATHER METRICS --- */}
        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }} className="flex align-center justify-between">
          <div className="flex gap-4">
             <div className="text-sm"><span className="text-secondary">Temp:</span> <span className="font-bold">{status === 'sunny' ? '32°C' : status === 'cloudy' ? '28°C' : '24°C'}</span></div>
             <div className="text-sm"><span className="text-secondary">Rain:</span> <span className="font-bold" style={{ color: ['rain', 'flood'].includes(status) ? 'var(--accent-cyan)' : 'inherit' }}>{['rain', 'flood'].includes(status) ? '45mm/hr' : '0mm/hr'}</span></div>
          </div>
          
          <div className="text-sm flex align-center gap-2">
            <span className="text-secondary">Sync in:</span>
            <span className="font-mono font-bold" style={{ color: timeLeft < 10 ? 'var(--accent-red)' : 'var(--accent-blue)' }}>
              {mins}:{secs}
            </span>
          </div>
        </div>
      </div>

      {status === 'sunny' && <div className="sun-simulation-overlay" />}
      
      {/* Cloudy uses a simple dark overlay instead of the animated broken box */}
      {status === 'cloudy' && (
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(100, 116, 139, 0.3) 0%, transparent 80%)', pointerEvents: 'none', zIndex: 1 }} />
      )}

      {status === 'rain' && <div className="rain-simulation-overlay" />}
      {status === 'flood' && <div className="flood-simulation-overlay" />}
      {status === 'earthquake' && <div className="earthquake-simulation-overlay" />}
      {status === 'curfew' && <div className="curfew-simulation-overlay" />}
      {status === 'pollution' && <div className="pollution-simulation-overlay" />}
    </div>
  );
};

export default WeatherCard;
