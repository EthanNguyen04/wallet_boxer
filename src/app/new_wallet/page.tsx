import WalletInfo from "@/components/ui/wallet_info";

export default function NewWallet() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <header className="row-start-1 items-center justify-center mt-20">
                <p className="text-center text-green-500">Done !</p>
            </header>

            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <WalletInfo/>
            </main>
            
        </div>
    );
}