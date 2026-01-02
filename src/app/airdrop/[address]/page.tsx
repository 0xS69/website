import ReportClient from "./ReportClient";

type Props = {
  params: { address: string };
};

export default async function Page({ params }: Props) {
  const report = await fetch(
    "https://raw.githubusercontent.com/0xS69/database/refs/heads/main/address.json",
    { cache: "no-store" }
  );

  const data = await report.json();
  const account = data[params.address] ?? null;

  return (
    <ReportClient
      address={params.address}
      account={account}
    />
  );
}
