import "./globals.css";

import { Inter } from "next/font/google";

import Navigation from "./components/Navigation";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "The Wild Oasis",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />

        <main>{children}</main>
      </body>
    </html>
  );
}