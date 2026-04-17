import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, Mail } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      if (result.hasPlan) {
        navigate('/dashboard');
      } else {
        navigate('/plans');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 80px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Glows */}
      <div className="glow-pulse" style={{
        position: 'absolute', top: '10%', left: '20%', width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
        filter: 'blur(40px)', zIndex: 0
      }} />

      <div className="glass-card animate-slide-up" style={{ width: '100%', maxWidth: '420px', zIndex: 1, padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Shield size={48} color="var(--accent-blue)" style={{ margin: '0 auto 1rem auto' }} />
          <h1 className="text-2xl font-bold mb-1">Welcome Back</h1>
          <p className="text-secondary text-sm">Sign in to your parametric dashboard.</p>
        </div>

        {error && <div style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--accent-red)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.875rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label className="text-sm font-medium text-secondary mb-1" style={{ display: 'block' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--panel-border)', borderRadius: '8px', padding: '0.75rem 1rem 0.75rem 2.5rem', color: 'white', outline: 'none', transition: 'border-color 0.3s' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-blue)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--panel-border)'}
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-secondary mb-1" style={{ display: 'block' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--panel-border)', borderRadius: '8px', padding: '0.75rem 1rem 0.75rem 2.5rem', color: 'white', outline: 'none', transition: 'border-color 0.3s' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-blue)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--panel-border)'}
              />
            </div>
          </div>
          <button type="submit" style={{ marginTop: '1rem', width: '100%', padding: '0.875rem', background: 'var(--accent-blue)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s' }}>
            Login to Dashboard
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem' }}>
          <span className="text-secondary">New gig worker? </span>
          <Link to="/register" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: '500' }}>Create account</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
