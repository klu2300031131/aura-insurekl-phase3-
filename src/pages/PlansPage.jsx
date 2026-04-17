import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Zap, Info, ShieldAlert, CloudRain, Star } from 'lucide-react';
import { PLANS } from '../data/plans';

const PlansPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSelect = (plan) => {
    // Navigate to checkout with the plan ID
    navigate(`/checkout/${plan.id}`);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="animate-slide-up">
        <h1 className="text-3xl font-bold mb-1 flex align-center justify-center gap-3">
          <CloudRain color="var(--accent-cyan)" /> Select Your Protection Plan
        </h1>
        <p className="text-secondary text-lg">Hello, {user?.name || 'Partner'}. We offer plans for every gig worker's budget.</p>

        <button 
          onClick={() => navigate('/history')}
          style={{
            marginTop: '1.5rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--panel-border)',
            color: 'var(--text-secondary)',
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: '600',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--text-secondary)'; }}
          onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--panel-border)'; }}
        >
          View Past Claims Ledger
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', alignItems: 'stretch', padding: '1rem 0' }}>
        {PLANS.map((plan, i) => (
          <div 
            key={plan.id} 
            className={`glass-card animate-slide-up ${plan.isPopular ? 'glow-pulse' : ''}`}
            style={{ 
              animationDelay: `${i * 0.1}s`,
              borderTop: `4px solid ${plan.color}`,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              padding: '3rem 1.5rem 2rem',
              transform: plan.isPopular ? 'scale(1.05)' : 'scale(1)',
              zIndex: plan.isPopular ? 10 : 1,
              transition: 'transform 0.3s ease',
              overflow: 'visible'
            }}
          >
            {plan.isPopular && (
              <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: plan.color, color: '#000', padding: '0.25rem 1rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem', boxShadow: `0 0 15px ${plan.color}` }}>
                <Zap size={14} /> MOST SELECTED
              </div>
            )}
            {plan.id === 'enterprise' && (
              <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <Star size={20} color={plan.color} fill={plan.color} />
              </div>
            )}
            {plan.id === 'nano' && (
              <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <ShieldAlert size={20} color={plan.color} />
              </div>
            )}
            
            <div style={{ textAlign: 'center', marginBottom: '2rem', marginTop: plan.isPopular ? '1rem' : '0' }}>
              <h3 className="text-xl font-bold" style={{ color: plan.color }}>{plan.name}</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', marginTop: '1rem' }}>{plan.price}<span style={{fontSize: '1rem', fontWeight: 'normal', color: 'var(--text-secondary)'}}>/{plan.interval}</span></div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', flex: 1 }}>
              {plan.features.map((feature, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <Shield size={16} color={plan.color} style={{ flexShrink: 0 }} />
                  {feature}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => handleSelect(plan)}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '8px',
                border: 'none',
                background: plan.isPopular ? plan.color : 'rgba(255,255,255,0.05)',
                color: plan.isPopular ? '#000' : 'white',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: plan.isPopular ? 'none' : `1px solid ${plan.color}`
              }}
              onMouseOver={(e) => {
                if (!plan.isPopular) {
                  e.currentTarget.style.background = plan.color;
                  e.currentTarget.style.color = '#000';
                }
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                if (!plan.isPopular) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.color = 'white';
                }
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center align-center gap-2 text-secondary text-sm animate-slide-up delay-5" style={{ marginTop: '4rem' }}>
        <Info size={16} /> Subscription fees are auto-deducted weekly from your gig wallet. Claims are settled instantly via UPI.
      </div>
    </div>
  );
};

export default PlansPage;
