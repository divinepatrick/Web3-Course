import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';

// Contract address and ABI (replace with your actual contract address and ABI)
const contractAddress = "0x35cd167FA931C6c5E07AbB2621846FC35D54baD6"; // Replace with the correct contract address
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_proposal",
        "type": "uint256"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getProposal1Votes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getProposal2Votes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [proposal1Votes, setProposal1Votes] = useState(0);
  const [proposal2Votes, setProposal2Votes] = useState(0);
  const [isConnected, setIsConnected] = useState(false); // new state variable

  useEffect(() => {
    const init = async () => {
      // Check if MetaMask is installed
      if (window.ethereum) {
        try {
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Check if the user is connected to the Sepolia network
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          if (chainId !== '0xaa36a7') { // Sepolia chain ID
            alert("Please connect to the Sepolia test network.");
            return;
          }

          const newProvider = new ethers.BrowserProvider(window.ethereum);
          setProvider(newProvider);

          const newSigner = await newProvider.getSigner();
          setSigner(newSigner);

          const newAccount = await newSigner.getAddress();
          setAccount(newAccount);

          // Create contract instance
          const newContract = new ethers.Contract(contractAddress, contractABI, newSigner);
          setContract(newContract);

          // Fetch initial vote counts
          await updateVoteCounts(newContract);
          setIsConnected(true); // Set isConnected to true after successful connection
        } catch (error) {
          console.error("User denied account access or error initializing:", error);
        }
      } else {
        console.log("Please install MetaMask");
      }
    };

    init();
  }, []);

  const updateVoteCounts = async (contractInstance) => {
    try {
      const p1Votes = await contractInstance.getProposal1Votes();
      const p2Votes = await contractInstance.getProposal2Votes();
      setProposal1Votes(p1Votes.toString());
      setProposal2Votes(p2Votes.toString());
    } catch (error) {
      console.error("Error fetching vote counts:", error);
    }
  };

  const vote = async (proposal) => {
    try {
      const tx = await contract.vote(proposal);
      await tx.wait(); 
      console.log("Vote successful");

      // Update vote counts after voting
      await updateVoteCounts(contract);
    } catch (error) {
      console.error("Voting error:", error);
    }
  };

  return (
    <div className="App">
      <h1>Voting DApp</h1>
      {isConnected ? ( // Conditionally render content based on connection status
        <div>
          <p>Connected Account: {account}</p>
          <button onClick={() => vote(1)}>Vote for Proposal 1</button>
          <button onClick={() => vote(2)}>Vote for Proposal 2</button>
          <p>Proposal 1 Votes: {proposal1Votes}</p>
          <p>Proposal 2 Votes: {proposal2Votes}</p>
        </div>
      ) : (
        <button onClick={async () => {
          if (window.ethereum) {
            try {
              await window.ethereum.request({ method: 'eth_requestAccounts' });

              // Check if the user is connected to the Sepolia network
              const chainId = await window.ethereum.request({ method: 'eth_chainId' });
              if (chainId !== '0xaa36a7') { // Sepolia chain ID
                alert("Please connect to the Sepolia test network.");
                return;
              }

              const newProvider = new ethers.BrowserProvider(window.ethereum);
              const newSigner = await newProvider.getSigner();
              const newAccount = await newSigner.getAddress();
              setAccount(newAccount);
              setProvider(newProvider);
              setSigner(newSigner)
              const newContract = new ethers.Contract(contractAddress, contractABI, newSigner);
              setContract(newContract);
              await updateVoteCounts(newContract);
              setIsConnected(true); // Set isConnected to true after successful connection
            } catch (error) {
              console.error("Error connecting:", error);
            }
          } else {
            console.log("Please install MetaMask");
          }
        }}>Connect Wallet</button>
      )}
    </div>
  );
}

export default App;
