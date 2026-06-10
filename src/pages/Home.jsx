import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle, Palette, Layers, Brush, Mail } from 'lucide-react';
import './Home.css';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dimensions: '',
    medium: 'Oil on Canvas',
    colors: '',
    concept: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCommissionSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.concept) {
      alert("Please fill in Name, Email, and Concept details.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const newCommission = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          dimensions: formData.dimensions || 'Custom Size',
          medium: formData.medium,
          colors: formData.colors || 'Artist Preference',
          concept: formData.concept,
          date: new Date().toLocaleDateString('en-IN')
        };

        const existing = localStorage.getItem('akshara_commissions');
        const list = existing ? JSON.parse(existing) : [];
        const updated = [newCommission, ...list];
        localStorage.setItem('akshara_commissions', JSON.stringify(updated));

        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          dimensions: '',
          medium: 'Oil on Canvas',
          colors: '',
          concept: ''
        });
        setTimeout(() => setSubmitted(false), 5000);
      } catch (err) {
        alert("Error submitting request: " + err.message);
      } finally {
        setIsSubmitting(false);
      }
    }, 1200);
  };

  const collections = [
    {
      title: "Abstract Expressionism",
      description: "Bold textures, deep colors, and emotional strokes exploring abstract concepts and structural balance.",
      image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=600&q=80",
      theme: "Bold & Vibrant"
    },
    {
      title: "Ethereal Landscapes",
      description: "Poetic compositions and pastel flow states capturing calm environments, self-reflection, and inner peace.",
      image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80",
      theme: "Calm & Reflective"
    },
    {
      title: "Oceanic Fluidity",
      description: "Resin art and liquid textures reflecting oceanic movements, deep turquoise colors, and glitters.",
      image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=600&q=80",
      theme: "Serene & Refreshing"
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content animate-fade-in">
          <p className="hero-subtitle">The Akshara Tarsoliya Gallery</p>
          <h1 className="hero-title">Where Emotion <br/><span className="text-accent">Meets Art</span></h1>
          <p className="hero-description">
            Explore a premium collection of original paintings and custom commissioned works, handcrafted to speak directly to your space and state of mind.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn-primary flex items-center gap-2">
              Explore Gallery <ArrowRight size={18} />
            </Link>
            <a href="#commissions" className="btn-outline flex items-center gap-2">
              Request Commission
            </a>
          </div>
        </div>
        <div className="hero-image-wrapper animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="hero-image-container glass-panel">
            <img 
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Featured Artwork" 
              className="hero-image"
            />
            <div className="featured-badge">Featured Piece</div>
          </div>
          <div className="glow-effect"></div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="collections-preview container">
        <div className="section-header">
          <span className="section-subtitle">Aesthetic Tiers</span>
          <h2>Featured Collections</h2>
          <div className="section-line"></div>
        </div>
        <div className="collections-grid">
          {collections.map((col, index) => (
            <div key={index} className="collection-card glass-panel animate-fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="col-image-wrapper">
                <img src={col.image} alt={col.title} className="col-image" />
                <span className="col-theme">{col.theme}</span>
              </div>
              <div className="col-content">
                <h3>{col.title}</h3>
                <p>{col.description}</p>
                <Link to="/shop" className="col-link flex items-center gap-1">
                  View Works <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Artist Philosophy & Bio */}
      <section className="about-preview container">
        <div className="about-grid">
          <div className="about-text">
            <span className="section-subtitle">Meet the Artist</span>
            <h2>Akshara Tarsoliya</h2>
            <p>
              Every stroke is a word, every color a sentence. Akshara Tarsoliya blends contemporary and abstract forms to give a voice to unspoken emotions and natural dynamics. 
            </p>
            <blockquote className="artist-quote">
              "Art is not just what you hang on a wall; it's a window to a feeling, a reminder of a transition, or a sanctuary of peace."
            </blockquote>
            <p style={{ marginTop: '1rem' }}>
              Each canvas is handcrafted, utilizing deep layers of acrylics, textured oils, and fluid resin gloss to build dimensional pieces that transform under different lightings.
            </p>
          </div>
          <div className="stats-grid">
            <div className="stat-card glass-panel">
              <Brush size={32} className="text-accent stat-icon" />
              <h3>50+</h3>
              <p>Original Works</p>
            </div>
            <div className="stat-card glass-panel">
              <Layers size={32} className="text-accent stat-icon" />
              <h3>3</h3>
              <p>Exhibitions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Commission Form Section */}
      <section id="commissions" className="commission-section container">
        <div className="commission-grid glass-panel">
          <div className="commission-info">
            <div className="sparkle-badge">
              <Sparkles size={16} />
              <span>Bespoke Creations</span>
            </div>
            <h2>Commission a Custom Piece</h2>
            <p className="commission-desc">
              Looking for something tailored specifically for your space? Describe your ideal size, medium, and colors. Let Akshara craft a customized masterpiece that perfectly fits your home or workspace aesthetic.
            </p>
            <div className="commission-specs-list">
              <div className="spec-info-item">
                <Palette size={16} className="text-accent" />
                <span>Choose your own colors & color tones</span>
              </div>
              <div className="spec-info-item">
                <Layers size={16} className="text-accent" />
                <span>Request exact dimensions for your wall space</span>
              </div>
              <div className="spec-info-item">
                <Brush size={16} className="text-accent" />
                <span>Collaborate directly on story & concept notes</span>
              </div>
            </div>
          </div>

          <div className="commission-form-container">
            {submitted ? (
              <div className="form-success-alert animate-fade-in">
                <CheckCircle size={40} className="success-icon" />
                <h3>Request Submitted!</h3>
                <p>Namaste. Your custom commission details have been saved. Akshara will review your concept notes and contact you via email shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleCommissionSubmit} className="commission-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Jane Doe"
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. jane@example.com"
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Dimensions</label>
                    <input
                      type="text"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleInputChange}
                      placeholder="e.g. 24 x 36 inches"
                    />
                  </div>
                  <div className="form-group">
                    <label>Preferred Medium</label>
                    <select
                      name="medium"
                      value={formData.medium}
                      onChange={handleInputChange}
                    >
                      <option>Oil on Canvas</option>
                      <option>Acrylic on Canvas</option>
                      <option>Resin Art</option>
                      <option>Mixed Media</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Preferred Colors / Tones</label>
                  <input
                    type="text"
                    name="colors"
                    value={formData.colors}
                    onChange={handleInputChange}
                    placeholder="e.g. Deep teal, gold glitter, cream highlights"
                  />
                </div>

                <div className="form-group">
                  <label>Concept Notes / Story details</label>
                  <textarea
                    rows="3"
                    required
                    name="concept"
                    value={formData.concept}
                    onChange={handleInputChange}
                    placeholder="What emotions, concepts, or elements should the painting represent?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-primary commission-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Send Commission Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Social Media & Contact Section */}
      <section className="contact-social container">
        <div className="contact-grid-info glass-panel">
          <div className="contact-heading">
            <span className="section-subtitle">Let's Connect</span>
            <h2>Inquire & Collaborate</h2>
            <p>Whether you want to acquire an existing artwork, discuss a custom commission, or show support on social networks—I'd love to hear from you.</p>
          </div>
          <div className="social-links-grid">
            <a href="mailto:akshara.art@gmail.com" className="social-card-item">
              <Mail className="social-icon" size={24} />
              <h4>Email</h4>
              <p>akshara.art@gmail.com</p>
            </a>
            <a href="https://www.linkedin.com/in/akshara-tarsoliya-b6455030a?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="social-card-item">
              <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <h4>LinkedIn</h4>
              <p>Professional Network</p>
            </a>
            <a href="https://www.instagram.com/arti.stoul?igsh=MTVqdm0wb3o3NnZqeQ==" target="_blank" rel="noreferrer" className="social-card-item">
              <svg className="social-icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" width="24" height="24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <h4>Instagram</h4>
              <p>@arti.stoul</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
