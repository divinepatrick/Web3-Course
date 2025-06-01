# Send ETH DApp

## Overview

This project is a simple decentralized application (DApp) built with Ethersjs, React and Vite that allows users to connect their MetaMask wallet, view their ETH balance, and send ETH to other Ethereum addresses. It uses the `ethers` library to interact with the Ethereum blockchain.

## Features

-   **Connect Wallet:** You can Connect to the DApp using MetaMask.
-   **View Balance:** It will Display the connected wallet's ETH balance.
-   **Send ETH:** Plus you can Send ETH to other Ethereum addresses.

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

No specific configuration is required. The DApp uses the `window.ethereum` object provided by MetaMask to connect to the Ethereum network. Ensure that MetaMask is installed and configured to connect to the desired Ethereum network (e.g., Mainnet, Goerli, Sepolia, or a local development network).

### Running the DApp

1.  Start the development server:

    ```bash
    npm run dev
    ```

2.  Open your browser and navigate to the address provided by Vite (usually `http://localhost:5173/`).

## Usage

1.  **Connect Wallet:**
    -   If you haven't already, install the MetaMask browser extension.
    -   Open the DApp in your browser.
    -   Click the "Connect Wallet" button.
    -   MetaMask will prompt you to connect your account to the DApp. Follow the prompts to connect.

2.  **View Balance:**
    -   Once your wallet is connected, the DApp will display your ETH balance.

3.  **Send ETH:**
    -   Enter the recipient's Ethereum address in the "Recipient Address" field.
    -   Enter the amount of ETH you want to send in the "Amount (ETH)" field.
    -   Click the "Send ETH" button.
    -   MetaMask will prompt you to confirm the transaction. Review the transaction details and confirm.
    -   A confirmation message will appear if the transaction is successful, and an error message will appear if the transaction fails.

## Architecture

The DApp follows a simple component-based architecture:

-   **`src/App.jsx`:** The main component that manages the application state and renders the UI. It handles connecting the wallet, fetching the balance, and sending ETH.
-   **`src/components/ConnectWallet.jsx`:** A component that renders the "Connect Wallet" button and handles the wallet connection logic.
-   **`src/components/Balance.jsx`:** A component that displays the user's ETH balance.
-   **`src/components/SendEthForm.jsx`:** A component that renders the form for sending ETH and handles the transaction logic.
-   **`src/utils/ethers.js`:** A module that contains utility functions for interacting with the Ethereum blockchain using the `ethers` library. This includes functions for connecting to the wallet, fetching the balance, and sending ETH.

## Code Structure

-   **`index.html`:** The main HTML file that serves as the entry point for the DApp.
-   **`src/main.jsx`:** The main JavaScript file that initializes the React application and renders the `App` component into the `root` element in `index.html`.
-   **`src/App.jsx`:** The main application component that manages the overall state and renders the different sections of the DApp based on whether a wallet is connected or not.
-   **`src/components/ConnectWallet.jsx`:** This component renders a button that, when clicked, triggers the wallet connection process using the `connectWallet` function from `src/utils/ethers.js`.
-   **`src/components/Balance.jsx`:** This component receives the `balance` prop and displays it to the user. It shows "Loading..." while the balance is being fetched.
-   **`src/components/SendEthForm.jsx`:** This component provides a form for the user to enter the recipient's address and the amount of ETH to send. It calls the `sendETH` function from `src/utils/ethers.js` when the form is submitted.
-   **`src/utils/ethers.js`:** This module contains the core logic for interacting with the Ethereum blockchain. It includes functions for:
    -   `connectWallet`: Connects to the user's MetaMask wallet and retrieves their address.
    -   `getBalance`: Fetches the ETH balance of a given address.
    -   `sendETH`: Sends ETH from the connected wallet to a specified address.
-   **`src/index.css`:** Contains the CSS styles for the entire application, providing a consistent look and feel.

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

## Thats all I can think of!
