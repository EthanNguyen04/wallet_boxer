import { Metadata } from "next";
import Load from "@/components/load_account";

export const metadata: Metadata = {
    title: "Creating account",
    description: "Creating account boxer",
};

export default function Creating() {
  return (
    <div style={{
            background: 'linear-gradient(to bottom, #464660 -5%, #14131E 30%, #14131E 50%, #14131E 60%, #14131E 100%)', // Gradient với 4 màu
            }}
        className="flex flex-col min-h-screen p-5 tracking-tighter font-bold">
        <Load/>
    </div>
  )
}
