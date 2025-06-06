import detectEthereumProvider from "@metamask/detect-provider"

async function setup() {
  const provider = await detectEthereumProvider()

  if (provider && provider === window.ethereum) {
    console.log("MetaMask is available!")
    startApp(provider) // Initialize your dapp with MetaMask.
  } else {
    console.log("Please install MetaMask!")
  }
}

function startApp(provider) {
  if (provider !== window.ethereum) {
    console.error("Do you have multiple wallets installed?")
  }
}

window.addEventListener("load", setup)



const chainId = await window.ethereum.request({ method: "eth_chainId" })

window.ethereum.on("chainChanged", handleChainChanged)

function handleChainChanged(chainId) {
  window.location.reload()
}


const ethereumButton = document.querySelector(".enableEthereumButton")
const showAccount = document.querySelector(".showAccount")

ethereumButton.addEventListener("click", () => {
  getAccount()
})

async function getAccount() {
  const accounts = await window.ethereum
    .request({ method: "eth_requestAccounts" })
    .catch((err) => {
      if (err.code === 4001) {
        console.log("Please connect to MetaMask.")
      } else {
        console.error(err)
      }
    })
  const account = accounts[0]
  showAccount.innerHTML = account
}