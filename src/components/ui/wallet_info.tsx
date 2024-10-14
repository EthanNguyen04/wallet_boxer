"use client"; // Đánh dấu đây là Client Component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
const WalletInfo = () => {
    

    const router = useRouter(); // Khởi tạo useRouter
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [seedPhrase, setSeedPhrase] = useState<string[] | null>(null); // seedPhrase sẽ là một mảng các từ
    const [prk, setprk] = useState<string | null>(null);
    const [copySuccess, setCopySuccess] = useState<string | null>(null); // Thông báo sao chép

    useEffect(() => {
        // Lấy dữ liệu từ localStorage
        const address = localStorage.getItem("walletAddress");
        const seed = localStorage.getItem("seedPhrase");
        const prk = localStorage.getItem("privateKey");

        // Cập nhật trạng thái
        setWalletAddress(address);
        setSeedPhrase(seed ? seed.split(" ") : null); // Chuyển seedPhrase thành một mảng các từ
        setprk(prk);
    }, []); // Chỉ chạy một lần khi component được mount

    // Hàm cắt walletAddress chỉ hiển thị 5 ký tự đầu và 5 ký tự cuối
    const formatWalletAddress = (address: string | null) => {
        if (!address) return null;
        return `${address.slice(0, 5)}...${address.slice(-5)}`;
    };

    // Hàm sao chép seed phrase vào clipboard
    const copySeedPhrase = async () => {
        if (seedPhrase) {
            const seedPhraseString = seedPhrase.join(" ");
            const textarea = document.createElement("textarea");
            textarea.value = seedPhraseString;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand("copy");
                setCopySuccess("Sao chép thành công!"); // Thông báo thành công
                router.push("/home");
            } catch (err) {
                console.error('Failed to copy: ', err);
                setCopySuccess("Sao chép thất bại."); // Thông báo thất bại
            }
            document.body.removeChild(textarea);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <p className="text-center mb-4">
                <strong className="text-gray-300">Your Wallet Address:</strong> {formatWalletAddress(walletAddress)}
            </p>

            <div className="grid grid-cols-3 gap-4 w-full max-w-sm p-4 mb-4 border rounded-lg">
                {seedPhrase?.map((word, index) => (
                    <div key={index} className="text-base p-3 flex items-center justify-center">
                        <strong className="mr-2 text-gray-400">{index + 1}:</strong> {word}
                    </div>
                ))}
            </div>

            {/* Nút sao chép seed phrase */}
            <button 
                onClick={copySeedPhrase} 
                className="bg-[#CDBA74] text-[#323349] px-4 py-2 rounded hover:bg-blue-600 mt-2"
            >
                Copy & Next →
            </button>

            {/* Hiển thị thông báo sao chép */}
            {copySuccess && <p className="mt-2 text-green-600">{copySuccess}</p>}
        </div>
    );
};

export default WalletInfo;
