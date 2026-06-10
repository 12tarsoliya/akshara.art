import React, { useState, useEffect } from 'react';
import { Upload, Sparkles, Copy, Check, Eye, FileText, Megaphone, DollarSign, Share2, Mail } from 'lucide-react';
import { addPainting } from '../data/paintings';
import { runGalleryManagerWorkflow } from '../data/artistAssistantEngine';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  
  // Dashboard Workspace Tabs & Commissions Inbox States
  const [activeTab, setActiveTab] = useState('gallery');
  const [commissions, setCommissions] = useState([]);
  const [copyEmailSuccess, setCopyEmailSuccess] = useState(null);

  // Multi-step AI Workflow States
  const [workflowData, setWorkflowData] = useState(null);
  const [workflowStep, setWorkflowStep] = useState(0); // 0: Idle, 1-5: Running Steps
  const [isWorkflowRunning, setIsWorkflowRunning] = useState(false);
  const [expandedWorkflowStep, setExpandedWorkflowStep] = useState(1);
  const [copySuccess, setCopySuccess] = useState(false);
  const [copyNewsletterSuccess, setCopyNewsletterSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    medium: '',
    dimensions: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c03fa37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // default placeholder
    concept: '',
    tags: '',
    seoKeywords: '',
    instagramCaption: ''
  });

  // Load commissions on component mount
  useEffect(() => {
    const saved = localStorage.getItem('akshara_commissions');
    if (saved) {
      setCommissions(JSON.parse(saved));
    }
  }, []);

  const handleCopyClientEmail = (email, id) => {
    navigator.clipboard.writeText(email);
    setCopyEmailSuccess(id);
    setTimeout(() => setCopyEmailSuccess(null), 2000);
  };

  const handleResolveCommission = (id) => {
    const updated = commissions.filter(c => c.id !== id);
    setCommissions(updated);
    localStorage.setItem('akshara_commissions', JSON.stringify(updated));
    alert('Commission marked as completed and resolved!');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'komalaksharamahadevbabaye') { // New password set by user
      setIsAuthenticated(true);
    } else {
      alert('Incorrect Password!');
    }
  };

  const handleRunWorkflow = () => {
    if (!formData.medium || !formData.dimensions || !formData.concept) {
      alert("Please fill in Medium, Dimensions, and Rough Concept first so the AI can analyze your artwork!");
      return;
    }

    setIsWorkflowRunning(true);
    setWorkflowStep(1);
    setWorkflowData(null);
    setExpandedWorkflowStep(1);

    // Step 1: Analyze Artwork (800ms)
    setTimeout(() => {
      setWorkflowStep(2);
      setExpandedWorkflowStep(2);
      
      // Step 2: Generate Metadata (800ms)
      setTimeout(() => {
        setWorkflowStep(3);
        setExpandedWorkflowStep(3);
        
        // Step 3: Create Marketing Content (800ms)
        setTimeout(() => {
          setWorkflowStep(4);
          setExpandedWorkflowStep(4);
          
          // Step 4: Suggest Pricing (800ms)
          setTimeout(() => {
            setWorkflowStep(5);
            setExpandedWorkflowStep(5);
            
            // Step 5: Social Media Post Draft (800ms)
            setTimeout(() => {
              try {
                const results = runGalleryManagerWorkflow({
                  concept: formData.concept,
                  medium: formData.medium,
                  dimensions: formData.dimensions
                });
                
                setWorkflowData(results);
                
                // Auto-fill standard editable fields in the form
                setFormData(prev => ({
                  ...prev,
                  title: results.metadata.title,
                  price: results.pricingMath.finalRounded,
                  description: results.metadata.description,
                  tags: results.metadata.tags,
                  seoKeywords: results.metadata.seoKeywords,
                  instagramCaption: results.metadata.instagramCaption
                }));
                
                setExpandedWorkflowStep(1); // expand step 1 for review
              } catch (error) {
                alert("Error running gallery manager workflow: " + error.message);
              } finally {
                setIsWorkflowRunning(false);
              }
            }, 800);
          }, 800);
        }, 800);
      }, 800);
    }, 800);
  };

  const handleCopyCaption = () => {
    if (formData.instagramCaption) {
      navigator.clipboard.writeText(formData.instagramCaption);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleCopyNewsletter = (text) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopyNewsletterSuccess(true);
      setTimeout(() => setCopyNewsletterSuccess(false), 2000);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          let scaleSize = 1;
          if (img.width > MAX_WIDTH) {
            scaleSize = MAX_WIDTH / img.width;
          }
          canvas.width = img.width * scaleSize;
          canvas.height = img.height * scaleSize;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Compress to JPEG to save space in localStorage
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setFormData({ ...formData, image: compressedDataUrl });
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      addPainting(formData);
      alert('Painting published to the gallery successfully!');
      setFormData({
        title: '',
        price: '',
        medium: '',
        dimensions: '',
        description: '',
        image: 'https://images.unsplash.com/photo-1578301978693-85fa9c03fa37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        concept: '',
        tags: '',
        seoKeywords: '',
        instagramCaption: ''
      });
      setWorkflowStep(0);
      setWorkflowData(null);
    } catch (error) {
      alert("Error saving painting (Image might still be too large): " + error.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-container container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <form onSubmit={handleLogin} className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Artist Login</h2>
          <input 
            type="password" 
            placeholder="Enter Password" 
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            style={{ padding: '0.5rem', marginTop: '1rem', marginBottom: '1rem', width: '100%' }}
          />
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-container container">
      <div className="admin-header">
        <h1 className="admin-title">Artist Portal</h1>
        <p className="admin-subtitle">Manage your gallery collection and custom client inquiries.</p>
      </div>

      <div className="admin-tabs-row">
        <button 
          className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
          onClick={() => setActiveTab('gallery')}
        >
          Upload Artwork
        </button>
        <button 
          className={`tab-btn ${activeTab === 'commissions' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('commissions');
            const saved = localStorage.getItem('akshara_commissions');
            if (saved) setCommissions(JSON.parse(saved));
          }}
        >
          Commission Inbox ({commissions.length})
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'gallery' ? (
          <div className="upload-section glass-panel">
            <h2>Upload New Piece</h2>
            
            <form className="upload-form" onSubmit={handleSubmit}>
              <div className="image-upload-area">
                <Upload size={40} className="upload-icon" />
                <p>Click below to upload your painting photo</p>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  className="file-input"
                />
                {formData.image && formData.image !== 'https://images.unsplash.com/photo-1578301978693-85fa9c03fa37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' && (
                  <p style={{ color: '#22c55e', marginTop: '0.5rem' }}>Image Selected Successfully!</p>
                )}
              </div>

              {/* AI Gallery Manager Multi-Step Workflow */}
              <div className="ai-assistant-section glass-panel">
                <div className="ai-assistant-header">
                  <Sparkles className="sparkle-icon" size={18} />
                  <h3>AI Gallery Manager</h3>
                </div>
                <p className="ai-assistant-desc">
                  Fill in the <strong>Medium</strong>, <strong>Dimensions</strong>, and a <strong>Rough Concept / Notes</strong> below, then click to trigger the multi-step curation and marketing workflow.
                </p>
                
                <div className="form-group">
                  <label>Rough Concept / Artwork Notes</label>
                  <textarea 
                    rows="2"
                    value={formData.concept}
                    onChange={e => setFormData({...formData, concept: e.target.value})}
                    placeholder="e.g. sunset landscape, oil canvas, tranquil lake, red and gold hues"
                  ></textarea>
                </div>

                <button 
                  type="button" 
                  className="ai-generate-btn workflow-start-btn"
                  onClick={handleRunWorkflow}
                  disabled={isWorkflowRunning || !formData.medium || !formData.dimensions || !formData.concept}
                >
                  {isWorkflowRunning ? (
                    <span>Workflow Running... Step {workflowStep}/5</span>
                  ) : (
                    <>
                      <Sparkles size={14} /> Start AI Gallery Manager Workflow
                    </>
                  )}
                </button>

                {/* Stepper Timeline UI */}
                {workflowStep > 0 && (
                  <div className="workflow-stepper">
                    {/* Step 1: Analysis */}
                    <div className={`stepper-item ${workflowStep >= 1 ? 'active' : ''} ${workflowData ? 'completed' : ''}`}>
                      <div className="stepper-header" onClick={() => workflowData && setExpandedWorkflowStep(1)}>
                        <div className="stepper-icon-circle">
                          {workflowStep === 1 && !workflowData ? (
                            <div className="spinner-loader-small"></div>
                          ) : workflowStep > 1 || workflowData ? (
                            <Check size={12} />
                          ) : (
                            <Eye size={12} />
                          )}
                        </div>
                        <div className="stepper-title-row">
                          <h4>Step 1: Artwork Analysis</h4>
                          <span className="stepper-status-text">
                            {workflowStep === 1 && !workflowData ? 'Analyzing tones...' : (workflowStep > 1 || workflowData ? 'Completed' : 'Pending')}
                          </span>
                        </div>
                      </div>
                      {expandedWorkflowStep === 1 && workflowData && (
                        <div className="stepper-content-panel animate-fade-in">
                          <div className="analysis-summary">
                            <p><strong>Detected Mood:</strong> <span className="text-accent">{workflowData.analysis.detectedMood}</span></p>
                            <p><strong>Contrast Level:</strong> {workflowData.analysis.contrastLevel}</p>
                            <p><strong>Composition Style:</strong> {workflowData.analysis.composition}</p>
                            
                            <div className="palette-container">
                              <h5>Simulated Color Palette:</h5>
                              <div className="palette-swatches">
                                {workflowData.analysis.colors.map((c, i) => (
                                  <div key={i} className="swatch-item">
                                    <div className="swatch-color" style={{ backgroundColor: c.hex }}></div>
                                    <div className="swatch-details">
                                      <span className="swatch-name">{c.name}</span>
                                      <span className="swatch-pct">{c.percentage}%</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Step 2: Metadata */}
                    <div className={`stepper-item ${workflowStep >= 2 ? 'active' : ''} ${workflowStep > 2 || (workflowData && workflowStep === 5) || workflowData ? 'completed' : ''}`}>
                      <div className="stepper-header" onClick={() => workflowData && setExpandedWorkflowStep(2)}>
                        <div className="stepper-icon-circle">
                          {workflowStep === 2 && !workflowData ? (
                            <div className="spinner-loader-small"></div>
                          ) : workflowStep > 2 || workflowData ? (
                            <Check size={12} />
                          ) : (
                            <FileText size={12} />
                          )}
                        </div>
                        <div className="stepper-title-row">
                          <h4>Step 2: Metadata Generation</h4>
                          <span className="stepper-status-text">
                            {workflowStep === 2 && !workflowData ? 'Formulating metadata...' : (workflowStep > 2 || workflowData ? 'Completed' : 'Pending')}
                          </span>
                        </div>
                      </div>
                      {expandedWorkflowStep === 2 && workflowData && (
                        <div className="stepper-content-panel animate-fade-in">
                          <div className="metadata-summary">
                            <p><strong>Suggested Title:</strong> "{workflowData.metadata.title}"</p>
                            <p><strong>Generated Tags:</strong> <span className="text-accent">{workflowData.metadata.tags}</span></p>
                            <p><strong>SEO Keywords:</strong> {workflowData.metadata.seoKeywords}</p>
                            <div className="brochure-box">
                              <h5>Description Draft:</h5>
                              <p style={{ whiteSpace: 'pre-line', fontSize: '0.85rem' }}>{workflowData.metadata.description}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Step 3: Marketing */}
                    <div className={`stepper-item ${workflowStep >= 3 ? 'active' : ''} ${workflowStep > 3 || workflowData ? 'completed' : ''}`}>
                      <div className="stepper-header" onClick={() => workflowData && setExpandedWorkflowStep(3)}>
                        <div className="stepper-icon-circle">
                          {workflowStep === 3 && !workflowData ? (
                            <div className="spinner-loader-small"></div>
                          ) : workflowStep > 3 || workflowData ? (
                            <Check size={12} />
                          ) : (
                            <Megaphone size={12} />
                          )}
                        </div>
                        <div className="stepper-title-row">
                          <h4>Step 3: Marketing Copywriting</h4>
                          <span className="stepper-status-text">
                            {workflowStep === 3 && !workflowData ? 'Drafting copy...' : (workflowStep > 3 || workflowData ? 'Completed' : 'Pending')}
                          </span>
                        </div>
                      </div>
                      {expandedWorkflowStep === 3 && workflowData && (
                        <div className="stepper-content-panel animate-fade-in">
                          <div className="marketing-summary">
                            <p><strong>Target Audience:</strong> {workflowData.marketing.targetAudience}</p>
                            <p><strong>Collector's Hook:</strong> <em>"{workflowData.marketing.collectorHook}"</em></p>
                            
                            <div className="brochure-box">
                              <div className="box-header-row">
                                <h5>Brochure / Newsletter Draft</h5>
                                <button
                                  type="button"
                                  className="copy-caption-btn"
                                  onClick={() => handleCopyNewsletter(workflowData.marketing.newsletterDraft)}
                                >
                                  {copyNewsletterSuccess ? <Check size={12} style={{ color: '#22c55e' }} /> : <Copy size={12} />}
                                  <span>{copyNewsletterSuccess ? 'Copied!' : 'Copy'}</span>
                                </button>
                              </div>
                              <pre className="pre-brochure">{workflowData.marketing.newsletterDraft}</pre>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Step 4: Pricing */}
                    <div className={`stepper-item ${workflowStep >= 4 ? 'active' : ''} ${workflowStep > 4 || workflowData ? 'completed' : ''}`}>
                      <div className="stepper-header" onClick={() => workflowData && setExpandedWorkflowStep(4)}>
                        <div className="stepper-icon-circle">
                          {workflowStep === 4 && !workflowData ? (
                            <div className="spinner-loader-small"></div>
                          ) : workflowStep > 4 || workflowData ? (
                            <Check size={12} />
                          ) : (
                            <DollarSign size={12} />
                          )}
                        </div>
                        <div className="stepper-title-row">
                          <h4>Step 4: Suggested Pricing Math</h4>
                          <span className="stepper-status-text">
                            {workflowStep === 4 && !workflowData ? 'Calculating costs...' : (workflowStep > 4 || workflowData ? 'Completed' : 'Pending')}
                          </span>
                        </div>
                      </div>
                      {expandedWorkflowStep === 4 && workflowData && (
                        <div className="stepper-content-panel animate-fade-in">
                          <div className="pricing-math-card">
                            <div className="pricing-grid-list">
                              <div className="pricing-item-row">
                                <span>Canvas Area:</span>
                                <strong>{workflowData.pricingMath.areaSqIn} sq. inches</strong>
                              </div>
                              <div className="pricing-item-row">
                                <span>Base Medium Cost ({formData.medium}):</span>
                                <span>₹{workflowData.pricingMath.baseFee}</span>
                              </div>
                              <div className="pricing-item-row">
                                <span>Square-Inch Rate:</span>
                                <span>₹{workflowData.pricingMath.ratePerSqIn} / sq. in</span>
                              </div>
                              <div className="pricing-item-row border-top">
                                <span>Estimated Material & Labor:</span>
                                <span>₹{workflowData.pricingMath.areaCost}</span>
                              </div>
                              <div className="pricing-item-row border-top highlight">
                                <span>Suggested List Price:</span>
                                <strong className="text-accent">₹{workflowData.pricingMath.finalRounded.toLocaleString('en-IN')}</strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Step 5: Social Draft */}
                    <div className={`stepper-item ${workflowStep === 5 ? 'active' : ''} ${workflowData ? 'completed' : ''}`}>
                      <div className="stepper-header" onClick={() => workflowData && setExpandedWorkflowStep(5)}>
                        <div className="stepper-icon-circle">
                          {workflowStep === 5 && !workflowData ? (
                            <div className="spinner-loader-small"></div>
                          ) : workflowData ? (
                            <Check size={12} />
                          ) : (
                            <Share2 size={12} />
                          )}
                        </div>
                        <div className="stepper-title-row">
                          <h4>Step 5: Instagram Social Draft</h4>
                          <span className="stepper-status-text">
                            {workflowStep === 5 && !workflowData ? 'Drafting caption...' : (workflowData ? 'Completed' : 'Pending')}
                          </span>
                        </div>
                      </div>
                      {expandedWorkflowStep === 5 && workflowData && (
                        <div className="stepper-content-panel animate-fade-in">
                          <div className="social-summary">
                            <div className="box-header-row">
                              <h5>Instagram Caption Draft</h5>
                              <button
                                type="button"
                                className="copy-caption-btn"
                                onClick={handleCopyCaption}
                              >
                                {copySuccess ? <Check size={12} style={{ color: '#22c55e' }} /> : <Copy size={12} />}
                                <span>{copySuccess ? 'Copied!' : 'Copy Post'}</span>
                              </button>
                            </div>
                            <pre className="pre-social">{workflowData.metadata.instagramCaption}</pre>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {workflowData && (
                  <div className="workflow-sync-notice animate-fade-in">
                    <Check size={14} style={{ color: '#22c55e' }} />
                    <span>All generated metadata and suggestions have been synced directly to the form fields below. Review, edit, and publish when ready!</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Artwork Title</label>
                <input 
                  type="text" 
                  required 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g. Midnight Serenade"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price (₹)</label>
                  <input 
                    type="number" 
                    required 
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    placeholder="0"
                  />
                </div>
                <div className="form-group">
                  <label>Medium</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.medium}
                    onChange={e => setFormData({...formData, medium: e.target.value})}
                    placeholder="e.g. Oil on Canvas"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Dimensions</label>
                <input 
                  type="text" 
                  required 
                  value={formData.dimensions}
                  onChange={e => setFormData({...formData, dimensions: e.target.value})}
                  placeholder="e.g. 24 x 36 inches"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea 
                  rows="4" 
                  required
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Story behind the artwork..."
                ></textarea>
              </div>

              <div className="form-group">
                <label>Tags (comma-separated)</label>
                <input 
                  type="text" 
                  value={formData.tags}
                  onChange={e => setFormData({...formData, tags: e.target.value})}
                  placeholder="e.g. abstract, sunset, calm, acrylic"
                />
              </div>

              <div className="form-group">
                <label>SEO Keywords (comma-separated)</label>
                <input 
                  type="text" 
                  value={formData.seoKeywords}
                  onChange={e => setFormData({...formData, seoKeywords: e.target.value})}
                  placeholder="e.g. buy original acrylic landscape painting online, akshara art"
                />
              </div>

              <div className="form-group">
                <div className="caption-label-row">
                  <label>Instagram Caption</label>
                  {formData.instagramCaption && (
                    <button
                      type="button"
                      className="copy-caption-btn"
                      onClick={handleCopyCaption}
                    >
                      {copySuccess ? <Check size={12} style={{ color: '#22c55e' }} /> : <Copy size={12} />}
                      <span>{copySuccess ? 'Copied!' : 'Copy Caption'}</span>
                    </button>
                  )}
                </div>
                <textarea 
                  rows="5" 
                  value={formData.instagramCaption}
                  onChange={e => setFormData({...formData, instagramCaption: e.target.value})}
                  placeholder="Generated Instagram post caption..."
                ></textarea>
              </div>

              <button type="submit" className="btn-primary submit-btn">Publish to Gallery</button>
            </form>
          </div>
        ) : (
          <div className="commissions-inbox-section glass-panel animate-fade-in">
            <h2>Commission Inbox ({commissions.length})</h2>
            <p className="commissions-subtitle">Review bespoke custom order inquiries sent by prospective buyers.</p>
            
            {commissions.length === 0 ? (
              <div className="commissions-empty-state">
                <Mail size={48} className="empty-icon" style={{ color: 'var(--text-secondary)' }} />
                <h3>No Inquiries Yet</h3>
                <p>Custom commission requests submitted by clients will appear here.</p>
              </div>
            ) : (
              <div className="commissions-list-grid">
                {commissions.map((comm) => (
                  <div key={comm.id} className="commission-card-item glass-panel">
                    <div className="comm-card-header">
                      <div>
                        <h3>{comm.name}</h3>
                        <span className="comm-date">{comm.date}</span>
                      </div>
                      <button
                        type="button"
                        className="copy-caption-btn"
                        onClick={() => handleCopyClientEmail(comm.email, comm.id)}
                      >
                        {copyEmailSuccess === comm.id ? <Check size={12} style={{ color: '#22c55e' }} /> : <Copy size={12} />}
                        <span>{copyEmailSuccess === comm.id ? 'Copied!' : 'Copy Email'}</span>
                      </button>
                    </div>

                    <div className="comm-card-specs">
                      <div className="comm-spec-pill">
                        <strong>Medium:</strong> {comm.medium}
                      </div>
                      <div className="comm-spec-pill">
                        <strong>Size:</strong> {comm.dimensions}
                      </div>
                      <div className="comm-spec-pill">
                        <strong>Colors:</strong> {comm.colors}
                      </div>
                    </div>

                    <div className="comm-card-concept">
                      <strong>Story & Concept:</strong>
                      <p>{comm.concept}</p>
                    </div>

                    <div className="comm-card-actions">
                      <a href={`mailto:${comm.email}?subject=Custom%20Commission%20Inquiry%20-%20Akshara%20Tarsoliya`} className="btn-outline email-client-link">
                        <Mail size={14} /> Contact Client
                      </a>
                      <button
                        type="button"
                        className="btn-primary resolve-comm-btn"
                        onClick={() => handleResolveCommission(comm.id)}
                      >
                        Mark Completed
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
