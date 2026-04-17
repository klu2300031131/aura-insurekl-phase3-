import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, ChevronRight, Activity, CloudRain, Zap, Cloud, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';
import LiveWeatherWidget from '../components/LiveWeatherWidget';
import StormEffect from '../components/StormEffect';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user, activePlan } = useAuth();

  const handleCTA = () => {
    if (user) {
      if (activePlan) {
        navigate('/dashboard');
      } else {
        navigate('/plans');
      }
    } else {
      navigate('/register');
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Storm Effect Background */}
      <StormEffect />

      {/* Abstract Background Elements */}
      <motion.div 
        animate={{ x: [0, 100, 0], y: [0, -50, 0] }} 
        transition={{ repeat: Infinity, duration: 20 }} 
        style={{ position: 'absolute', top: '15%', left: '8%', opacity: 0.15, zIndex: 0 }}
      >
        <Cloud size={80} color="var(--text-secondary)" />
      </motion.div>
      <motion.div 
        animate={{ x: [0, -80, 0], y: [0, 40, 0] }} 
        transition={{ repeat: Infinity, duration: 25 }} 
        style={{ position: 'absolute', top: '40%', right: '10%', opacity: 0.1, zIndex: 0 }}
      >
        <CloudRain size={100} color="var(--text-secondary)" />
      </motion.div>
      <motion.div 
        animate={{ y: [-20, 100], opacity: [0, 0.5, 0] }} 
        transition={{ repeat: Infinity, duration: 3, delay: 1 }} 
        style={{ position: 'absolute', top: '25%', left: '20%', opacity: 0.2, color: 'var(--accent-blue)', zIndex: 0 }}
      >
        <Droplet size={24} />
      </motion.div>
      
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: 0
        }} 
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{
          position: 'absolute',
          top: '60%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0
        }} 
      />

      {/* Hero Section */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 1, padding: '4rem 2rem' }}
      >
        <motion.div variants={scaleIn} className="flex justify-center" style={{ marginBottom: '2rem' }}>
          <div style={{ 
            background: 'rgba(59, 130, 246, 0.1)', 
            padding: '1rem', 
            borderRadius: '50%',
            border: '1px solid rgba(59, 130, 246, 0.3)'
          }}>
            <Shield size={64} color="var(--accent-blue)" />
          </div>
        </motion.div>

        <motion.h1 variants={fadeInUp} style={{ 
          fontSize: '4.5rem', 
          fontWeight: '800', 
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
          marginBottom: '1.5rem',
          textAlign: 'center',
          maxWidth: '900px',
          background: 'linear-gradient(to bottom right, #ffffff, #9ca3af)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Parametric Protection for the Gig Economy
        </motion.h1>
        
        <motion.p variants={fadeInUp} className="text-secondary" style={{ 
          fontSize: '1.25rem', 
          marginBottom: '3rem',
          maxWidth: '650px',
          textAlign: 'center',
          lineHeight: '1.6'
        }}>
          Zero-click micro-policies powered by AI. We monitor the weather, you keep your earnings. When disruption strikes, payouts are instant.
        </motion.p>

        <motion.div variants={fadeInUp} className="flex justify-center gap-4">
          <motion.button 
            onClick={handleCTA}
            whileHover={{ scale: 1.05, translateY: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '1rem 2rem',
              borderRadius: '9999px',
              border: 'none',
              background: 'var(--accent-blue)',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
              transition: 'background 0.3s ease'
             }}
          >
            Get Protected <ChevronRight size={20} />
          </motion.button>
        </motion.div>

        <motion.div variants={fadeInUp} style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center', width: '100%', zIndex: 10 }}>
          <LiveWeatherWidget />
        </motion.div>

        {/* Hero Stats */}
        <motion.div variants={fadeInUp} className="flex justify-center flex-wrap gap-8" style={{ marginTop: '5rem', borderTop: '1px solid var(--panel-border)', paddingTop: '2rem', width: '100%', maxWidth: '900px' }}>
          <div style={{ textAlign: 'left', minWidth: '150px' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>₹4.2M+</div>
            <div className="text-secondary text-sm">Earnings Protected</div>
          </div>
          <div style={{ width: '1px', background: 'var(--panel-border)', display: 'block' }} className="d-none-mobile" />
          <div style={{ textAlign: 'left', minWidth: '150px' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>12,400</div>
            <div className="text-secondary text-sm">Workers Covered</div>
          </div>
          <div style={{ width: '1px', background: 'var(--panel-border)', display: 'block' }} className="d-none-mobile" />
          <div style={{ textAlign: 'left', minWidth: '150px' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>&lt; 3s</div>
            <div className="text-secondary text-sm">Avg. Payout Time</div>
          </div>
        </motion.div>
        
        {/* Trusted Partners / Platforms */}
        <motion.div variants={fadeInUp} style={{ marginTop: '4rem', textAlign: 'center' }}>
           <p className="text-secondary text-sm mb-4" style={{ textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Trusted by gig workers operating on</p>
           <div className="flex justify-center flex-wrap gap-4">
              {['Zomato', 'Swiggy', 'Zepto', 'Blinkit', 'Uber Eats'].map((partner) => (
                <motion.span 
                  key={partner}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  style={{ padding: '0.5rem 1.25rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid var(--panel-border)', fontWeight: 'bold', color: 'var(--text-secondary)', transition: 'background-color 0.2s ease' }}
                >
                  {partner}
                </motion.span>
              ))}
           </div>
        </motion.div>
      </motion.div>

      {/* How It Works Section */}
      <div style={{ background: 'rgba(25, 25, 30, 0.4)', borderTop: '1px solid var(--panel-border)', padding: '6rem 2rem', position: 'relative', zIndex: 1 }}>
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          style={{ maxWidth: '1200px', margin: '0 auto' }}
        >
          <motion.div variants={fadeInUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="text-3xl font-bold mb-2">How Aura-InsureKL Works</h2>
            <p className="text-secondary text-lg max-w-2xl" style={{ margin: '0 auto' }}>A fully automated lifecycle that verifies disruption and executes smart contracts without human intervention.</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            <motion.div variants={fadeInUp} whileHover={{ y: -10 }} className="glass-card" style={{ padding: '2.5rem', transition: 'box-shadow 0.3s ease' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(59,130,246,0.3)' }}>
                <CloudRain size={24} color="var(--accent-blue)" />
              </div>
              <h3 className="text-xl font-bold mb-1">1. Atmospheric Monitoring</h3>
              <p className="text-secondary" style={{ lineHeight: '1.6' }}>Our APIs continuously track hyper-local weather conditions in your active delivery zones.</p>
            </motion.div>

            <motion.div variants={fadeInUp} whileHover={{ y: -10 }} className="glass-card" style={{ padding: '2.5rem', transition: 'box-shadow 0.3s ease' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(245,158,11,0.3)' }}>
                <Activity size={24} color="var(--accent-yellow)" />
              </div>
              <h3 className="text-xl font-bold mb-1">2. Disruption Verification</h3>
              <p className="text-secondary" style={{ lineHeight: '1.6' }}>If rain exceeds the threshold, the AI verifies correlated order volume drops to confirm income impact.</p>
            </motion.div>

            <motion.div variants={fadeInUp} whileHover={{ y: -10 }} className="glass-card" style={{ padding: '2.5rem', transition: 'box-shadow 0.3s ease' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(16,185,129,0.3)' }}>
                <Zap size={24} color="var(--accent-green)" />
              </div>
              <h3 className="text-xl font-bold mb-1">3. Zero-Click Smart Payout</h3>
              <p className="text-secondary" style={{ lineHeight: '1.6' }}>Once verified, the smart contract instantly deposits the claim amount directly to your linked UPI ID. No paperwork.</p>
            </motion.div>

          </div>
        </motion.div>
      </div>

      {/* Why Choose Us Section */}
      <div style={{ padding: '6rem 2rem', position: 'relative', zIndex: 1, borderTop: '1px solid var(--panel-border)' }}>
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          style={{ maxWidth: '1200px', margin: '0 auto' }}
        >
          <motion.div variants={fadeInUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="text-3xl font-bold mb-2">Why Aura-InsureKL?</h2>
            <p className="text-secondary text-lg max-w-2xl" style={{ margin: '0 auto' }}>Building the future of equitable gig-worker insurance.</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <motion.div variants={fadeInUp} whileHover={{ scale: 1.02 }} style={{ padding: '2rem', borderLeft: '2px solid var(--accent-blue)', background: 'linear-gradient(90deg, rgba(59,130,246,0.05) 0%, transparent 100%)', borderRadius: '0 12px 12px 0' }}>
              <div className="font-bold text-xl mb-2">0 Paperwork</div>
              <p className="text-secondary">No physical forms, no endless phone calls with adjusters. Everything is handled digitally via your linked mobile number and UPI.</p>
            </motion.div>
            <motion.div variants={fadeInUp} whileHover={{ scale: 1.02 }} style={{ padding: '2rem', borderLeft: '2px solid var(--accent-green)', background: 'linear-gradient(90deg, rgba(16,185,129,0.05) 0%, transparent 100%)', borderRadius: '0 12px 12px 0' }}>
              <div className="font-bold text-xl mb-2">Fraud-Resistant AI</div>
              <p className="text-secondary">Our built-in AI vision engine detects fake images and fraudulent claims instantly, ensuring the system remains affordable for honest drivers.</p>
            </motion.div>
            <motion.div variants={fadeInUp} whileHover={{ scale: 1.02 }} style={{ padding: '2rem', borderLeft: '2px solid var(--accent-violet)', background: 'linear-gradient(90deg, rgba(139,92,246,0.05) 0%, transparent 100%)', borderRadius: '0 12px 12px 0' }}>
              <div className="font-bold text-xl mb-2">Dynamic Risk Pricing</div>
              <p className="text-secondary">Premiums scale with your city. Pay less when you work in safe, temperate zones. True coverage that adapts to your environment.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <div style={{ background: 'rgba(25, 25, 30, 0.4)', padding: '6rem 2rem', position: 'relative', zIndex: 1, borderTop: '1px solid var(--panel-border)' }}>
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <motion.div variants={fadeInUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <motion.div variants={fadeInUp} whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.05)' }} className="glass-card" style={{ padding: '1.5rem', cursor: 'pointer', transition: 'background-color 0.2s ease' }}>
               <h4 className="font-bold text-lg mb-2">What does "Parametric" mean?</h4>
               <p className="text-secondary">Parametric insurance doesn't indemnify the pure loss, but rather issues a fixed payout upon the occurrence of a specific preset event (like a major flood or curfew in your current GPS zone).</p>
            </motion.div>
            <motion.div variants={fadeInUp} whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.05)' }} className="glass-card" style={{ padding: '1.5rem', cursor: 'pointer', transition: 'background-color 0.2s ease' }}>
               <h4 className="font-bold text-lg mb-2">How fast do I get my money?</h4>
               <p className="text-secondary">Our smart contracts execute in under 3 seconds after a disruption threshold is verified. The IMPS UPI network typically reflects the funds in your bank account immediately.</p>
            </motion.div>
            <motion.div variants={fadeInUp} whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.05)' }} className="glass-card" style={{ padding: '1.5rem', cursor: 'pointer', transition: 'background-color 0.2s ease' }}>
               <h4 className="font-bold text-lg mb-2">Do I need to submit photos?</h4>
               <p className="text-secondary">Usually, no. The auto-claim system triggers off API weather data. However, if the API misses a local event (like a hyper-local street flood), you can use our Dispute system to snap a live camera proof.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
