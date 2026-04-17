import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, ArrowRight, Smartphone } from 'lucide-react';

const UpiPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const weatherContext = location.state?.weatherContext || 'Unknown Condition';
  const { user } = useAuth();
  const [upiId, setUpiId] = useState(user?.email?.split('@')[0] || 'worker');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleConfirm = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    // Simulate short network verification of UPI ID
    setTimeout(() => {
      navigate('/payout', { state: { weatherContext } });
    }, 1500);
  };

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 80px)', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Glow */}
      <div className="glow-pulse" style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 60%)',
        filter: 'blur(40px)', zIndex: 0
      }} />

      <div className="glass-card animate-slide-up" style={{ width: '100%', maxWidth: '450px', zIndex: 1, padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
             <ShieldCheck size={48} color="var(--accent-green)" />
          </div>
          <h1 className="text-2xl font-bold mb-1">Claim Verification Verified</h1>
          <p className="text-secondary text-sm">Disruption logic successfully matched. Where should we send your payout?</p>
        </div>

        <form onSubmit={handleConfirm} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label className="text-sm font-medium text-secondary mb-1" style={{ display: 'block' }}>Linked UPI ID</label>
            <div style={{ position: 'relative' }}>
              <Smartphone size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                required
                value={`${upiId}@ybl`}
                onChange={(e) => setUpiId(e.target.value.split('@')[0])}
                disabled={isVerifying}
                style={{ 
                  width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--panel-border)', 
                  borderRadius: '8px', padding: '1rem 1rem 1rem 2.5rem', color: 'white', 
                  outline: 'none', transition: 'border-color 0.3s', fontSize: '1.1rem', fontWeight: '500',
                  opacity: isVerifying ? 0.7 : 1
                }}
              />
            </div>
            <div className="text-xs text-secondary mt-1">Funds will be deposited instantly via IMPS/UPI.</div>
          </div>
          
          <button 
            type="submit" 
            disabled={isVerifying}
            className="flex align-center justify-center gap-2"
            style={{ 
              marginTop: '0.5rem', width: '100%', padding: '1rem', 
              background: isVerifying ? 'var(--panel-border)' : 'var(--accent-green)', 
              color: isVerifying ? 'white' : 'black', border: 'none', borderRadius: '8px', 
              fontWeight: '700', fontSize: '1.1rem', cursor: isVerifying ? 'wait' : 'pointer', 
              transition: 'all 0.3s' 
            }}
          >
             {isVerifying ? 'Verifying Node...' : <>Confirm & Execute Payout <ArrowRight size={18}/></>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpiPage;
