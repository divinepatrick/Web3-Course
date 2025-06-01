import React from 'react';

const ConnectWallet = ({ onConnect }) => {
  return (
    <button onClick={onConnect}>Connect Wallet</button>
  );
};

export default ConnectWallet;