import React, { useState } from 'react';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      const res = await fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      setStatus(data.message);
      setName(''); setEmail(''); setMessage('');
    } catch {
      setStatus('Failed to send message');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" required />
      <button type="submit">Send</button>
      <p>{status}</p>
    </form>
  );
}

export default Contact;
    