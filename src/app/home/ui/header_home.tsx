"use client"; // Đánh dấu đây là Client Component 

import { useEffect, useState } from "react";

const HeaderHome = () => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [copySuccess, setCopySuccess] = useState<string>(""); // Trạng thái thông báo sao chép

    useEffect(() => {
        // Lấy dữ liệu từ localStorage
        const address = localStorage.getItem("walletAddress");
        // Cập nhật trạng thái
        setWalletAddress(address);
    }, []); // Chỉ chạy một lần khi component được mount

    // Hàm cắt walletAddress chỉ hiển thị 5 ký tự đầu và 5 ký tự cuối
    const formatWalletAddress = (address: string | null) => {
        if (!address) return null;
        return `${address.slice(0, 5)}...${address.slice(-5)}`;
    };

    // Hàm sao chép walletAddress vào clipboard
    const copyWalletAddress = async () => {
        if (walletAddress) {
            const textarea = document.createElement("textarea");
            textarea.value = walletAddress; // Sao chép walletAddress
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand("copy");
                setCopySuccess("Sao chép địa chỉ ví thành công!"); // Thông báo thành công
            } catch (err) {
                console.error('Failed to copy: ', err);
                setCopySuccess("Sao chép địa chỉ ví thất bại."); // Thông báo thất bại
            }
            document.body.removeChild(textarea);
        }
    };

    return (
        <div className="flex flex-row items-center">
            <p className="text-center">
                <strong className="text-gray-300">Wallet :</strong> {formatWalletAddress(walletAddress)}
            </p>
        </div>
    );
};

export default HeaderHome;
