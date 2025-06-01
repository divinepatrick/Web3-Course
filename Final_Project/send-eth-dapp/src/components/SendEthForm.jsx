// filepath: src/components/SendETHForm.jsx
import React, { useState } from 'react';

const SendETHForm = ({ onSend }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(recipient, amount);
    setRecipient('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="recipient">Recipient Address:</label>
        <input
          type="text"
          id="recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="amount">Amount (ETH):</label>
        <input
          type="number"
          id="amount"
          step="0.0001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <button type="submit">Send ETH</button>
    </form>
  );
};

export default SendETHForm;