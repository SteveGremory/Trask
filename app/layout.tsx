import "./globals.css";
import type { Metadata } from "next";
import { Raleway, Poppins } from "next/font/google";
import { Providers } from "./providers";

export const raleway = Raleway({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

// export const metadata: Metadata = {
//   title: "Trask",
//   description: "Manage your tasks.",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
