# Voting DApp

## Overview

This project is a simple decentralized application (DApp) built with React and Ethers.js that allows users to connect their MetaMask wallet and participate in a voting process. Users can view proposals and cast their votes. It interacts with a smart contract deployed on the Sepolia test network.

## Features

-   **Connect Wallet:** Connect to the DApp using MetaMask.
-   **View Proposals:** Display a list of available proposals to vote on.
-   **Cast Vote:** Allow connected users to cast their vote for a selected proposal.
-   **Display Winner:** Show the winning proposal after voting.
-   **Chairperson Actions:** Allow the chairperson to give voting rights to other addresses.

## Technologies Used

-   **React:** A JavaScript library for building user interfaces.
-   **Ethers.js:** A JavaScript library for interacting with the Ethereum blockchain.
-   **MetaMask:** A browser extension that allows users to manage their Ethereum accounts and interact with DApps.
-   **Vite:** A build tool that provides a fast and efficient development experience.

## Setup

### Prerequisites

-   Node.js (version 18 or higher)
-   npm
-   MetaMask browser extension installed

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd Voting_Dapp
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

### Configuration

1.  **Smart Contract Address:** Update the `contractAddress` variable in `src/App.jsx` with the address of your deployed smart contract.

2.  **ABI:** Ensure that the `contractABI` array in `src/App.jsx` matches the ABI of your deployed smart contract.

3.  **Network:** Configure MetaMask to connect to the Sepolia test network.

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

2.  **View Proposals:**
    -   Once your wallet is connected, the DApp will display a list of available proposals.

3.  **Cast Vote:**
    -   Click the "Vote" button next to the proposal you want to vote for.
    -   MetaMask will prompt you to confirm the transaction. Review the transaction details and confirm.
    -   A confirmation message will appear if the transaction is successful.

4.  **View Winner:**
    -   After voting is complete, the DApp will display the winning proposal.

## Architecture

The DApp follows a component-based architecture:

-   **`src/App.jsx`:** The main component that manages the application state and renders the UI. It handles connecting the wallet, fetching proposals, casting votes, and determining the winner.

## Code Structure

-   **`index.html`:** The main HTML file that serves as the entry point for the DApp.
-   **`src/main.jsx`:** The main JavaScript file that initializes the React application and renders the `App` component into the `root` element in `index.html`.
-   **`src/App.jsx`:** The main application component that manages the overall state and renders the different sections of the DApp based on whether a wallet is connected or not.

## Dependencies

-   `ethers`: A comprehensive library for interacting with the Ethereum blockchain.
-   `react`: A JavaScript library for building user interfaces.
-   `react-dom`: Provides DOM-specific methods for React.
-   `react-router-dom`: Enables routing in the React application (if you plan to add more pages/routes).
-   `@vitejs/plugin-react`: A Vite plugin that provides fast refresh and other features for React development.
-   `vite`: A build tool that bundles the code for deployment.



