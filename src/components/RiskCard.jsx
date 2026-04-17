import { ShieldCheck, Crosshair } from 'lucide-react';
import React from 'react';

const RiskCard = ({ riskScore, trustScore, securityMetrics, isAutoSyncing, delay = 0 }) => {
  const [showDeepDive, setShowDeepDive] = React.useState(false);

  const getRiskColor = (score) => {
    if (score < 40) return 'var(--accent-green)';
    if (score < 70) return 'var(--accent-yellow)';
    return 'var(--accent-red)';
  };

  const getRiskLabel = (score) => {
    if (score < 40) return 'LOW';
    if (score < 70) return 'MEDIUM';
    return 'HIGH';
  };

  const riskColor = getRiskColor(riskScore);
  const riskLabel = getRiskLabel(riskScore);

  return (
    <div 
      className="glass-card" 
      style={{ 
        animationDelay: `${delay * 0.1}s`,
        animationFillMode: 'both'
      }}
    >
      <div className="flex justify-between" style={{ marginBottom: '1.5rem' }}>
        <h3 className="text-secondary font-medium flex align-center gap-2">
          <Crosshair size={18} />
          AI Risk Engine
        </h3>
        <div className="flex align-center gap-3">
          {isAutoSyncing && (
            <span className="badge active glow-pulse" style={{ borderColor: 'var(--accent-green)', color: 'var(--accent-green)', background: 'rgba(16,185,129,0.1)', fontSize: '10.5px' }}>
              LIVE STREAMING
            </span>
          )}
          <span className="badge">Processing</span>
        </div>
      </div>

      <div className="flex gap-4">
        <div style={{ flex: 1 }}>
          <div className="text-secondary text-sm mb-1">Live Risk Assessment</div>
          <div className="flex align-center gap-2" style={{ marginBottom: '1rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: riskColor }}>
              {riskScore}/100
            </span>
            <span className="badge" style={{ background: `${riskColor}33`, color: riskColor, borderColor: riskColor }}>
              {riskLabel} RISK
            </span>
          </div>

          <div className="text-secondary text-sm mb-1">Trust Score (Adversarial AI)</div>
          <div className="flex align-center gap-2" style={{ marginBottom: '1.5rem' }}>
            <ShieldCheck size={24} color={trustScore > 70 ? "var(--accent-green)" : "var(--accent-red)"} />
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', height: '100%', borderRadius: '3px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${trustScore}%`, background: trustScore > 70 ? 'var(--accent-green)' : 'var(--accent-red)', transition: 'width 1s ease-out' }} />
            </div>
            <span className="text-sm font-medium">{trustScore}%</span>
          </div>

          {/* Security Deep-Dive */}
          <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '8px', padding: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
             <div className="flex justify-between align-center" style={{ marginBottom: '0.75rem' }}>
                <span className="text-xs font-bold uppercase text-secondary" style={{ letterSpacing: '1px' }}>Market-Crash Defense Layer</span>
                <button 
                  onClick={() => setShowDeepDive(!showDeepDive)}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', fontSize: '0.7rem', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {showDeepDive ? 'HIDE INTEL' : 'VIEW INTEL'}
                </button>
             </div>

             <div className="flex justify-between gap-4" style={{ marginBottom: showDeepDive ? '1.25rem' : '0' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                   <span className="text-secondary opacity-50" style={{ fontSize: '9px', letterSpacing: '0.5px' }}>NETWORK</span>
                   <span className="font-bold text-xs" style={{ whiteSpace: 'nowrap' }}>{securityMetrics?.networkStability || 'Scanning...'}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                   <span className="text-secondary opacity-50" style={{ fontSize: '9px', letterSpacing: '0.5px' }}>SENSORS</span>
                   <span className="font-bold text-xs" style={{ whiteSpace: 'nowrap' }}>{securityMetrics?.sensorSync || 'Syncing...'}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                   <span className="text-secondary opacity-50" style={{ fontSize: '9px', letterSpacing: '0.5px' }}>KINETIC</span>
                   <span className="font-bold text-xs" style={{ whiteSpace: 'nowrap' }}>{securityMetrics?.kineticPattern || 'Analyzing...'}</span>
                </div>
             </div>

             {showDeepDive && (
                <div className="animate-slide-up flex flex-col gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.75rem' }}>
                   {securityMetrics?.details.map((detail, idx) => (
                      <div key={idx} className="flex gap-2">
                         <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: detail.status === 'pass' ? 'var(--accent-green)' : 'var(--accent-red)', marginTop: '6px' }} />
                         <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-bold" style={{ color: detail.status === 'pass' ? 'var(--accent-green)' : 'var(--accent-red)' }}>{detail.label}</span>
                            <span className="text-[11px] text-secondary leading-tight">{detail.message}</span>
                         </div>
                      </div>
                   ))}
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskCard;
