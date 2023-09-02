import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { poppins } from "./fonts";

export const metadata: Metadata = {
  title: "Trask",
  description: "Manage your tasks.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="select-none">
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
