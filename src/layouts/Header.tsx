import React, { useContext, useState } from "react";
import { useLocation } from 'react-router-dom';
import { LayoutContext } from "./Root";
import { useGetIsLoggedIn, useGetAccountInfo } from "../hooks";
import { shortenAddress } from "utils";

import { ReactComponent as Ring } from "assets/svg/ring.svg";
import { ReactComponent as Menu } from "assets/svg/menu.svg";
import { ReactComponent as Ledger } from "assets/svg/ledger.svg";
import { ReactComponent as Icon1 } from "assets/svg/wallet-icon-1.svg";
import { ReactComponent as Icon2 } from "assets/svg/wallet-icon-2.svg";
import { ReactComponent as Icon3 } from "assets/svg/wallet-icon-3.svg";
import { ReactComponent as Icon4 } from "assets/svg/wallet-icon-4.svg";
import { ReactComponent as Close } from "assets/svg/close.svg";
import Modal from "react-modal";

import {
  ExtensionLoginButton,
  WebWalletLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton
} from "../components/sdkComponents";

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#161B27',
    borderColor: "#1E2436",
    borderWidth: "2px",
    borderRadius: "5px",
  },
};

const Header = () => {
  const { search } = useLocation();
  const ctx = useContext(LayoutContext);
  const { navOpen, setNavOpen } = ctx;
  const isConnected = useGetIsLoggedIn();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { account } = useGetAccountInfo();

  const toggle = () => {
    setNavOpen(!navOpen);
  };

  const connectWallet = () => {
    setIsModalOpen(true);
  }

  const afterOpenModal = () => {
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const commonProps = {
    callbackRoute: search,
    nativeAuth: true // optional
  };

  return (
    <div className="bg-card flex py-[22px] justify-end px-8 items-center gap-6">
      <Menu
        className="mr-auto w-8 h-8 cursor-pointer lg:hidden"
        onClick={toggle}
      />
      <h3 className="text-header font-input cursor-pointer">Play Poker</h3>
      <Ring className="min-full h-max cursor-pointer"/>
      {isConnected ? (
        <div className="flex items-center gap-2 p-3 border-[3px] border-line rounded-lg">
          <Ledger className="w-6 h-6 cursor-pointer" />
          <h5 className="text-body font-button cursor-pointer">{shortenAddress(account.address)}</h5>
          <h4 className="text-header font-button cursor-pointer">
            0 $EBONE
          </h4>
        </div>
      ) : (
        <div>
          <button className="bg-brand hover:opacity-70 cursor-pointer anim rounded-[8px] px-5 py-3 text-back font-button" onClick={connectWallet}>
            Connect Wallet
          </button>
          <Modal
            isOpen={isModalOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h3 className="text-header font-subtitle">Connect your wallet</h3>
            <p className="text-body font-capital mt-2 mb-5">Please select a wallet to connect to our site</p>
            <Close className="min-full h-max cursor-pointer absolute right-5 top-5 w-5" fill="rgba(251, 251, 251, 0.88)" onClick={closeModal}/>
            <div className="flex flex-col">
              <ExtensionLoginButton
                loginButtonText='MultiversX DeFi Wallet'
                {...commonProps}
              >
                <div className="flex flex-row items-center">
                  <Icon1 className="min-full cursor-pointer" />
                  <span className="text-header font-button ml-3">MultiversX DeFi Wallet</span>
                </div>
              </ExtensionLoginButton>
              <WebWalletLoginButton
                loginButtonText='MultiversX Web Wallet'
                {...commonProps}
              >
                <div className="flex flex-row items-center">
                  <Icon2 className="min-full cursor-pointer" />
                  <span className="text-header font-button ml-3">MultiversX Web Wallet</span>
                </div>
              </WebWalletLoginButton>
              <LedgerLoginButton
                loginButtonText='Ledger'
                className='test-class_name'
                {...commonProps}
              >
                <div className="flex flex-row items-center">
                  <Icon3 className="min-full cursor-pointer" />
                  <span className="text-header font-button ml-3">Ledger</span>
                </div>
              </LedgerLoginButton>
              <WalletConnectLoginButton
                loginButtonText='xPortal App'
                {...commonProps}
              >
                <div className="flex flex-row items-center">
                  <Icon4 className="min-full cursor-pointer" />
                  <span className="text-header font-button ml-3">xPortal App</span>
                </div>
              </WalletConnectLoginButton>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Header;
