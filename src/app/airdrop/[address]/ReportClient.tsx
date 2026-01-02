"use client";

import Link from "next/link";

export default function ReportClient({
  address,
  account,
}: {
  address: string;
  account: any;
}) {
  return (
    <div className="flex flex-col p-6 gap-6 h-dvh">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" className="w-10 h-10 rounded-lg" />
          <span className="text-lg mt-1.5 tracking-widest uppercase font-black text-(--so)">
            Ordex
          </span>
        </div>

        <Link
          href="/"
          className="border bg-(--so) text-black text-xs font-black
                     h-10 px-8 flex items-center rounded-lg"
        >
          LET&apos;Z GO
        </Link>
      </header>

      <main className="flex-auto flex flex-col justify-center items-center gap-8 text-center">
        <div className="w-full max-w-xl p-8 flex flex-col gap-5">
          <span className="uppercase text-xs tracking-widest text-zinc-400">
            Airdrop Status
          </span>

          {account ? (
            <>
              <div className="mt-2 text-5xl font-black">
                {account.amount} <span className="text-(--so)">$DX</span>
              </div>
              <span className="text-xs text-zinc-500">{address}</span>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-black text-(--so)">
                {address.slice(0, 2)}...{address.slice(-4)}
              </h1>
              <p className="text-xs uppercase text-zinc-300">
                This wallet is not eligible for the airdrop yet.
              </p>
            </>
          )}
          <div className="md:w-1/4 w-full text-xs text-zinc-400 leading-relaxed">
            <p>
              close empty token accounts to reclaim solana rent and improve your
              engagement may result in higher airdrop allocations.
            </p>
          </div>
        </div>
      </main>
      <footer className="flex justify-between text-xs text-zinc-600">
        <div className="uppercase">
          <span>under development...</span>
        </div>
        <div>
          <span>v0.1.0 \ 001</span>
        </div>
      </footer>
    </div>
  );
}
