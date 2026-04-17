import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Clock, CheckCircle, XCircle, FileText, Activity, ChevronDown } from 'lucide-react';

const HistoryPage = () => {
  const { user, claims } = useAuth();
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <div className="header animate-slide-up">
        <div className="header-title-container">
          <div className="flex gap-4 align-center">
            <h1 className="text-3xl font-bold">Claim History</h1>
            <span className="badge">Immutable Ledger</span>
          </div>
          <p className="text-sm text-secondary" style={{ marginTop: '0.5rem' }}>
            A complete audit trail of your automated parametric claims, {user?.name}. Click a record for polygon transaction details.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '3rem' }}>
        {(claims || []).map((claim, idx) => {
          const isExpanded = expandedId === claim.id;
          
          return (
            <div 
              key={claim.id} 
              className="glass-card animate-slide-up" 
              style={{ 
                animationDelay: `${idx * 0.1}s`,
                borderLeft: `4px solid ${claim.status === 'approved' ? 'var(--accent-green)' : 'var(--accent-red)'}`,
                padding: '0',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onClick={() => handleToggle(claim.id)}
            >
              <div className="flex justify-between align-center" style={{ padding: '1.5rem', background: isExpanded ? 'rgba(255,255,255,0.02)' : 'transparent', transition: 'background 0.3s' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <div style={{ 
                    background: claim.status === 'approved' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', 
                    padding: '1rem', borderRadius: '50%'
                  }}>
                    {claim.status === 'approved' 
                      ? <CheckCircle size={24} color="var(--accent-green)" />
                      : <XCircle size={24} color="var(--accent-red)" />
                    }
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 600 }}>{claim.id}</span>
                      <span className="text-xs text-secondary flex align-center gap-1"><Clock size={12} /> {claim.date}</span>
                    </div>
                    <div className="text-sm text-secondary">{claim.reason}</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: claim.status === 'approved' ? 'var(--text-primary)' : 'var(--text-secondary)', textDecoration: claim.status === 'denied' ? 'line-through' : 'none' }}>
                      {claim.amount}
                    </div>
                    <div className="text-xs font-bold" style={{ color: claim.status === 'approved' ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                      {claim.status.toUpperCase()}
                    </div>
                  </div>
                  <ChevronDown size={20} color="var(--text-secondary)" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
                </div>
              </div>

              {/* Expanded Details Section */}
              {isExpanded && (
                <div style={{ padding: '1.5rem', borderTop: '1px solid var(--panel-border)', background: 'rgba(0,0,0,0.3)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                   
                   <div>
                     <div className="text-xs text-secondary font-bold uppercase mb-2">Transaction Details</div>
                     <div className="glass-card" style={{ padding: '1rem', border: '1px dashed var(--panel-border)', background: 'rgba(255,255,255,0.02)' }}>
                        <div className="text-xs text-secondary mb-1">Blockchain ID / UPI Ref</div>
                        <div className="font-mono text-sm mb-3 text-blue">{claim.transactionId}</div>
                        
                        <div className="text-xs text-secondary mb-1">Processing Delay</div>
                        <div className="font-mono text-sm">{claim.timeToProcess}</div>
                     </div>
                   </div>

                   <div>
                     <div className="text-xs text-secondary font-bold uppercase mb-2">Dispute & AI Status</div>
                     <div className="glass-card" style={{ padding: '1rem', border: '1px dashed var(--panel-border)' }}>
                        <div className="text-sm flex align-center gap-2 mb-2">
                           {claim.disputeStatus.includes('N/A') ? <Activity size={16} color="var(--accent-green)" /> : <FileText size={16} color="var(--accent-yellow)" />}
                           <span style={{ fontWeight: 600 }}>{claim.disputeStatus}</span>
                        </div>
                        <p className="text-xs text-secondary">
                          {claim.disputeStatus.includes('N/A') 
                            ? "Policy conditions exactly matched API data. Payout executed natively without human intervention."
                            : claim.status === 'approved' 
                               ? "Worker overriding evidence successfully passed Vision Engine verification. Manual payout routed."
                               : "Vision Engine detected manipulation or EXIF discrepancy in uploaded photo. Claim logged and denied."
                          }
                        </p>
                     </div>
                   </div>

                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryPage;
