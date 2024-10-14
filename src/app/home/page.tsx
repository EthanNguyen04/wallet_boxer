import HeaderHome from "@/app/home/ui/header_home";
import Image from "next/image";
import f1 from "./images/Frame1.png"
import f2 from "./images/Frame2.png"
import f3 from "./images/Frame3.png"
import f4 from "./images/Frame4.png"

export default function HomeWallet() {
     // Trạng thái để theo dõi component được chọn

    // Các component sẽ được hiển thị trong main

    return (
        <div className="min-h-[100vh] flex flex-col justify-between pb-20 font-[family-name:var(--font-geist-sans)]">
            <header className="flex flex-col">
                <HeaderHome />
            </header>

            <main className="flex flex-col items-center sm:items-start">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Nội dung chính */}
                </div>
            </main>

            <footer className="flex flex-row items-center justify-between p-1">
                <Image
                src={f1}
                alt="Picture of the author"
                width={70} 
                height={70} 
                />
                <Image
                src={f2}
                alt="Picture of the author"
                width={70} 
                height={70} 
                />
                <Image
                src={f3}
                alt="Picture of the author"
                width={70} 
                height={70} 
                />
                <Image
                src={f4}
                alt="Picture of the author"
                width={70} 
                height={70} 
                />
            </footer>
        </div>
    );
}
