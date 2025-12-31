"use client";

import Balance from "~/components/balance";

import ConnectBtn from "~/components/connectBtn";
import CheckPub from "~/components/checkPub";
import Stats from "~/components/stats";

import { useWallet } from "@solana/wallet-adapter-react";

export default function DustBuster() {

    const { publicKey } = useWallet();

    return (
        <div className="dapp">
            <div className="content">
                <header className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="text-3xl">
                            <i className="fa-solid fa-skull"></i>
                        </div>
                        <span className="text-xl font-[900] tracking-widest">
                            ORDEX
                        </span>
                    </div>

                    <div className="flex items-end gap-12">
                        <div className="md:flex hidden gap-5">
                            <a href="https://x.com/OrdexOfficial" aria-label="Twitter">
                                <i className="fa-brands fa-twitter"></i>
                            </a>
                        </div>
                        <div>
                            <ConnectBtn />
                        </div>
                    </div>
                </header>
                <section className="flex flex-col gap-8 flex-auto">
                    <div className="flex flex-col md:w-1/2 gap-4">
                        <div>
                            <h1 className="md:text-6xl text-4xl uppercase text-[var(--so)] font-[900] md:leading-[3rem] leading-[1.5rem]">
                                Dust Buster
                            </h1>
                            <h2 className="text-sm uppercase tracking-widest ml-4 font-medium">
                                Close Accounts
                            </h2>
                        </div>
                        <p className="md:text-base text-xs text-center md:text-left">
                            When you buy or receive spam and airdrop tokens, a small amount of solana is stored in each token
                            account. Even after selling or sending all tokens, the account stays open and holds about 0.002 SOL.
                            This tool closes all empty token accounts so you can get that solana back.
                        </p>
                    </div>

                    {publicKey ? <Stats /> : <CheckPub />}

                    < Balance />

                </section>
                <footer className="md:flex justify-end text-xs hidden ">
                    <span>
                        v0.1.0
                    </span>
                </footer>
            </div>
            <div className="background"></div>
        </div>
    );
}
