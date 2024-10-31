import RestoreWallet from "@/components/restore_wallet";
import icon from "@/public/icon/1_coin.png"
import Image from "next/image";
import bg_home from "@/public/background/bg_home.png";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Login boxing",
  };
export default function ImportWallet() {
    return (
        <div 
        style={{
            background: 'linear-gradient(to bottom, #464660 -5%, #14131E 60%, #14131E 60%, #14131E 100%)', // Gradient với 4 màu
            }}  className="flex flex-col min-h-screen p-5 tracking-tighter font-bold">
            <RestoreWallet/>
        </div>
    );
}