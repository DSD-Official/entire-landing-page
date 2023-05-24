import React, { useState } from "react";
import { useGetAccountInfo, logout } from "../hooks";
import { shortenAddress } from "utils";

import { ReactComponent as Ledger } from "assets/svg/ledger.svg";

import WalletConnectModal from "./WalletConnectModal";

const ConnectButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { account } = useGetAccountInfo();

  const connectWallet = () => {
    setIsModalOpen(true);
  }

  const disconnect = () => {
    logout(window.location.href);
  }

  return (
    <div className="hidden lg:flex">
      {account.address ? (
        <div className="flex items-center gap-2 p-3 border-[3px] border-line rounded-lg" onClick={disconnect}>
          <Ledger className="w-6 h-6 cursor-pointer" />
          <h5 className="text-body font-button cursor-pointer">{shortenAddress(account.address)}</h5>
          <h4 className="text-header font-button cursor-pointer">
            0 XP
          </h4>
        </div>
      ) : (
        <div>
          <button className="bg-brand hover:opacity-70 cursor-pointer anim rounded-[8px] px-5 py-3 text-back font-button" onClick={connectWallet}>
            Connect Wallet
          </button>
          <WalletConnectModal isOpen={isModalOpen}/>
        </div>
      )}
    </div>
  );
};

export default ConnectButton;
