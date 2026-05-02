import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    medium: '',
    dimensions: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Painting uploaded successfully! (Mock Action)');
    setFormData({ title: '', price: '', medium: '', dimensions: '', description: '' });
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
              <p>Drag and drop high-res image here, or click to browse</p>
              <button type="button" className="btn-outline">Select File</button>
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
