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