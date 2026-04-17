import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, CreditCard, Lock, Smartphone, ShieldAlert } from 'lucide-react';
import { PLANS } from '../data/plans';

const CheckoutPage = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { selectPlan } = useAuth();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const plan = PLANS.find(p => p.id === planId) || PLANS[1]; // fallback to basic

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate secure payment processing
    setTimeout(() => {
      selectPlan(plan);
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '4rem 2rem' }}>
      <button 
        onClick={() => navigate('/plans')}
        style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
        ← Back to Plans
      </button>

      <div className="glass-card animate-slide-up" style={{ borderTop: `4px solid ${plan.color}` }}>
        <div style={{ padding: '2rem', borderBottom: '1px solid var(--panel-border)', textAlign: 'center' }}>
          <h1 className="text-2xl font-bold mb-1">Activate {plan.name}</h1>
          <p className="text-secondary text-sm">Secure Checkout • Cancel anytime</p>
        </div>

        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Order Summary */}
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '8px' }}>
            <div className="flex justify-between align-center mb-2">
              <span className="text-secondary">Plan Subscription</span>
              <span className="font-bold">{plan.name}</span>
            </div>
            <div className="flex justify-between align-center mb-2">
              <span className="text-secondary">Billing Cycle</span>
              <span className="font-medium">Every {plan.interval}</span>
            </div>
            <div style={{ height: '1px', background: 'var(--panel-border)', margin: '1rem 0' }} />
            <div className="flex justify-between align-center">
              <span className="text-lg">Total Due Today</span>
              <span className="text-2xl font-bold" style={{ color: plan.color }}>{plan.price}</span>
            </div>
          </div>

          <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Payment Method Selector */}
            <div>
              <label className="text-sm font-medium text-secondary mb-1" style={{ display: 'block' }}>Payment Method</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div 
                  onClick={() => setPaymentMethod('upi')}
                  style={{ 
                    flex: 1, 
                    border: paymentMethod === 'upi' ? `2px solid ${plan.color}` : '1px solid var(--panel-border)', 
                    background: paymentMethod === 'upi' ? 'rgba(255,255,255,0.05)' : 'transparent', 
                    padding: '1rem', borderRadius: '8px', cursor: 'pointer', textAlign: 'center', 
                    fontWeight: paymentMethod === 'upi' ? 'bold' : 'normal',
                    color: paymentMethod === 'upi' ? 'white' : 'var(--text-secondary)'
                  }} 
                  className="flex justify-center align-center gap-2"
                >
                  <Smartphone size={18} /> UPI
                </div>
                <div 
                  onClick={() => setPaymentMethod('card')}
                  style={{ 
                    flex: 1, 
                    border: paymentMethod === 'card' ? `2px solid ${plan.color}` : '1px solid var(--panel-border)', 
                    background: paymentMethod === 'card' ? 'rgba(255,255,255,0.05)' : 'transparent', 
                    padding: '1rem', borderRadius: '8px', cursor: 'pointer', textAlign: 'center', 
                    fontWeight: paymentMethod === 'card' ? 'bold' : 'normal',
                    color: paymentMethod === 'card' ? 'white' : 'var(--text-secondary)'
                  }} 
                  className="flex justify-center align-center gap-2"
                >
                  <CreditCard size={18} /> Card
                </div>
              </div>
            </div>

            {/* Dynamic Payment Input */}
            {paymentMethod === 'upi' ? (
              <div className="animate-slide-up">
                <label className="text-sm font-medium text-secondary mb-1" style={{ display: 'block' }}>Enter UPI ID</label>
                <input
                  type="text"
                  required
                  placeholder="name@ybl"
                  style={{ 
                    width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--panel-border)', 
                    borderRadius: '8px', padding: '1rem', color: 'white', 
                    outline: 'none', transition: 'border-color 0.3s'
                  }}
                />
              </div>
            ) : (
              <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label className="text-sm font-medium text-secondary mb-1" style={{ display: 'block' }}>Card Number</label>
                  <input
                    type="text"
                    required
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                    style={{ 
                      width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--panel-border)', 
                      borderRadius: '8px', padding: '1rem', color: 'white', letterSpacing: '2px',
                      outline: 'none', transition: 'border-color 0.3s'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label className="text-sm font-medium text-secondary mb-1" style={{ display: 'block' }}>Expiry</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      maxLength={5}
                      style={{ 
                        width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--panel-border)', 
                        borderRadius: '8px', padding: '1rem', color: 'white', 
                        outline: 'none', transition: 'border-color 0.3s'
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className="text-sm font-medium text-secondary mb-1" style={{ display: 'block' }}>CVV</label>
                    <input
                      type="password"
                      required
                      placeholder="•••"
                      maxLength={3}
                      style={{ 
                        width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--panel-border)', 
                        borderRadius: '8px', padding: '1rem', color: 'white', letterSpacing: '4px',
                        outline: 'none', transition: 'border-color 0.3s'
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isProcessing}
              className="flex align-center justify-center gap-2"
              style={{ 
                marginTop: '1rem', width: '100%', padding: '1.25rem', 
                background: isProcessing ? 'var(--panel-border)' : plan.color, 
                color: '#000', border: 'none', borderRadius: '8px', 
                fontWeight: '700', fontSize: '1.1rem', cursor: isProcessing ? 'wait' : 'pointer', 
                transition: 'all 0.3s' 
              }}
            >
              {isProcessing ? (
                <>Processing Secure Payment...</>
              ) : (
                <> <Lock size={18} /> Pay {plan.price} & Activate</>
              )}
            </button>
            <div className="flex justify-center align-center gap-2 text-xs text-secondary mt-1">
              <ShieldCheck size={14} color="var(--accent-green)" /> Encrypted & secure payment powered by RBI-approved APIs.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
