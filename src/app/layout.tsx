import "~/style/main.css";
import type { Metadata } from "next";

import { Rajdhani } from 'next/font/google';
const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['400', '700'] });

import { Provider } from "~/lib/provider";

export const metadata: Metadata = {
  title: "Ordex",
  description: "Burn worthless tokens, close accounts, reclaim solana...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={rajdhani.className}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css"
        />
      </head>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
