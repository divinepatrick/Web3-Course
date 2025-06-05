# Send ETH & Voting DApp

## Overview

This project is a decentralized application (DApp) built with React, Vite, and Ethers.js. It allows users to connect their MetaMask wallet, view their ETH balance, send ETH, and participate in a decentralized voting process on the Sepolia testnet.

## 📺 Demo Video

[Click here to watch the demo video](https://youtu.be/QJEfbgYdjr4?si=TLcSkSkDi85Zlrml)



## Features

-  **Connect Wallet:** Connect your MetaMask wallet to the DApp.
-   **View Balance:** Display the connected wallet's ETH balance.
-   **Send ETH:** Send ETH to other Ethereum addresses.
-   **Voting Interface:**  
    - View two proposals and their real-time vote counts.
    - Cast your vote for either proposal (one vote per account).
    - See if you have already voted and which proposal you voted for.
    - View the current winning proposal.
    - Voting buttons are disabled if you have already voted.
    - Real-time updates after voting.
    - Transaction status indicators (pending, success, error).

## Technologies I Used

-   **React:** A JavaScript library for building user interfaces.
-   **Vite:** A build tool that provides a fast and efficient development experience.
-   **Ethers.js:** A JavaScript library for interacting with the Ethereum blockchain.
-   **MetaMask:** A browser extension that allows users to manage their Ethereum accounts and interact with DApps.

## Setup

### Prerequisites

-   Node.js (version 18 or higher)
-   npm
-   MetaMask browser extension installed 

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd send-eth-dapp
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

### Configuration

No specific configuration is required. The DApp uses the `window.ethereum` object provided by MetaMask to connect to the Ethereum network.  
**Note:** For voting, ensure MetaMask is set to the Sepolia testnet (chainId: 11155111).

### Running the DApp

1.  Start the development server:

    ```bash
    npm run dev
    ```

2.  Open your browser and navigate to the address provided by Vite (usually `http://localhost:5173/`).

## Usage

1.  **Connect Wallet:**
    -   Install MetaMask if you haven't already.
    -   Open the DApp in your browser.
    -   Click the "Connect Wallet" button and follow MetaMask prompts.

2.  **View Balance:**
    -   Once connected, your ETH balance will be displayed.

3.  **Send ETH:**
    -   Enter the recipient's Ethereum address and the amount of ETH to send.
    -   Click "Send ETH" and confirm the transaction in MetaMask.
    -   Success or error messages will be shown.

4.  **Voting:**
    -   View both proposals and their current vote counts.
    -   If you haven't voted, select your preferred proposal and confirm the transaction in MetaMask.
    -   After voting, your choice and the updated vote counts will be displayed.
    -   The current winning proposal is always shown.
    -   Voting is only allowed once per account.

## Architecture

The DApp uses a component-based architecture:

-   **`src/App.jsx`:** Main component managing state and rendering the UI.
-   **`src/components/ConnectWallet.jsx`:** Handles wallet connection.
-   **`src/components/Balance.jsx`:** Displays ETH balance.
-   **`src/components/SendEthForm.jsx`:** Form for sending ETH.
-   **`src/components/Voting.jsx`:** Voting interface for proposals.
-   **`src/utils/ethers.js`:** Utility functions for blockchain interaction (wallet, balance, send ETH, voting).
-   **`src/index.css`:** CSS styles for my dapp


## Dependencies

-   `@metamask/providers`: Provides access to the MetaMask Ethereum provider.
-   `ethers`: A comprehensive library for interacting with the Ethereum blockchain.
-   `react`: A JavaScript library for building user interfaces.
-   `react-dom`: Provides DOM-specific methods for React.
-   `react-router-dom`: Enables routing in the React application (if you plan to add more pages/routes).
-   `@vitejs/plugin-react`: A Vite plugin that provides fast refresh and other features for React development.
-   `vite`: A build tool that bundles the code for deployment.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to suggest improvements or report bugs.

## Thats it!
