import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
// import { useGetAccountInfo, logout } from "../hooks";

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
    zIndex: 1000,
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

interface Props {
  isOpen: boolean
  onClose?: () => void
}

const WalletConnectModal: React.FC<Props> = ({ isOpen, onClose = () => null }) => {
  const { search } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log(isOpen);
    setIsModalOpen(isOpen)
  }, [isOpen])

  const afterOpenModal = () => {
  }

  const closeModal = () => {
    setIsModalOpen(false);
    onClose()
  }

  const commonProps = {
    callbackRoute: search,
    nativeAuth: true // optional
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <h3 className="text-header font-subtitle">Connect your wallet</h3>
      <p className="text-body font-capital mt-2 mb-5">Please select a wallet to connect to our site</p>
      <Close className="min-full h-max cursor-pointer absolute right-5 top-5 w-5" fill="rgba(251, 251, 251, 0.88)" onClick={closeModal} />
      <div className="flex flex-col">
        <ExtensionLoginButton
          loginButtonText='MultiversX DeFi Wallet'
          {...commonProps}
        >
          <div className="flex flex-row items-center" onClick={closeModal}>
            <Icon1 className="min-full cursor-pointer" />
            <span className="text-header font-button ml-3">MultiversX DeFi Wallet</span>
          </div>
        </ExtensionLoginButton>
        <WebWalletLoginButton
          loginButtonText='MultiversX Web Wallet'
          {...commonProps}
        >
          <div className="flex flex-row items-center" onClick={closeModal}>
            <Icon2 className="min-full cursor-pointer" />
            <span className="text-header font-button ml-3">MultiversX Web Wallet</span>
          </div>
        </WebWalletLoginButton>
        <LedgerLoginButton
          loginButtonText='Ledger'
          className='test-class_name'
          {...commonProps}
        >
          <div className="flex flex-row items-center" onClick={closeModal}>
            <Icon3 className="min-full cursor-pointer" />
            <span className="text-header font-button ml-3">Ledger</span>
          </div>
        </LedgerLoginButton>
        <WalletConnectLoginButton
          loginButtonText='xPortal App'
          {...commonProps}
        >
          <div className="flex flex-row items-center" onClick={closeModal}>
            <Icon4 className="min-full cursor-pointer" />
            <span className="text-header font-button ml-3">xPortal App</span>
          </div>
        </WalletConnectLoginButton>
      </div>
    </Modal>
  );
};

export default WalletConnectModal;
