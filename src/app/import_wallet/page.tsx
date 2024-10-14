import RestoreWallet from "@/components/ui/find_wallet";

export default function ImportWallet() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <header className="row-start-1 items-center justify-center mt-20">
                <img
                    className="dark:invert mt-10"
                    src="./public/img/icon.png"
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