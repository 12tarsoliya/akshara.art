import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SocialDock from './components/SocialDock';
import FloatingCuratorChat from './components/FloatingCuratorChat';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Curator from './pages/Curator';
import ArtworkDetail from './pages/ArtworkDetail';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  useEffect(() => {
    // Basic Anti-Theft Protection
    const handleKeyDown = (e) => {
      // Prevent PrintScreen, Ctrl+P, Ctrl+S
      if (
        e.key === 'PrintScreen' || 
        (e.ctrlKey && (e.key === 'p' || e.key === 's' || e.key === 'c')) ||
        (e.metaKey && (e.key === 'p' || e.key === 's' || e.key === 'c'))
      ) {
        e.preventDefault();
        alert('Security Alert: Screenshots and saving are disabled on this website to protect the artwork.');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <CartProvider>
      <div className="app-wrapper" onContextMenu={(e) => e.preventDefault()}>
        <Navbar />
        <CartDrawer />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/curator" element={<Curator />} />
            <Route path="/artwork/:id" element={<ArtworkDetail />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        
        <SocialDock />
        <FloatingCuratorChat />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
