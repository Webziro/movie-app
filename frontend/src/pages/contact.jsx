import React, { useState } from 'react';
import '../css/Contact.css';
import contactImage from '../images/login-img.png';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      setStatus(data.message);
      setName(''); 
      setEmail(''); 
      setMessage('');
    } catch {
      setStatus('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      {/* Left side - Image */}
      <div className="contact-left">
        <img 
          src={contactImage} 
          alt="Contact Us" 
          className="contact-image"
        />
      </div>

      {/* Right side - Form */}
      <div className="contact-right">
        <div className="contact-form-container">
          <h1 className="contact-title">Get In Touch</h1>
          <p className="contact-subtitle">
            Have a question or want to work together? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input 
                id="name"
                type="text"
                value={name} 
                onChange={e => setName(e.target.value)} 
                className="form-input"
                placeholder="Enter your full name" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input 
                id="email"
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="form-input"
                placeholder="Enter your email address" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea 
                id="message"
                value={message} 
                onChange={e => setMessage(e.target.value)} 
                className="form-textarea"
                placeholder="Tell us about your project or question..." 
                required 
              />
            </div>

            <button 
              type="submit" 
              className="contact-button" 
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {status && (
            <div className={`status-message ${status.includes('success') || status.includes('received') ? 'status-success' : 'status-error'}`}>
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
    