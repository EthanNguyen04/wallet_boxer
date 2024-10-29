import CreateWallet from "@/components/create_wallet";
import Link from "next/link";

export default function page() {
  return (
    <div className="min-h-[100vh] flex flex-col justify-between pb-20 font-[family-name:var(--font-geist-sans)]">
      {/* Phần nội dung khác nếu có */}

      {/* Phần chứa nút login và deploy luôn nằm dưới cùng màn hình */}
      <div className="max-w-[450px] mt-auto flex flex-col  items-center gap-4">
        <CreateWallet />
      </div>
    </div>
  )
}
