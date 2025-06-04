import React, { useState, useEffect } from 'react';
import ConnectWallet from './components/ConnectWallet';
import Balance from './components/Balance';
import SendEthForm from './components/SendEthForm';
import Voting from './components/Voting';
import { connectWallet, getBalance, sendETH } from './utils/ethers';
import './index.css'; // Import the CSS file

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (account) {
        try {
          const bal = await getBalance(account);
          setBalance(bal);
        } catch (error) {
          console.error("Error fetching balance:", error);
          setBalance(null);
        }
      }
    };

    fetchBalance();
  }, [account]);

  const handleConnectWallet = async () => {
    const accountAddress = await connectWallet();
    if (accountAddress) {
      setAccount(accountAddress);
    }
  };

  const handleSendETH = async (recipient, amount) => {
    try {
      await sendETH(recipient, amount);
      const newBalance = await getBalance(account);
      setBalance(newBalance);
      alert('Transaction successful!');
    } catch (error) {
      console.error("Error sending ETH:", error);
      alert('Transaction failed!');
    }
  };

  return (
    <div className="container">
      <h1>Send + Vote</h1>
      {!account ? (
        <ConnectWallet onConnect={handleConnectWallet} />
      ) : (
        <>
          <p>Account: {account}</p>
          <Balance balance={balance} />
          <SendEthForm onSend={handleSendETH} />
          <Voting account={account} />
        </>
      )}
    </div>
  );
}

export default App;