import ClickSpark from "@/components/common/ClickSpark";
import type { Metadata } from "next";
import localFont from "next/font/local";

import Navbar from "../components/common/Navbar";
import "./globals.css";

const inclusiveSans = localFont({
  src: [
    { path: "./fonts/inclusive-sans.ttf", weight: "400" },
    { path: "./fonts/inclusive-sans-italic.ttf", style: "italic" },
  ],
  variable: "--font-inclusive-sans",
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
    <html lang="en" className={`${inclusiveSans.variable}`}>
      <body className="ext-(--primary)">
        <Navbar />
        <ClickSpark sparkColor="#10B875">{children}</ClickSpark>
      </body>
    </html>
  );
}
