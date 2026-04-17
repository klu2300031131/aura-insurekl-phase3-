import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import MetricCard from '../components/MetricCard';
import { Cpu, Network, RadioReceiver, BrainCircuit, Activity, LineChart } from 'lucide-react';
import './AnalyticsPage.css';

const AnalyticsPage = () => {
  const [dataFlow, setDataFlow] = useState([0, 0, 0, 0]);

  // Simulate incoming API data streams
  useEffect(() => {
    const interval = setInterval(() => {
      setDataFlow([
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100)
      ]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <div className="header animate-slide-up" style={{ gridColumn: 'span 12' }}>
        <div className="header-title-container">
          <div className="flex gap-4 align-center mb-1">
            <h1 className="text-3xl font-bold">Aura-InsureKL AI Engine</h1>
            <span className="badge" style={{ borderColor: 'var(--accent-violet)', color: 'var(--accent-violet)', background: 'rgba(139, 92, 246, 0.1)' }}>v4.2.1 • Deep Neural Model</span>
          </div>
          <p className="text-secondary" style={{ marginTop: '0.5rem' }}>See exactly how the parametric inference engine calculates your risk and executes claims in real-time.</p>
        </div>
      </div>

      {/* Main Visualizer */}
      <div className="glass-card animate-slide-up delay-1" style={{ gridColumn: 'span 12', padding: '3rem 2rem', position: 'relative', overflow: 'hidden', minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Background Network Graphic */}
        <div className="network-bg glow-pulse" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', gap: '2rem', alignItems: 'center', width: '100%', maxWidth: '900px', zIndex: 1 }}>
          
          {/* Inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="data-node">
              <RadioReceiver size={20} color="var(--accent-blue)" />
              <div>
                <div className="text-xs text-secondary">Weather APIs</div>
                <div className="font-bold">AWS OpenData</div>
                <div className="text-xs text-blue">Latency: {dataFlow[0]}ms</div>
              </div>
            </div>
            <div className="data-node">
              <Activity size={20} color="var(--accent-cyan)" />
              <div>
                <div className="text-xs text-secondary">Order Volume Data</div>
                <div className="font-bold">Aggregator Hooks</div>
                <div className="text-xs text-cyan">Syncing... {dataFlow[1]}%</div>
              </div>
            </div>
          </div>

          {/* Connection Line */}
          <div className="data-stream">
            <div className="stream-particle" />
          </div>

          {/* The AI Brain Core */}
          <div style={{ 
            background: 'rgba(0,0,0,0.8)', 
            border: '2px solid var(--accent-violet)', 
            padding: '2rem', 
            borderRadius: '50%',
            position: 'relative',
            boxShadow: '0 0 40px rgba(139, 92, 246, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '160px',
            height: '160px'
          }}>
            <BrainCircuit size={48} color="var(--accent-violet)" className="pulse-slow" />
            <div style={{ position: 'absolute', bottom: '-2rem', whiteSpace: 'nowrap', fontWeight: 'bold' }}>Core Inference</div>
          </div>

          {/* Connection Line */}
          <div className="data-stream">
            <div className="stream-particle" style={{ animationDelay: '0.7s'}} />
          </div>

          {/* Outputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="data-node">
              <LineChart size={20} color="var(--accent-yellow)" />
              <div>
                <div className="text-xs text-secondary">Risk Score Output</div>
                <div className="font-bold">DynamoDB Ledger</div>
                <div className="text-xs text-yellow">Updated {dataFlow[2]}s ago</div>
              </div>
            </div>
            <div className="data-node">
              <Cpu size={20} color="var(--accent-green)" />
              <div>
                <div className="text-xs text-secondary">Smart Contract</div>
                <div className="font-bold">Polygon Network</div>
                <div className="text-xs text-green">Gas: {dataFlow[3]} Gwei</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Explanation Cards */}
      <MetricCard title="Rainfall Parametric Truth Table" icon={<RadioReceiver />} delay={3} style={{ gridColumn: 'span 6' }}>
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px' }}>
          <p className="text-secondary text-sm mb-3">The model uses an exact truth-table to ensure zero human bias in claim payouts. If conditions evaluate to true, the contract executes.</p>
          <div className="flex justify-between py-2" style={{ borderBottom: '1px solid var(--panel-border)' }}>
            <span className="text-secondary">Condition A</span>
            <span className="font-mono text-sm">Precipitation &gt; 15mm/hr</span>
          </div>
          <div className="flex justify-between py-2" style={{ borderBottom: '1px solid var(--panel-border)' }}>
            <span className="text-secondary">Condition B</span>
            <span className="font-mono text-sm">Worker Active = TRUE</span>
          </div>
          <div className="flex justify-between py-2" style={{ borderBottom: '1px solid var(--panel-border)' }}>
            <span className="text-secondary">Condition C</span>
            <span className="font-mono text-sm">Zone Orders Drop &gt; 30%</span>
          </div>
          <div className="flex justify-between py-2 mt-2">
            <span className="font-bold" style={{ color: 'var(--accent-violet)' }}>Execution Trigger</span>
            <span className="font-mono font-bold text-sm">A && B && C</span>
          </div>
        </div>
      </MetricCard>

      <MetricCard title="Fraud & Spoofing Defense" icon={<Network />} delay={4} style={{ gridColumn: 'span 6' }}>
         <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', height: '100%' }}>
            <div className="flex align-center gap-3 mb-4">
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-green)' }} className="glow-pulse" />
              <div className="font-bold">GPS Spoofing Check: PASSED</div>
            </div>
            <p className="text-secondary text-sm">When a claim triggers, the system cross-references device telemetry against cell tower triangulation to ensure the worker is actually in the risk zone. This happens in under <span style={{ color: 'white', fontWeight: 'bold' }}>120ms</span>.</p>
            
            <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px dashed var(--accent-blue)', borderRadius: '8px', background: 'rgba(59,130,246,0.05)' }}>
               <div className="text-xs text-blue font-mono mb-1">LOG STREAM:</div>
               <div className="text-xs text-secondary font-mono">Comparing lat/lng diff... OK.</div>
               <div className="text-xs text-secondary font-mono">Validating ping frequency... OK.</div>
               <div className="text-xs text-secondary font-mono">No mock-location API detected... OK.</div>
            </div>
         </div>
      </MetricCard>

    </DashboardLayout>
  );
};

export default AnalyticsPage;
