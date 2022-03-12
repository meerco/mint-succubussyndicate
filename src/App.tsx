import "./App.css";
import { useMemo } from "react";

import Minter from "./Minter";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getMathWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { ThemeProvider, createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

const candyMachineId = process.env.REACT_APP_CANDY_MACHINE_ID
  ? new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID)
  : undefined;

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSolletWallet(),
      getMathWallet(),
    ],
    []
  );

  function toggleMenu() {
    const menu = document.getElementById("mobileNavContainer")!;
    menu.classList.toggle("open-menu");
    console.log("pressed");
  }

  return (
    <div>
      <div id="mobileNavContainer" className="mobile-nav">
        <div className="mobile-nav-close-button">
          <img src="/icons/close.svg" alt="" onClick={toggleMenu} />
        </div>
        <ul>
          <li>
            <img className="mobile-nav-logo" src="/img/logo.png" alt="" />
          </li>
          <li>
            <a href="/#link1" onClick={toggleMenu}>
              Link 1
            </a>
          </li>
          <li>
            <a href="/#link2" onClick={toggleMenu}>
              Link 2
            </a>
          </li>
          <li>
            <a href="/#link3" onClick={toggleMenu}>
              Link 3
            </a>
          </li>
          <li>
            <a href="/#link4" onClick={toggleMenu}>
              Link 4
            </a>
          </li>
          <li>
            <div className="social-icons">
              <a href="https://twitter.com/succubussynnft" target="_blank" rel="noreferrer">
                <img className="nav-social" src="/icons/twitter.svg" alt="" />
              </a>
              <a href="https://discord.com/invite/succubussyndicate" target="_blank" rel="noreferrer">
                <img className="nav-social" src="/icons/discord.svg" alt="" />
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div className="mobile-menu-button" onClick={toggleMenu}>
        <img src="/icons/menu.svg" alt="" />
      </div>
      <nav>
        <div className="nav-container">
          <img className="nav-logo" src="/img/logo_text.png" alt="" />
          <a id="siteLink" className="hide-800" href="https://www.succubussyndicate.com/">
            succubussyndicate.com
          </a>
          <div className="social-icons hide-800">
            <a href="https://twitter.com/succubussynnft" target="_blank" rel="noreferrer">
              <img className="nav-social" src="/icons/twitter.svg" alt="" />
            </a>
            <a href="https://discord.com/invite/succubussyndicate" target="_blank" rel="noreferrer">
              <img className="nav-social" src="/icons/discord.svg" alt="" />
            </a>
          </div>
        </div>
      </nav>
      <div className="content-wrapper">
        <header className="card" id="link1">
          <div style={{ padding: "0 24px 0 24px 0" }}>
            <h3 className="text-secondary-color">Welcome To</h3>
            <h1 className="pb-3">Succubus Syndicate</h1>
            <p className="text-secondary-color">
              Succubus Syndicate consists of 3,333 succubus NFTs ranked by level of rarity, randomly generated from over 100 unique traits. Each succubus NFT comes with exclusive benefits, including virtual, digital and physical perks.
            </p>
          </div>
          <div>
            <ThemeProvider theme={theme}>
              <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                  <WalletDialogProvider>
                    <Minter
                      candyMachineId={candyMachineId}
                      connection={connection}
                      startDate={startDateSeed}
                      txTimeout={txTimeout}
                      rpcHost={rpcHost}
                    />
                  </WalletDialogProvider>
                </WalletProvider>
              </ConnectionProvider>
            </ThemeProvider>

            <div className="btnCard">
              <CrossmintPayButton
                collectionTitle="Succubus Syndicate"
                collectionDescription="3,333 Succubus NFTs on the Solana blockchain. Each NFT acts as an all-access pass into the Succubus Syndicate NSFW ecosystem."
                clientId="7a48cb6b-0660-4848-9c1b-f6a3a690df4d"
                className="crossButton"
              />
            </div>


          </div>
        </header>

      </div>
    </div>
  );
};

export default App;
