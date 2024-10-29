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
            background: 'linear-gradient(to bottom, #464660 -5%, #14131E 30%, #14131E 50%, #14131E 60%, #14131E 100%)', // Gradient với 4 màu
        }}  className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <header className="row-start-1 items-center justify-center mt-20">
                <Image
                    className="dark:invert mt-10"
                    src={icon}
                    alt="Boxer logo"
                    width={100}
                    height={100}
                    />
            </header>

            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <RestoreWallet/>
            </main>
        </div>
    );
}