import type { Metadata } from "next";
import "~/style/main.css";

import { Provider } from "~/lib/provider";

export const metadata: Metadata = {
  title: "Ordex",
  description: "Close empty token accounts and reclaim solana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
