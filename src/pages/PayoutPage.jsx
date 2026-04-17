import React, { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Activity, ShieldCheck, Zap } from 'lucide-react';

const PayoutPage = () => {
  const { activePlan, addClaim } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const weatherContext = location.state?.weatherContext || 'Parametric Threshold Breached';
  const addedRef = useRef(false);
  
  useEffect(() => {
    if (!addedRef.current && activePlan) {
      addedRef.current = true;
      const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      const payoutAmount = activePlan.id === 'premium' ? '₹600' : activePlan.id === 'standard' ? '₹350' : '₹100';
      
      const newClaim = {
         id: `AUTO-${Math.floor(Math.random() * 90000) + 10000}`,
         date: today,
         amount: payoutAmount,
         status: 'approved',
         reason: `Automated Parametric Execution (${weatherContext})`,
         transactionId: `TXN-${Math.floor(Math.random() * 900000)}`,
         disputeStatus: 'N/A (Auto-Executed)',
         timeToProcess: '115ms (Smart Contract)'
      };
      
      addClaim(newClaim);
    }
  }, [activePlan, addClaim]);
  
  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      
      <div className="glow-pulse" style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 60%)',
        filter: 'blur(50px)', zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '600px', padding: '2rem' }}>
        
        {/* Timeline Header */}
        <div style={{ marginBottom: '3rem' }} className="animate-slide-up">
           <div className="badge active glow-pulse" style={{ display: 'inline-block', marginBottom: '1rem', background: 'rgba(16,185,129,0.1)', color: 'var(--accent-green)', borderColor: 'var(--accent-green)' }}>
             Zero-Click Smart Contract Executed
           </div>
           <h1 className="text-3xl font-bold mb-2">Claim Successfully Processed</h1>
           <p className="text-secondary text-lg">Your parametric logic conditions were met. The system bypassed human approval and executed directly.</p>
        </div>

        {/* The Timeline Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '4rem', textAlign: 'left' }}>
           
           <div className="glass-card animate-slide-up flex align-center gap-4" style={{ padding: '1.5rem', animationDelay: '0.2s' }}>
             <div style={{ background: 'rgba(59,130,246,0.1)', padding: '0.75rem', borderRadius: '50%' }}>
               <Activity size={24} color="var(--accent-blue)" />
             </div>
             <div>
               <div className="text-sm text-secondary mb-1">Step 1 • 14:02:01</div>
               <div className="font-bold">Weather Threshold Breached</div>
               <div className="text-xs text-secondary">Local API confirmed heavy rainfall above 20mm/hr.</div>
             </div>
             <CheckCircle size={20} color="var(--accent-green)" style={{ marginLeft: 'auto' }} />
           </div>

           <div className="glass-card animate-slide-up flex align-center gap-4" style={{ padding: '1.5rem', animationDelay: '0.4s' }}>
             <div style={{ background: 'rgba(245,158,11,0.1)', padding: '0.75rem', borderRadius: '50%' }}>
               <ShieldCheck size={24} color="var(--accent-yellow)" />
             </div>
             <div>
               <div className="text-sm text-secondary mb-1">Step 2 • 14:02:02</div>
               <div className="font-bold">AI Policy Verification</div>
               <div className="text-xs text-secondary">Validated {activePlan?.name} active status & delivery zone.</div>
             </div>
             <CheckCircle size={20} color="var(--accent-green)" style={{ marginLeft: 'auto' }} />
           </div>

           <div className="glass-card animate-slide-up flex align-center gap-4" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-green)', animationDelay: '0.6s' }}>
             <div style={{ background: 'rgba(16,185,129,0.1)', padding: '0.75rem', borderRadius: '50%' }}>
               <Zap size={24} color="var(--accent-green)" />
             </div>
             <div>
               <div className="text-sm text-secondary mb-1">Step 3 • 14:02:03</div>
               <div className="font-bold">UPI Deposit Complete</div>
               <div className="text-xs text-secondary">Funds routed via IMPS directly to your bank.</div>
             </div>
             <CheckCircle size={20} color="var(--accent-green)" style={{ marginLeft: 'auto' }} />
           </div>

        </div>

         {/* Payout Display */}
         <div className="animate-scale-in flex flex-col align-center justify-center gap-2 delay-4" style={{ marginTop: '2rem', marginBottom: '3rem' }}>
            <div className="text-secondary text-sm font-bold uppercase tracking-wider">Total Settlement</div>
            <div style={{ fontSize: '4.5rem', fontWeight: '900', color: 'var(--accent-green)', lineHeight: 1, textShadow: '0 0 40px rgba(16,185,129,0.4)' }}>
              ₹{activePlan?.id === 'premium' ? '600' : activePlan?.id === 'standard' ? '350' : '100'}
            </div>
            <div className="text-sm text-secondary mt-2">Check your banking app for the transaction receipt.</div>
         </div>

         <button 
           onClick={() => navigate('/dashboard')}
           className="animate-slide-up delay-5"
           style={{
             background: 'rgba(255,255,255,0.05)',
             border: '1px solid var(--panel-border)',
             color: 'white',
             padding: '1rem 2.5rem',
             borderRadius: '9999px',
             cursor: 'pointer',
             fontWeight: '700',
             fontSize: '1.1rem',
             transition: 'all 0.3s',
             marginTop: '3rem'
           }}
           onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'white'; }}
           onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'var(--panel-border)'; }}
         >
           Return to Live Dashboard
         </button>

      </div>
    </div>
  );
};

export default PayoutPage;
