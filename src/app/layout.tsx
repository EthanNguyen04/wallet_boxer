import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import bg from "@/public/background/bg_home.png";

const geistSans = localFont({
  src: "./fonts/FrancoisOne-Regular.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/FrancoisOne-Regular.ttf",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Wallet",
  description: "Wallet boxer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
    >
      <body
      style={{
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, #14131E 100%)',
      }} 
      className={`max-w-[450px] h-full mx-auto border-2 border-solid border-[#14131E] ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
