import { ethers } from 'ethers';

let provider;
let signer;

export const connectWallet = async () => {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        try {
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            return signer.getAddress();
        } catch (error) {
            console.error("User denied account access");
            return null;
        }
    } else {
        alert("MetaMask not detected! Please install MetaMask.");
        return null;
    }
};

export const getBalance = async (address) => {
    if (!provider) {
        throw new Error("Wallet not connected");
    }
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance);
};

export const sendETH = async (to, amount) => {
    if (!signer) {
        throw new Error("Wallet not connected");
    }

    const tx = await signer.sendTransaction({
        to: to,
        value: ethers.utils.parseEther(amount)
    });
    return tx;
};

const VOTING_CONTRACT_ADDRESS = "0x35cd167FA931C6c5E07AbB2621846FC35D54baD6";
const VOTING_ABI = [
  {"inputs":[{"internalType":"string[]","name":"proposalNames","type":"string[]"}],"stateMutability":"nonpayable","type":"constructor"},
  {"inputs":[],"name":"chairperson","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"voter","type":"address"}],"name":"giveRightToVote","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"proposals","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"voteCount","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"proposal","type":"uint256"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"voters","outputs":[{"internalType":"uint256","name":"weight","type":"uint256"},{"internalType":"bool","name":"voted","type":"bool"},{"internalType":"address","name":"delegate","type":"address"},{"internalType":"uint256","name":"vote","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"winnerName","outputs":[{"internalType":"string","name":"winnerName_","type":"string"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"winningProposal","outputs":[{"internalType":"uint256","name":"winningProposal_","type":"uint256"}],"stateMutability":"view","type":"function"}
];

let votingContract;

const getVotingContract = () => {
  if (!provider) throw new Error("Wallet not connected");
  if (!votingContract) {
    votingContract = new ethers.Contract(
      VOTING_CONTRACT_ADDRESS,
      VOTING_ABI,
      signer || provider
    );
  }
  return votingContract;
};

export const fetchProposals = async () => {
  const contract = getVotingContract();
  const proposal1 = await contract.proposals(0);
  const proposal2 = await contract.proposals(1);
  return [
    { name: proposal1.name, voteCount: proposal1.voteCount.toString() },
    { name: proposal2.name, voteCount: proposal2.voteCount.toString() }
  ];
};

export const fetchVoterStatus = async (address) => {
  const contract = getVotingContract();
  const voter = await contract.voters(address);
  return {
    voted: voter.voted,
    vote: voter.vote.toNumber()
  };
};

export const castVote = async (proposalIndex) => {
  const contract = getVotingContract();
  const tx = await contract.vote(proposalIndex);
  await tx.wait();
  return tx;
};

export const fetchWinner = async () => {
  const contract = getVotingContract();
  return await contract.winnerName();
};