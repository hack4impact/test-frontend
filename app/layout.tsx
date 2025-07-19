import { MotionToggle } from "@/components/a11y/MotionToggle";
import ClickSpark from "@/components/layout/ClickSpark";
import { MotionProvider } from "@/contexts/MotionContext";
import type { Metadata } from "next";
import localFont from "next/font/local";

import Navbar from "../components/layout/Navbar";
import "./globals.css";

const inclusiveSans = localFont({
  src: [
    {
      path: "./fonts/inclusive-sans.ttf",
      weight: "300 700", // or whatever range your variable font supports
      style: "normal",
    },
    {
      path: "./fonts/inclusive-sans-italic.ttf",
      weight: "300 700", // same range for italic
      style: "italic",
    },
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
      <body className="text-brand-black">
        <MotionProvider>
          <Navbar />
          <ClickSpark sparkColor="#10b875">{children}</ClickSpark>
          <MotionToggle />
        </MotionProvider>
      </body>
    </html>
  );
}
