"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useMemo } from "react";

export default function ConnectBtn() {

    const { setVisible } = useWalletModal();
    const { publicKey, disconnect } = useWallet();

    const address = useMemo(() => {
        const addy = publicKey?.toBase58();
        return addy ? `${addy.slice(0, 2)} . . . ${addy.slice(-4)}` : null;

    }, [publicKey]);

    return (
        <button onClick={() => {
            if (publicKey) {
                disconnect();
            } else {
                setVisible(true);
            }
        }}
            className="flex justify-center pt-[0.7rem] pb-[0.6rem] w-[135px] bg-[var(--so)] 
        text-black font-[900] text-xs rounded-lg cursor-pointer">
            {address ? address : "Connect Wallet"}
        </button>
    );
}