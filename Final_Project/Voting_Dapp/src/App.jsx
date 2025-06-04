import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';

// Contract address and the ABI 
const contractAddress = "0x35cd167FA931C6c5E07AbB2621846FC35D54baD6";
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "proposalNames",
        "type": "string[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposal",
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
    "name": "winnerName",
    "outputs": [
      {
        "internalType": "string",
        "name": "winnerName_",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "proposals",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "voteCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [winnerName, setWinnerName] = useState("");
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          if (chainId !== '0xaa36a7') {
            alert("Please connect to the Sepolia test network.");
            return;
          }

          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const account = await signer.getAddress();

          setAccount(account);
          const contract = new ethers.Contract(contractAddress, contractABI, signer);
          setContract(contract);

          await getProposalNames(contract);
          await checkVotedStatus(contract, account);
          await getWinnerName(contract);

        } catch (error) {
          console.error("Error initializing:", error);
        }
      } else {
        console.log("Please install MetaMask");
      }
    };

    init();
  }, []);

  const getProposalNames = async (contract) => {
    try {
      const proposalList = [];
      for (let i = 0; i < 2; i++) {
        const proposal = await contract.proposals(i);
        proposalList.push(proposal.name);
      }
      setProposals(proposalList);
    } catch (error) {
      console.error("Error fetching proposal names:", error);
    }
  }

  const checkVotedStatus = async (contract, account) => {
    try {
      
      // This is a placeholder
      const winner = await contract.winnerName();
      setWinnerName(winner);
    } catch (error) {
      console.error("Error checking voted status:", error);
    }
  };

  const getWinnerName = async (contract) => {
    try {
      const winner = await contract.winnerName();
      setWinnerName(winner);
    } catch (error) {
      console.error("Error getting winner name:", error);
    }
  }

  const vote = async (proposal) => {
    try {
      const tx = await contract.vote(proposal);
      await tx.wait();
      setHasVoted(true);
      await getWinnerName(contract);
    } catch (error) {
      console.error("Voting error:", error);
    }
  };

  return (
    <div className="App">
      <h1>Divine's Voting DApp</h1>
      {account ? (
        <div>
          <p>Connected Account: {account}</p>
          {hasVoted ? (
            <p>You have already voted.</p>
          ) : (
            <div>
              {proposals.map((proposal, index) => (
                <button key={index} onClick={() => vote(index)}>Vote for {proposal}</button>
              ))}
            </div>
          )}
          <p>Winner: {winnerName}</p>
        </div>
      ) : (
        <button onClick={async () => {
          if (window.ethereum) {
            try {
              await window.ethereum.request({ method: 'eth_requestAccounts' });
              const chainId = await window.ethereum.request({ method: 'eth_chainId' });
              if (chainId !== '0xaa36a7') {
                alert("Please connect to the Sepolia test network.");
                return;
              }

              const provider = new ethers.BrowserProvider(window.ethereum);
              const signer = await provider.getSigner();
              const account = await signer.getAddress();

              setAccount(account);
              const contract = new ethers.Contract(contractAddress, contractABI, signer);
              setContract(contract);

              await getProposalNames(contract);
              await checkVotedStatus(contract, account);
              await getWinnerName(contract);

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