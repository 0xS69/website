"use client";

import { GetAccounts } from "~/lib/solana";
import { useState } from "react";

export default function CheckPub() {

    const [address, setAddress] = useState("");
    const [report, setReport] = useState<string>("");

    async function check() {
        if (!address) {
            setReport("wallet address required...");
            return;
        }

        try {
            const result = await GetAccounts(address);
            const total = result?.length;

            const value = (0.00203928 * total).toFixed(3);
            setReport(`+${value} SOL . . . ${total} ATAs`);

        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);

            if (msg.includes("Invalid public key input")) {
                setReport("invalid wallet address provided...");
            } else {
                alert(`Unexpected Error: ${msg}`);
            }
        }
    }



    return (
        <div className="flex flex-col md:w-1/3 gap-2">
            <div className="opacity-75 text-xs ml-4">
                <span>
                    Check any wallet address, no connection required...
                </span>
            </div>

            <div className="flex gap-4">
                <input type="text" placeholder="solana wallet address" onChange={(e) => setAddress(e.target.value)}
                    className="bg-white text-black text-center text-xs rounded-lg h-10 flex-auto" />

                <button onClick={check}
                    className="bg-[var(--so)] text-black uppercase font-[900] rounded-lg px-8 text-sm cursor-pointer">
                    Check
                </button>
            </div>

            <div className="ml-2 font-[900] text-[var(--so)]">
                <span>{report}</span>
            </div>

        </div>
    );
}