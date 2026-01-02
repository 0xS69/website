"use client";

import React, { FC, ReactNode } from "react";

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";

interface ProviderProps {
  children: ReactNode;
}

export const Provider: FC<ProviderProps> = ({ children }) => {

  const endpoint = "https://solana-rpc.publicnode.com";

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};