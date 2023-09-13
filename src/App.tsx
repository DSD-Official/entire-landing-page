import React from "react";
import Dashboard from "pages/Dashboard";
import Home from "pages/Home";
import Liquidity from "pages/Liquidity";
import Swap from "pages/Swap";
import Mint from "pages/Mint";
import Claim from "pages/Claim/Claim";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DappProvider } from "@multiversx/sdk-dapp/wrappers";
import { TransactionsToastList } from "@multiversx/sdk-dapp/UI/TransactionsToastList";
import { SignTransactionsModals } from "@multiversx/sdk-dapp/UI/SignTransactionsModals";
import { NotificationModal } from "@multiversx/sdk-dapp/UI/NotificationModal";
import { walletConnectV2ProjectId, apiTimeout } from "config";
import { CHAIN_TYPE } from "config";

function App() {
  return (
    <DappProvider
      environment={CHAIN_TYPE}
      customNetworkConfig={{
        name: "customConfig",
        walletConnectV2ProjectId,
        apiTimeout,
      }}
    >
      <TransactionsToastList />
      <NotificationModal />
      <SignTransactionsModals className="custom-class-for-modals" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/claim" element={<Claim />} />
          <Route path="/app" element={<Dashboard />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/liquidity" element={<Liquidity />} />
        </Routes>
      </BrowserRouter>
    </DappProvider>
  );
}

export default App;
