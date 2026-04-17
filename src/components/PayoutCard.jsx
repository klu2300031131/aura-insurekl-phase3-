import { Activity, CheckCircle, Smartphone } from 'lucide-react';
import React from 'react';

const PayoutCard = ({ payoutStatus, amount, delay = 0 }) => {
  return (
    <div 
      className={`glass-card ${payoutStatus === 'done' ? 'success' : ''}`} 
      style={{ 
        animationDelay: `${delay * 0.1}s`,
        animationFillMode: 'both',
        position: 'relative'
      }}
    >
      <div className="flex justify-between" style={{ marginBottom: '1.5rem' }}>
        <h3 className="text-secondary font-medium">Parametric Claim</h3>
        <div style={{
          display: 'flex',
          gap: '4px'
        }}>
          <div className={`status-dot ${payoutStatus === 'idle' ? 'active' : ''}`} />
          <div className={`status-dot ${payoutStatus === 'verifying' ? 'active' : ''}`} />
          <div className={`status-dot ${payoutStatus === 'paying' ? 'active' : ''}`} />
          <div className={`status-dot ${payoutStatus === 'done' ? 'active' : ''}`} />
        </div>
      </div>

      <div className="timeline">
        <div className={`timeline-item ${payoutStatus !== 'idle' ? 'opacity-100' : 'opacity-50'}`}>
          <div className="timeline-icon"><Activity size={16} /></div>
          <div>
            <div className="text-sm font-bold">1. Disruption Detected</div>
            <div className="text-xs text-secondary">AI confirmed heavy rainfall in zone</div>
          </div>
        </div>
        
        <div className={`timeline-item ${['paying', 'done'].includes(payoutStatus) ? 'opacity-100' : 'opacity-50'}`}>
          <div className="timeline-icon"><Activity size={16} /></div>
          <div>
            <div className="text-sm font-bold">2. Auto-Verification</div>
            <div className="text-xs text-secondary">Checking conditions & validating trust</div>
          </div>
        </div>
        
        <div className={`timeline-item ${payoutStatus === 'done' ? 'opacity-100' : 'opacity-50'} active`} style={{ borderLeftColor: payoutStatus === 'done' ? 'var(--accent-green)' : 'transparent' }}>
          <div className="timeline-icon" style={{ borderColor: payoutStatus === 'done' ? 'var(--accent-green)' : 'var(--border-color)', color: payoutStatus === 'done' ? 'var(--accent-green)' : 'inherit' }}>
            <CheckCircle size={16} />
          </div>
          <div>
            <div className={`text-sm font-bold ${payoutStatus === 'done' ? 'text-green' : ''}`}>3. Instant Payout</div>
            <div className="text-xs text-secondary">Claim executed via Smart Contract</div>
            
            {payoutStatus === 'done' && (
              <div className="payout-success-box animate-scale-in">
                <Smartphone size={20} color="var(--accent-green)" />
                <span style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>₹{amount} credited via UPI</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoutCard;
