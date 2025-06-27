import type { Metadata } from "next";
import { localFont } from "next/font/local";
import "./globals.css";

import Navbar from "../components/common/Navbar";

const inclusiveSans = localFont({
  src: [
    { path: "./fonts/inclusive-sans.ttf", weight: "400" },
    { path: "./fonts/inclusive-sans-italic.ttf", style: "italic" }],
  variable: "--font-inclusive-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hack4Impact",
  description: "Code for the common good",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inclusiveSans.variable}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
