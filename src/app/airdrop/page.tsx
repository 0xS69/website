"use client";
import Link from "next/link";

export default function AirdropPage() {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        const input = form.elements.namedItem("address") as HTMLInputElement;

        if (!input?.value) return;

        window.location.href = `/airdrop/${input.value}`;
    }

    return (
        <div className="flex flex-col p-6 gap-6 h-dvh">
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10">
                        <img src="/logo.png" alt="Ordex" className="rounded-lg" />
                    </div>
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

            <main className="flex-auto flex items-center justify-center text-center">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-xl flex flex-col gap-6"
                >
                    <input
                        name="address"
                        placeholder="Solana wallet address"
                        className="w-full h-12 px-4 text-center rounded-xl
                        bg-zinc-900 border border-zinc-800
                        text-sm text-zinc-200 placeholder:text-zinc-500"
                        autoFocus
                    />

                    <button
                        type="submit"
                        className="h-11 rounded-xl font-black text-sm
                        bg-(--so) text-black"
                    >
                        Check Eligibility
                    </button>

                    <p className="text-xs text-zinc-500">
                        Paste your wallet address to check airdrop eligibility
                    </p>
                </form>
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
