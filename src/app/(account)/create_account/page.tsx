import CreateAccount from "@/components/create_account";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Info boxer",
    description: "Info boxer",
};

export default function NewWallet() {
    return (
        <div
            style={{
                background: 'linear-gradient(to bottom, #464660 -5%, #14131E 30%, #14131E 50%, #14131E 60%, #14131E 100%)', // Gradient với 4 màu
            }}
            className="flex flex-col min-h-screen p-5 tracking-tighter font-bold"
        >
            <CreateAccount />
        </div>
    );
}
