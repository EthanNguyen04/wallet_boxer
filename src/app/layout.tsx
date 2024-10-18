import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import bg_home from "@/public/bg_home.png";

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
    <html lang="en">
      <body
      style={{
        backgroundImage: `url(${bg_home.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }} 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
