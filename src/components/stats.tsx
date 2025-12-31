"use client";

import { CloseAccounts, GetAccounts } from "~/lib/solana";
import { useEffect, useState } from "react";

import { useWallet, useConnection } from "@solana/wallet-adapter-react";

export default function Stats() {

    const { publicKey, signAllTransactions } = useWallet();
    const { connection } = useConnection();

    const [accounts, setAccounts] = useState<string[]>([]);


    const [closed, setClosed] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function main() {
            if (!publicKey) return;
            const address = publicKey.toBase58();
            const result = await GetAccounts(address);
            setAccounts(result);
        }

        main();
    }, [publicKey]);


    const total = accounts.length;

    const value = total * 0.00203928;
    const inUSD = value * 200;




    const handle = async () => {
        if (publicKey && signAllTransactions) { // ← چک کردن undefined
            const count = await CloseAccounts(accounts, publicKey, connection, signAllTransactions);
            setClosed(count);
            setShowModal(true);

        } else {
            console.error("Wallet does not support signAllTransactions or publicKey is missing");
        }
    };

    return (
        <>
            <div className="flex flex-col justify-between flex-auto md:w-1/3">
                <div className="flex justify-around ">
                    <div className="flex flex-col items-center">
                        <h3 className="font-black tracking-widest text-xs">
                            ACCOUNTs
                        </h3>
                        <span className="font-black text-[var(--so)] text-4xl">
                            {
                                total ? total : "0"
                            }
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="font-black tracking-widest text-xs">
                            RECOVERY
                        </h3>
                        <span className="font-black text-[var(--so)] text-4xl">
                            {
                                value.toFixed(3)
                            }
                        </span>
                        <span className="opacity-25">
                            {
                                `$${inUSD.toFixed(2)}`
                            }
                        </span>
                    </div>
                </div>
                <div className="flex justify-center md:justify-start">
                    <button onClick={handle} className="bg-[var(--so)] text-xs font-[900] text-black rounded-lg py-3 px-8 cursor-pointer">
                        close empty token accounts
                    </button>
                </div>
            </div>






            <div className={`absolute z-10 flex items-center justify-center top-0 left-0 w-full h-full p-8 bg-[#101010] ${showModal ? "block" : "hidden"}`}>

                <button className="text-[var(--so)] absolute top-8 right-8 text-2xl cursor-pointer" onClick={() => window.location.reload()}>
                    <i className="fa-solid fa-circle-xmark"></i>
                </button>

                <div className="flex flex-col items-center gap-4">

                    <div className="text-[var(--so)] text-5xl"> 
                        <i className="fa-solid fa-sack-dollar fa-bounce"></i>
                    </div>

                    <h1 className="text-5xl font-black">
                        +{(closed * 0.002).toFixed(3)} SOL
                    </h1>

                    <p className="text-xs text-center">
                        Closed <b className="font-black text-[var(--so)]">[ {closed} ]</b> empty associated token accounts <br />
                         in  <b className="font-black text-[var(--so)]">[ {(closed / 25).toFixed()} ]</b> transactions.
                    </p>

                    <div className="text-[var(--so)]">
                        <a target="_blank" href={`https://solscan.io/account/${publicKey?.toBase58()}`}>
                            <i className="fa-solid fa-share-nodes"></i>
                        </a>
                    </div>


                </div>
            </div>
        </>
    );
}