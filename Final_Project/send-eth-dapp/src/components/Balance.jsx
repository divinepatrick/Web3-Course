import React from 'react';

const Balance = ({ balance }) => {
  return (
    <div>
      Balance: {balance ? `${balance} ETH` : 'Loading...'}
    </div>
  );
};

export default Balance;