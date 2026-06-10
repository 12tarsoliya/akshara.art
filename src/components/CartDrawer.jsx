import React from 'react';
import { X, Trash2, Lock, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

const CartDrawer = () => {
  const { cartItems, isCartOpen, toggleCart, removeFromCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={toggleCart}></div>
      <div className={`cart-drawer glass-panel ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Collection</h2>
          <button className="close-btn" onClick={toggleCart}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty.</p>
              <button className="btn-outline" onClick={toggleCart}>Continue Exploring</button>
            </div>
          ) : (
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title} className="item-image" />
                  <div className="item-details">
                    <h4 className="item-title">{item.title}</h4>
                    <p className="item-artist">{item.artist}</p>
                    <p className="item-price">₹{item.price}</p>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <button className="btn-primary checkout-btn flex items-center justify-center gap-2" onClick={() => {
              const message = `Hello Akshara! I would like to purchase the following artworks:\n\n${cartItems.map(i => `- ${i.title} (₹${i.price})`).join('\n')}\n\nTotal Amount: ₹${total}\n\nPlease share your UPI details to complete the payment.`;
              const encodedMessage = encodeURIComponent(message);
              window.open(`https://wa.me/910000000000?text=${encodedMessage}`, '_blank');
            }}>
              <Lock size={18} /> Order via WhatsApp (UPI)
            </button>
            <div className="secure-badge">
              <ShieldCheck size={16} className="text-green-500" />
              <span>Payments are End-to-End Encrypted</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
