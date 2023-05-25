import React, { useEffect, useState } from "react";
import { useGetAccountInfo, logout } from "../hooks";
import { shortenAddress } from "utils";

import { ReactComponent as Ledger } from "assets/svg/ledger.svg";

interface ConnectButtonProps {
  onClick?: () => void
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ onClick }) => {
  const { account } = useGetAccountInfo();

  const connectWallet = () => {
    if (onClick) {
      onClick()
    }
  }

  const disconnect = () => {
    logout(window.location.href);
  }

  return (
    <div>
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
        </div>
      )}
    </div>
  );
};

export default ConnectButton;
