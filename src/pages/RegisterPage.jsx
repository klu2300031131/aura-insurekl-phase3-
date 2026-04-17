import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, Mail, User } from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (register(name, email, password)) {
      navigate('/plans');
    } else {
      setError('Email already exists');
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
      <div className="glow-pulse" style={{
        position: 'absolute', top: '50%', right: '20%', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 60%)',
        filter: 'blur(50px)', zIndex: 0
      }} />

      <div className="glass-card animate-slide-up" style={{ width: '100%', maxWidth: '420px', zIndex: 1, padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Shield size={48} color="var(--accent-violet)" style={{ margin: '0 auto 1rem auto' }} />
          <h1 className="text-2xl font-bold mb-1">Protect Your Gig Income</h1>
          <p className="text-secondary text-sm">Create an account to browse AI parametric plans.</p>
        </div>

        {error && <div style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--accent-red)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.875rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label className="text-sm font-medium text-secondary mb-1" style={{ display: 'block' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--panel-border)', borderRadius: '8px', padding: '0.75rem 1rem 0.75rem 2.5rem', color: 'white', outline: 'none', transition: 'border-color 0.3s' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-violet)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--panel-border)'}
              />
            </div>
          </div>
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
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-violet)'}
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
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-violet)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--panel-border)'}
              />
            </div>
          </div>
          <button type="submit" style={{ marginTop: '1rem', width: '100%', padding: '0.875rem', background: 'var(--accent-violet)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s' }}>
            Register Account
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem' }}>
          <span className="text-secondary">Already have an account? </span>
          <Link to="/login" style={{ color: 'var(--accent-violet)', textDecoration: 'none', fontWeight: '500' }}>Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
