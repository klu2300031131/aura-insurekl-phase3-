import React, { useState } from 'react';
import { Camera, AlertTriangle, Send, X, Upload, ScanLine, ShieldAlert, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DisputeModal = ({ onClose, weatherContext = 'Unknown' }) => {
  const navigate = useNavigate();
  const { addClaim } = useAuth();
  const [step, setStep] = useState('input'); // input, scanning, result
  const [resultType, setResultType] = useState(null); // 'pass', 'fail'
  
  const fileInputRef = React.useRef(null);
  const cameraInputRef = React.useRef(null);

  const handleCaptureLive = () => {
    if (cameraInputRef.current) cameraInputRef.current.click();
  };

  const handleUploadGallery = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const onCameraFileSelected = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      startScan('pass');
    }
  }

  const onGalleryFileSelected = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      startScan('fail');
    }
  }

  const startScan = (type) => {
    setStep('scanning');
    
    // Simulate AI Vision API processing time
    setTimeout(() => {
      setResultType(type);
      setStep('result');
      
      // If pass, redirect to payout after a delay
      if (type === 'pass') {
        setTimeout(() => {
          navigate('/upi');
        }, 3000);
      } else {
        // Log Fraud Penalty in History
        const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        
        addClaim({
           id: `FRD-${Math.floor(Math.random() * 90000) + 10000}`,
           date: today,
           amount: '₹0',
           status: 'denied',
           reason: `Dispute Denied during ${weatherContext}`,
           transactionId: `REJECTED-${Math.floor(Math.random() * 9000)}`,
           disputeStatus: 'Dispute Denied (Fraud Detected)',
           timeToProcess: 'N/A'
        });
      }
      
    }, 4000);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(10px)' }}>
      <div className="glass-card animate-scale-in" style={{ width: '100%', maxWidth: '550px', borderTop: step === 'result' ? (resultType === 'pass' ? '4px solid var(--accent-green)' : '4px solid var(--accent-red)') : '4px solid var(--accent-yellow)', position: 'relative', overflow: 'hidden' }}>
        
        {step !== 'scanning' && (
          <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', zIndex: 10 }}>
            <X size={20} />
          </button>
        )}

        {/* STEP 1: INPUT */}
        {step === 'input' && (
          <div style={{ padding: '2.5rem 2rem' }}>
            <h2 className="text-2xl font-bold mb-2 flex align-center gap-2">
              <AlertTriangle color="var(--accent-yellow)" /> Dispute AI Assessment
            </h2>
            <p className="text-sm text-secondary mb-6">If the weather API is wrong, you can force a manual override by providing photographic evidence. Our AI Vision system will verify the claim.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label className="text-sm font-medium text-secondary mb-1" style={{ display: 'block' }}>Describe the micro-weather (e.g. Flash flood on Street 4)</label>
                <textarea 
                  required
                  rows={2}
                  style={{ width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--panel-border)', borderRadius: '8px', padding: '1rem', color: 'white', outline: 'none', resize: 'none' }}
                  placeholder="Waterlogging prevents delivery..."
                />
              </div>

              <div>
                <label className="text-sm font-medium text-secondary mb-3" style={{ display: 'block' }}>Provide Visual Evidence</label>
                
                {/* Hidden Real Device File Inputs */}
                <input type="file" ref={cameraInputRef} accept="image/*" capture="environment" style={{ display: 'none' }} onChange={onCameraFileSelected} />
                <input type="file" ref={fileInputRef} accept="image/*" style={{ display: 'none' }} onChange={onGalleryFileSelected} />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div 
                      onClick={handleCaptureLive}
                      style={{ border: '1px solid var(--accent-blue)', borderRadius: '8px', padding: '1.5rem', textAlign: 'center', cursor: 'pointer', background: 'rgba(59, 130, 246, 0.05)', transition: 'all 0.3s' }} 
                      className="flex flex-col align-center justify-center gap-2 hover-bg-blue"
                    >
                      <Camera size={32} color="var(--accent-blue)" />
                      <span className="text-sm font-bold text-blue">Capture Live Photo</span>
                      <span className="text-xs text-secondary">GPS & Timestamp Embedded</span>
                    </div>

                    <div 
                      onClick={handleUploadGallery}
                      style={{ border: '1px solid var(--panel-border)', borderRadius: '8px', padding: '1.5rem', textAlign: 'center', cursor: 'pointer', background: 'rgba(255, 255, 255, 0.02)', transition: 'all 0.3s' }} 
                      className="flex flex-col align-center justify-center gap-2 hover-bg-gray"
                    >
                      <Upload size={32} color="var(--text-secondary)" />
                      <span className="text-sm font-bold text-secondary">Upload from Gallery</span>
                      <span className="text-xs text-secondary">JPG, PNG, HEIC</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: AI SCANNING */}
        {step === 'scanning' && (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            
            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 2rem auto' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, border: '2px solid var(--accent-blue)', borderRadius: '12px', opacity: 0.2 }}></div>
              <ScanLine size={64} color="var(--accent-blue)" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }} className="pulse-slow" />
              
              {/* Scanning Laser Line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--accent-blue)',
                boxShadow: '0 0 10px 2px rgba(59, 130, 246, 0.8)',
                animation: 'scanLaser 2s linear infinite'
              }}></div>
            </div>

            <h2 className="text-2xl font-bold mb-2">Aura-InsureKL Vision Engine</h2>
            
            <div style={{ textAlign: 'left', background: 'rgba(0,0,0,0.5)', padding: '1.5rem', borderRadius: '8px', width: '100%', maxWidth: '350px', border: '1px dashed var(--accent-blue)' }}>
              <div className="text-xs font-mono text-secondary mb-1">Checking EXIF Metadata...</div>
              <div className="text-xs font-mono text-secondary mb-1" style={{ animationDelay: '0.5s' }}>Running Pixel-Level Forgery Detection...</div>
              <div className="text-xs font-mono text-secondary mb-1" style={{ animationDelay: '1.5s' }}>Cross-referencing shadows with solar azimuth...</div>
              <div className="text-xs font-mono text-blue font-bold mt-2" style={{ animationDelay: '2.5s' }}>Extracting weather severity parameters...</div>
            </div>
          </div>
        )}

        {/* STEP 3: RESULT */}
        {step === 'result' && (
           <div style={{ padding: '3rem 2rem', textAlign: 'center' }} className="animate-scale-in">
              {resultType === 'pass' ? (
                <>
                  <div className="glow-pulse" style={{ background: 'rgba(16,185,129,0.1)', padding: '1.5rem', borderRadius: '50%', display: 'inline-block', marginBottom: '1.5rem' }}>
                    <CheckCircle size={64} color="var(--accent-green)" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-green">Evidence Verified</h2>
                  <p className="text-secondary mb-6">Live photo successfully confirms severe waterlogging at your GPS coordinates. AI API mismatch recorded.</p>
                  
                  <div style={{ padding: '1rem', background: 'rgba(16,185,129,0.1)', border: '1px solid var(--accent-green)', borderRadius: '8px', color: 'white', fontWeight: 'bold' }}>
                    Initiating Smart Contract Override...
                  </div>
                </>
              ) : (
                <>
                  <div style={{ background: 'rgba(239,68,68,0.1)', padding: '1.5rem', borderRadius: '50%', display: 'inline-block', marginBottom: '1.5rem' }}>
                    <ShieldAlert size={64} color="var(--accent-red)" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-red">FRAUD DETECTED</h2>
                  <p className="text-secondary mb-6">Our Vision Model detected manipulated pixels, missing EXIF geolocation metadata, and generic internet stock-image signatures in the uploaded file.</p>
                  
                  <div style={{ padding: '1.5rem', background: 'rgba(239,68,68,0.1)', border: '1px solid var(--accent-red)', borderRadius: '8px', color: 'white', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div className="font-bold text-red" style={{ fontSize: '1.2rem' }}>PENALTY APPLIED</div>
                    <div className="text-sm">Trust Score severely impacted. Repeat fraud attempts will result in permanent Guild ban.</div>
                    <button onClick={onClose} style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--accent-red)', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Acknowledge Warning</button>
                  </div>
                </>
              )}
           </div>
        )}

      </div>
      
      <style>{`
        @keyframes scanLaser {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .hover-bg-blue:hover { background: rgba(59, 130, 246, 0.15) !important; transform: translateY(-2px); }
        .hover-bg-gray:hover { background: rgba(255, 255, 255, 0.08) !important; transform: translateY(-2px); }
      `}</style>
    </div>
  );
};
export default DisputeModal;
