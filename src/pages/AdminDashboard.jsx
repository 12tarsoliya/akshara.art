import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { addPainting } from '../data/paintings';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    medium: '',
    dimensions: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c03fa37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // default placeholder
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPainting(formData);
    alert('Painting published to the gallery successfully!');
    setFormData({ title: '', price: '', medium: '', dimensions: '', description: '', image: 'https://images.unsplash.com/photo-1578301978693-85fa9c03fa37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' });
  };

  return (
    <div className="admin-container container">
      <div className="admin-header">
        <h1 className="admin-title">Artist Portal</h1>
        <p className="admin-subtitle">Manage your gallery and upload new artworks.</p>
      </div>

      <div className="admin-content">
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
                <label>Price ($)</label>
                <input 
                  type="number" 
                  required 
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  placeholder="0.00"
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

            <button type="submit" className="btn-primary submit-btn">Publish to Gallery</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
