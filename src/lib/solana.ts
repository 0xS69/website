import { TOKEN_PROGRAM_ID, createCloseAccountInstruction } from "@solana/spl-token";
import { PublicKey, Connection, Transaction, ParsedAccountData, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";

const connection = new Connection("https://solana-rpc.publicnode.com", "confirmed");

const coffee = new PublicKey("Gwi6HVRcJa8D3RWKAgGytPwnthcJQyxV47h8sHebqWqX");

export async function GetAccounts(address: string): Promise<string[]> {

    const pubkey = new PublicKey(address);

    const response = await connection.getParsedTokenAccountsByOwner(pubkey, {
        programId: TOKEN_PROGRAM_ID,
    });

    const vacantAccounts = response.value.filter((token) => {
        const parsedData = token.account.data as ParsedAccountData;
        const amount = parsedData?.parsed?.info?.tokenAmount?.uiAmount;

        return amount === 0;

    }).map((account) => account.pubkey.toBase58());

    return vacantAccounts;

}




export async function CloseAccounts( 
        accounts: string[], signer: PublicKey, connection: Connection,
        signAllTransactions: (txs: Transaction[]) => Promise<Transaction[]>

    ) : Promise<number> {


    const emptyAccounts = accounts.slice(0, 500);

    const BATCH_SIZE = 25;
    const batches = [];

    for (let i = 0; i < emptyAccounts.length; i += BATCH_SIZE) {
        batches.push(emptyAccounts.slice(i, i + BATCH_SIZE));
    }

    const transactions: Transaction[] = [];
    const { blockhash } = await connection.getLatestBlockhash();

    for (const batch of batches) {

        const tx = new Transaction();

        tx.feePayer = signer;
        tx.recentBlockhash = blockhash;

        let batchLamports = 0;

        for (const token of batch) {
            tx.add(
                createCloseAccountInstruction(
                    new PublicKey(token),
                    signer,
                    signer,
                    []
                )
            );

            batchLamports += 0.002 * LAMPORTS_PER_SOL;
        }

        tx.add(
            SystemProgram.transfer({
                fromPubkey: signer,
                toPubkey: coffee,
                lamports: Math.floor(batchLamports * 0.1),
            })
        );

        transactions.push(tx);
    }


    let closedAccounts = 0;

    try {

        const signedTxs = await signAllTransactions(transactions);

        for (let i = 0; i < signedTxs.length; i++) {
            const sig = await connection.sendRawTransaction(signedTxs[i].serialize());
            await connection.confirmTransaction(sig, "confirmed");

            closedAccounts += batches[i].length;

        }

    } catch (err) {

        console.error("Failed to close batches:", err);
    }


    return closedAccounts; 
}





export async function GetBalance(): Promise<number> {

    try {
        const lam = await connection.getBalance(coffee);
        const inSol = lam / LAMPORTS_PER_SOL;

        return inSol * 20;

    } catch (err) {
        console.error(err);
        throw err;
    }

}