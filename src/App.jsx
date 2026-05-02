import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SocialDock from './components/SocialDock';
import Home from './pages/Home';
import Shop from './pages/Shop';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <CartProvider>
      <div className="app-wrapper">
        <Navbar />
        <CartDrawer />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        
        <SocialDock />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
