type Props = {
    params: { address: string };
};

export default async function ReportPage({ params }: Props) {
    const urlAddress = params.address;

    const report = await fetch(
        "https://raw.githubusercontent.com/0xS69/database/refs/heads/main/address.json",
        { cache: "no-store" }
    );

    const data = await report.json();
    const account = data[urlAddress];

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
                <a href="/" className="border bg-(--so) text-black text-xs font-black
                h-10 px-8 flex items-center rounded-lg">
                    LET'Z GO
                </a>
            </header>

            <main className="flex-auto flex flex-col justify-center items-center gap-8 text-center">

                <div className="w-full max-w-xl p-8 flex flex-col gap-5">

                    <span className="uppercase text-xs tracking-widest text-zinc-400">
                        Airdrop Status
                    </span>

                    {/* Short Address */}


                    {/* ✅ Eligible */}
                    {account ? (
                        <>


                            <div className="mt-2 text-5xl font-black">
                                {account.amount} <span className="text-(--so)">$DX</span>
                            </div>

                            <span className="text-xs text-zinc-500">
                                {urlAddress}
                            </span>

                        </>
                    ) : (
                        <>
                            <h1 className="text-3xl md:text-4xl font-black text-(--so)">
                                {urlAddress.slice(0, 2)}...{urlAddress.slice(-4)}
                            </h1>

                            <p className="text-xs text-zinc-300 uppercase">
                                This wallet is not eligible for the airdrop yet.
                            </p>
                        </>
                    )}
                </div>

                {/* Info */}
                <div className="md:w-1/4 w-full text-xs text-zinc-400 leading-relaxed">
                    <p>
                        close empty token accounts to reclaim solana rent and improve your
                        engagement may result in higher airdrop allocations.
                    </p>
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
