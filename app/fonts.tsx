import { Raleway, Poppins } from "next/font/google";

export const raleway = Raleway({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
});
