import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import MetricCard from '../components/MetricCard';
import WeatherCard from '../components/WeatherCard';
import RiskCard from '../components/RiskCard';
import DisputeModal from '../components/DisputeModal';
import { ShieldCheck, TrendingUp, AlertTriangle, Shield, MapPin, Zap, Navigation, Flag, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getSecurityMetrics } from '../utils/trustEngine';

const LOCATIONS = [
  { id: 'hsr', name: 'HSR Layout, Bengaluru', weather: 'sunny', risk: 'LOW', riskScore: 12, drop: 0 },
  { id: 'koramangala', name: 'Koramangala, Bengaluru', weather: 'cloudy', risk: 'MEDIUM', riskScore: 45, drop: 15 },
  { id: 'indiranagar', name: 'Indiranagar, Bengaluru', weather: 'rain', risk: 'HIGH', riskScore: 88, drop: 68 },
  { id: 'bellandur', name: 'Bellandur Flood Zone', weather: 'flood', risk: 'CRITICAL', riskScore: 98, drop: 95 },
  { id: 'tremor', name: 'Fault Line Zone', weather: 'earthquake', risk: 'CRITICAL', riskScore: 99, drop: 100 },
  { id: 'riot', name: 'City Center Curfew', weather: 'curfew', risk: 'CRITICAL', riskScore: 95, drop: 100 },
  { id: 'aqi', name: 'Industrial Toxic Smog', weather: 'pollution', risk: 'HIGH', riskScore: 85, drop: 55 },
];

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, activePlan, claims, logout } = useAuth();
  
  // State
  const [selectedLocId, setSelectedLocId] = useState('hsr');
  const [isAutoDetecting, setIsAutoDetecting] = useState(false);
  const [customLocationName, setCustomLocationName] = useState('');
  const [liveWeather, setLiveWeather] = useState(null); // 'sunny', 'cloudy', 'rain', 'flood', 'earthquake', 'curfew', 'pollution'
  const [showDispute, setShowDispute] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Base off hardcoded if custom API is not loaded
  const currentLocation = LOCATIONS.find(loc => loc.id === selectedLocId);
  const locationName = customLocationName || currentLocation?.name || 'Unknown Zone';
  
  // Derived state from location or Live API 
  const weatherStatus = liveWeather || currentLocation?.weather || 'sunny';
  
  // Calculate relative risk based on weather status
  const riskScore = ['rain', 'flood', 'earthquake', 'curfew', 'pollution'].includes(weatherStatus) ? (weatherStatus === 'earthquake' ? 99 : weatherStatus === 'flood' ? 98 : weatherStatus === 'curfew' ? 95 : weatherStatus === 'rain' ? 88 : 85) : weatherStatus === 'cloudy' ? 45 : 12;
  const dropPercentage = ['rain', 'flood', 'earthquake', 'curfew', 'pollution'].includes(weatherStatus) ? (weatherStatus === 'earthquake' ? 100 : weatherStatus === 'curfew' ? 100 : weatherStatus === 'flood' ? 95 : weatherStatus === 'rain' ? 68 : 55) : weatherStatus === 'cloudy' ? 15 : 0;
  
  const earningsTarget = activePlan?.id === 'premium' ? 2500 : 1500;
  const [earnings, setEarnings] = useState(activePlan?.id === 'premium' ? 2450 : 1250);
  const [isAdversarialMode, setIsAdversarialMode] = useState(false);
  const [isAutoSyncing, setIsAutoSyncing] = useState(false);
  
  const securityMetrics = getSecurityMetrics(isAdversarialMode);
  const trustScore = securityMetrics.trustScore;

  // Animated Earnings Counter
  useEffect(() => {
    if (!['rain', 'flood', 'earthquake', 'curfew', 'pollution'].includes(weatherStatus)) {
      const interval = setInterval(() => {
        setEarnings(prev => prev < earningsTarget ? prev + Math.floor(Math.random() * 5) : prev);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [weatherStatus, earningsTarget]);

  // Zero-Click Claim Orchestration -> redirect to UPI Page
  useEffect(() => {
    // Only auto-redirect if we are not manually disputing
    if (['rain', 'flood', 'earthquake', 'curfew', 'pollution'].includes(weatherStatus) && !showDispute) {
      const claimTimer = setTimeout(() => {
        navigate('/upi', { state: { weatherContext: `${weatherStatus.toUpperCase()} in ${locationName}` } }); 
      }, 7000);
      
      return () => clearTimeout(claimTimer);
    }
  }, [weatherStatus, locationName, navigate, showDispute]);

  // Auto-Sync Polling for Live GPS
  useEffect(() => {
    let interval;
    if (selectedLocId === 'custom_gps') {
      setIsAutoSyncing(true);
      interval = setInterval(() => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              fetchLiveWeatherInfo(position.coords.latitude, position.coords.longitude);
            },
            null,
            { enableHighAccuracy: true }
          );
        }
      }, 30000); // Poll every 30s
    } else {
      setIsAutoSyncing(false);
    }
    return () => clearInterval(interval);
  }, [selectedLocId]);

  // Real HTML5 Geolocation API & Open-Meteo Weather Fetching
  const fetchLiveWeatherInfo = async (lat, lon) => {
    try {
      // Free public API: Open-Meteo
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=precipitation,cloud_cover,rain,weather_code&timezone=auto`);
      const data = await res.json();
      
      const rain = data.current.rain || data.current.precipitation || 0;
      const cloudCover = data.current.cloud_cover || 0;
      const weatherCode = data.current.weather_code;

      // Weather codes: 51-67 (Drizzle/Rain), 80-82 (Rain showers), 95-99 (Thunderstorm)
      const isRaining = rain > 0 || (weatherCode >= 51 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82) || (weatherCode >= 95 && weatherCode <= 99);

      if (isRaining) {
        setLiveWeather('rain');
      } else if (cloudCover > 30 || (weatherCode >= 1 && weatherCode <= 3) || weatherCode === 45 || weatherCode === 48) {
        setLiveWeather('cloudy');
      } else {
        setLiveWeather('sunny');
      }
    } catch (error) {
       console.error("Failed to fetch API weather, falling back to simulated rain", error);
       setLiveWeather('rain'); // Fallback for demo
    }
  };

  const handleLiveGPS = () => {
    setIsAutoDetecting(true);
    setLiveWeather(null);
    setCustomLocationName('Acquiring Satellite Lock...');
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
           const lat = position.coords.latitude;
           const lon = position.coords.longitude;
           
           try {
             const revGeoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
             const revGeoData = await revGeoRes.json();
             const cityName = revGeoData.locality || revGeoData.city || revGeoData.principalSubdivision || `Zone [${lat.toFixed(2)}, ${lon.toFixed(2)}]`;
             setCustomLocationName(`${cityName} [Live GPS]`);
           } catch (e) {
             setCustomLocationName(`Zone: [${lat.toFixed(4)}, ${lon.toFixed(4)}]`);
           }
           
           setSelectedLocId('custom_gps');
           await fetchLiveWeatherInfo(lat, lon);
           setIsAutoDetecting(false);
        },
        (error) => {
           console.error("GPS Error:", error);
           alert("GPS Access Denied or Failed. Continuing with simulated location tracking.");
           simulateAutoDetect();
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      simulateAutoDetect();
    }
  };

  // Fallback simulator if Real GPS is blocked
  const simulateAutoDetect = () => {
     let step = 0;
     const interval = setInterval(() => {
       setSelectedLocId(LOCATIONS[step % LOCATIONS.length].id);
       setCustomLocationName('');
       setLiveWeather(null);
       step++;
       if (step > 2) {
         clearInterval(interval);
         setSelectedLocId('indiranagar');
         setIsAutoDetecting(false);
       }
     }, 1500);
  };

  const handleManualSelect = (e) => {
    setIsAutoDetecting(false);
    setLiveWeather(null);
    setCustomLocationName('');
    setSelectedLocId(e.target.value);
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="header animate-slide-up" style={{ gridColumn: 'span 12' }}>
        <div className="header-title-container">
          <div className="flex gap-4 align-center mb-1">
            <h1 className="text-3xl font-extrabold metric-value" style={{ margin: 0, fontSize: '2.2rem' }}>Operations Nexus</h1>
            <span className="badge active glow-pulse" style={{ borderColor: activePlan?.color, color: activePlan?.color, background: `${activePlan?.color}22`, alignSelf: 'center' }}>Coverage Active</span>
          </div>
          <div className="flex gap-4 align-center mt-2">
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={14} color={activePlan?.color} />
              <span style={{ color: activePlan?.color, fontWeight: 'bold' }}>{activePlan?.name?.toUpperCase()}</span>
            </div>
          </div>
        </div>
        
        {/* Profile / Trust Indicator */}
        <div style={{ textAlign: 'right' }}>
          <div className="text-sm text-secondary">Delivery Partner</div>
          <div className="font-bold text-lg">{user?.name}</div>
          <div className="flex align-center gap-2 justify-end" style={{ marginTop: '0.25rem' }}>
            <ShieldCheck size={16} color="var(--accent-green)" />
            <span className="text-sm text-green font-medium">Verified Profile</span>
          </div>
        </div>
      </div>

      {/* Top Row: Core Metrics & Location Selection */}
      <MetricCard 
        title="Earnings Protected Today" 
        value={<span style={{ transition: 'color 0.5s' }}>₹{earnings.toLocaleString()}</span>} 
        icon={<TrendingUp />} 
        className="delay-1"
        style={{ gridColumn: 'span 5' }}
        onClick={() => navigate('/history')}
      >
        <div className="flex justify-between text-sm" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
          <span>Target: ₹{earningsTarget}</span>
          <span style={{ color: ['rain', 'earthquake', 'flood', 'curfew', 'pollution'].includes(weatherStatus) ? 'var(--accent-red)' : 'var(--accent-green)', fontWeight: 600 }}>
            {['rain', 'earthquake', 'flood', 'curfew', 'pollution'].includes(weatherStatus) ? 'Disruption Detected' : 'On Track'}
          </span>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--panel-border)', overflow: 'hidden' }}>
          {(claims && claims.length > 0) ? claims.slice(0, 2).map((claim, idx) => (
            <div key={claim.id} className="flex align-center justify-between" style={{ padding: '0.9rem 1rem', borderBottom: idx === 0 && claims.length > 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span className="text-sm font-bold">{claim.amount} • {claim.reason.split('(')[0]}</span>
                  <span className="text-[10px] text-secondary">{claim.date}</span>
               </div>
               <span className="badge success" style={{ fontSize: '10px' }}>{claim.status.toUpperCase()}</span>
            </div>
          )) : (
            <div className="flex align-center justify-center text-secondary text-xs" style={{ padding: '2rem' }}>
               No recent parametric payouts
            </div>
          )}
          
          <div 
             onClick={(e) => { e.stopPropagation(); navigate('/history'); }}
             className="flex align-center justify-center" 
             style={{ padding: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', cursor: 'pointer', transition: 'background 0.3s' }} 
             onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} 
             onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
          >
            <span className="text-secondary text-xs uppercase font-bold" style={{ letterSpacing: '1px' }}>View All History</span>
          </div>
        </div>
      </MetricCard>

      <div style={{ gridColumn: 'span 7', display: 'flex', gap: '1.5rem', flexDirection: 'column' }}>
        
        {/* Location Controls */}
        <div className="glass-card flex align-center justify-between" style={{ padding: '1rem 1.5rem', animationDelay: '0.15s', overflow: 'visible', position: 'relative', zIndex: 100 }}>
          <div className="flex align-center gap-4">
            <div className="flex align-center gap-2">
              <MapPin size={18} color="var(--accent-blue)" />
              <span className="font-medium text-secondary">Work Zone:</span>
            </div>
            
            {/* Live GPS Override Badge or Select */}
            {selectedLocId === 'custom_gps' ? (
               <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid var(--accent-green)', color: 'var(--accent-green)', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 'bold' }}>
                 LIVE HTML5 GEOLOCATION ACTIVE
               </div>
            ) : (
                <div style={{ position: 'relative' }}>
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={{
                      padding: '0.5rem 1rem', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--panel-border)',
                      borderRadius: '8px', color: 'white', cursor: 'pointer', fontWeight: '500', minWidth: '220px',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s'
                    }}
                  >
                    {currentLocation?.name || '--- Select Zone ---'}
                    <ChevronDown size={16} style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
                  </div>
                  
                  {isDropdownOpen && (
                    <div className="animate-scale-in" style={{
                      position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '0.5rem',
                      background: 'rgba(20,20,25,0.95)', border: '1px solid var(--panel-border)',
                      borderRadius: '8px', backdropFilter: 'blur(10px)', zIndex: 50, overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}>
                      <div style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid var(--panel-border)' }}>
                        Simulated Impact Zones
                      </div>
                      {LOCATIONS.map(loc => (
                        <div 
                          key={loc.id}
                          onClick={() => {
                            handleManualSelect({ target: { value: loc.id } });
                            setIsDropdownOpen(false);
                          }}
                          style={{
                            padding: '0.75rem 1rem', cursor: 'pointer', color: loc.id === selectedLocId ? 'var(--accent-blue)' : 'white',
                            background: loc.id === selectedLocId ? 'rgba(59,130,246,0.1)' : 'transparent',
                            transition: 'background 0.2s', fontSize: '0.9rem', fontWeight: loc.id === selectedLocId ? 'bold' : 'normal'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = loc.id === selectedLocId ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = loc.id === selectedLocId ? 'rgba(59,130,246,0.1)' : 'transparent'}
                        >
                          {loc.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
            )}
            
          </div>
          
          <button 
            onClick={handleLiveGPS}
            className={isAutoDetecting ? 'glow-pulse' : ''}
            style={{
               background: isAutoDetecting ? 'var(--accent-green)' : 'rgba(255,255,255,0.05)',
               color: isAutoDetecting ? '#000' : 'white',
               border: '1px solid var(--panel-border)',
               padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer',
               fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem',
               transition: 'all 0.3s'
            }}
          >
            {isAutoDetecting ? <Zap size={16} fill="#000" /> : <Navigation size={16} />} 
            {isAutoDetecting ? 'Fetching Coordinate Weather API...' : 'Fetch Live GPS API'}
          </button>
        </div>

        <WeatherCard status={weatherStatus} locationName={locationName} isAutoDetecting={selectedLocId === 'custom_gps'} delay={2} className="flex-1" style={{ flex: 1, width: '100%' }} />
      </div>

      {/* Middle Row: AI Analysis & Risk */}
      <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <RiskCard riskScore={riskScore} trustScore={trustScore} securityMetrics={securityMetrics} isAutoSyncing={isAutoSyncing} delay={3} />
      </div>
      
      <div style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <MetricCard title="Live Disruption Status" delay={4} icon={<AlertTriangle />} style={{ height: '100%' }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', borderLeft: ['rain', 'earthquake', 'flood', 'curfew', 'pollution'].includes(weatherStatus) ? '4px solid var(--accent-red)' : weatherStatus === 'cloudy' ? '4px solid var(--accent-yellow)' : '4px solid var(--accent-green)', transition: 'all 0.5s', height: '100%', position: 'relative' }}>
            
            <div style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '1.1rem', color: ['rain', 'earthquake', 'flood', 'curfew', 'pollution'].includes(weatherStatus) ? 'var(--accent-red)' : weatherStatus === 'cloudy' ? 'var(--accent-yellow)' : 'var(--accent-green)' }}>
              {weatherStatus === 'sunny' && 'All Systems Nominal - Calm Weather'}
              {weatherStatus === 'cloudy' && 'Warning: Impending Storm Cells'}
              {weatherStatus === 'rain' && 'CRITICAL: Heavy Waterlogging Detected'}
              {weatherStatus === 'flood' && 'CATASTROPHIC: Severe Flooding & Road Blockages'}
              {weatherStatus === 'earthquake' && 'CATASTROPHIC: Seismic Activity / Tremor Detected'}
              {weatherStatus === 'curfew' && 'CATASTROPHIC: Section 144 / Curfew Active'}
              {weatherStatus === 'pollution' && 'CRITICAL: Severe Toxic AQI Levels'}
            </div>
            
            <div className="text-sm text-secondary" style={{ lineHeight: '1.5' }}>
              {weatherStatus === 'sunny' && `Weather conditions optimal in ${locationName}. No disruptions detected in working zone. Income protection active.`}
              {weatherStatus === 'cloudy' && `Orders dropped by ${dropPercentage}% in ${locationName} as clouds gather. Smart contract on standby for parametric threshold breach.`}
              {(['rain', 'flood', 'earthquake', 'curfew', 'pollution'].includes(weatherStatus)) && `Critical zone threshold reached for ${activePlan?.name}. Orders dropped by ${dropPercentage}% in ${locationName}. AI Parametric policy conditions met.`}
            </div>
            
            {(['rain', 'flood', 'earthquake', 'curfew', 'pollution'].includes(weatherStatus)) ? (
               <div style={{ marginTop: '1rem', color: activePlan?.color || 'var(--accent-blue)', fontWeight: 'bold' }} className="glow-pulse">
                 Initiating Secure Verification...
               </div>
            ) : (
               <button 
                 onClick={() => setShowDispute(true)}
                 style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', background: 'transparent', border: '1px solid var(--panel-border)', padding: '0.5rem 1rem', borderRadius: '8px', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}
               >
                 <Flag size={14}/> Dispute / AI is wrong
               </button>
            )}
          </div>
        </MetricCard>
      </div>

      {showDispute && <DisputeModal onClose={() => setShowDispute(false)} weatherContext={`${weatherStatus.toUpperCase()} in ${locationName}`} />}

      {/* Context-Aware Preventive Insurance System Panels */}
      <div style={{ gridColumn: 'span 12', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem', marginTop: '0.5rem' }}>
        
        {/* SECTION 1: Current Situation Panel */}
        <div className="glass-card" style={{ gridColumn: 'span 4', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Current Situation</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="text-secondary">Risk:</span>
              <span style={{ color: 'var(--accent-red)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>HIGH 🔴</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span className="text-secondary" style={{ minWidth: '60px' }}>Reason:</span>
              <span style={{ color: 'white', textAlign: 'right', fontSize: '0.9rem' }}>Night shift + 8 hour work duration</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', padding: '0.75rem', background: 'rgba(239,68,68,0.1)', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.3)' }}>
              <span style={{ color: 'var(--accent-red)', fontWeight: 'bold', fontSize: '0.9rem' }}>Action:</span>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>Take a break</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: Live Alerts */}
        <div className="glass-card" style={{ gridColumn: 'span 4', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Live Alerts</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(239,68,68,0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.3)' }}>
              <span style={{ fontSize: '1.2rem' }}>⚠</span>
              <span style={{ color: 'white', fontSize: '0.95rem', fontWeight: '500' }}>Entered high-risk zone</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(239,68,68,0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.3)' }}>
              <span style={{ fontSize: '1.2rem' }}>⚠</span>
              <span style={{ color: 'white', fontSize: '0.95rem', fontWeight: '500' }}>Fatigue detected (worked {'>'} 8 hrs)</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: Impact of Preventive System */}
        <div className="glass-card" style={{ gridColumn: 'span 4', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--accent-blue)', background: 'rgba(59,130,246,0.05)', position: 'relative' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--accent-blue)', borderBottom: '1px solid rgba(59,130,246,0.2)', paddingBottom: '0.5rem' }}>Preventive System Impact</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div className="text-secondary" style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>Before</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>12</div>
              <div className="text-secondary" style={{ fontSize: '0.7rem' }}>incidents</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}>→</div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div className="text-secondary" style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>After</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-green)' }}>7</div>
              <div className="text-secondary" style={{ fontSize: '0.7rem' }}>incidents</div>
            </div>
          </div>
          
          <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', padding: '0.75rem', textAlign: 'center', marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--accent-green)', fontWeight: 'bold', fontSize: '0.95rem' }}>↓ 40% Risk Reduction</span>
          </div>
          
          <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
            Based on simulated behavioral data
          </div>
        </div>
      </div>

      {/* Adversarial Test Suite Simulation Control */}
      <div style={{ gridColumn: 'span 12', marginTop: '1.5rem' }}>
        <div className="glass-card" style={{ 
          padding: '1rem 1.75rem', 
          border: isAdversarialMode ? '1px solid var(--accent-red)' : '1px solid var(--panel-border)', 
          background: isAdversarialMode ? 'rgba(239,68,68,0.05)' : 'rgba(255,255,255,0.02)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backdropFilter: 'blur(10px)'
        }}>
          <div className="flex align-center gap-4">
             <div className={`status-dot ${isAdversarialMode ? 'active' : ''}`} style={{ background: isAdversarialMode ? 'var(--accent-red)' : 'var(--accent-green)', width: '12px', height: '12px' }} />
             <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="text-xs uppercase font-bold text-secondary" style={{ letterSpacing: '1px' }}>Judicial Review & Security Simulation Mode</span>
                <span className="text-md font-bold">{isAdversarialMode ? 'SPOOFED ATTACK ENGAGED - TRUST SCORE COMPROMISED' : 'VALID USER FLOW - MULTI-SENSOR SYNC ACTIVE'}</span>
             </div>
          </div>
          <button 
             onClick={() => setIsAdversarialMode(!isAdversarialMode)}
             style={{ 
               background: isAdversarialMode ? 'var(--accent-red)' : 'linear-gradient(135deg, var(--accent-blue), #1e40af)', 
               color: 'white',
               border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 'bold', transition: 'all 0.3s',
               boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
             }}
          >
            {isAdversarialMode ? 'RESET SECURITY ENGINE' : 'SIMULATE ADVERSARIAL ATTACK'}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
