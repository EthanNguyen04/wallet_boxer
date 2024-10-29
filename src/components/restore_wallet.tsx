"use client"; // Để component có thể xử lý sự kiện phía client

import { useState } from "react";
import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39"; // Import thư viện bip39
import bs58 from "bs58"; // Import thư viện bs58
import { derivePath } from "ed25519-hd-key"; // Nhập derivePath từ ed25519-hd-key
import { useRouter } from "next/navigation"; // Import useRouter

const RestoreWallet = () => {
  const router = useRouter(); // Khởi tạo useRouter

  const [seedPhrase, setSeedPhrase] = useState<string[]>(Array(12).fill("")); // Seed phrase từ người dùng nhập
  const [fullSeedPhrase, setFullSeedPhrase] = useState<string>(""); // Chuỗi chứa toàn bộ 12 từ dán vào
  const [walletAddress, setWalletAddress] = useState<string | null>(null); // Public Key của ví
  const [privateKey, setPrivateKey] = useState<string | null>(null); // Private Key của ví
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading

  // Hàm cập nhật seed phrase khi người dùng nhập vào từng ô
  const handleInputChange = (index: number, value: string) => {
    const updatedSeed = [...seedPhrase];
    updatedSeed[index] = value;
    setSeedPhrase(updatedSeed);
  };

  // Hàm xử lý khi người dùng dán chuỗi seed phrase đầy đủ
  // Hàm xử lý khi người dùng dán chuỗi seed phrase đầy đủ
const handleFullSeedPhraseChange = (value: string) => {
  const words = value.trim().split(/\s+/); // Tách chuỗi thành mảng các từ

  if (words.length === 12 && bip39.validateMnemonic(words.join(" "))) {
    setSeedPhrase(words); // Cập nhật mảng seed phrase nếu có đủ 12 từ và hợp lệ
    setFullSeedPhrase(value); // Cập nhật chuỗi đầy đủ seed phrase
  } else {
    alert("Seed phrase phải có đúng 12 từ và hợp lệ!"); // Thông báo nếu số lượng từ không đúng hoặc không hợp lệ
  }
};


  // Hàm cắt walletAddress chỉ hiển thị 5 ký tự đầu và 5 ký tự cuối
  const formatWalletAddress = (walletAddress: string | null) => {
    if (!walletAddress) return null;
    return `${walletAddress.slice(0, 5)}...${walletAddress.slice(-5)}`;
  };

  // Hàm khôi phục ví Solana từ seed phrase
  const restoreWallet = async () => {
    setIsLoading(true); // Bắt đầu loading
    try {
      const mnemonic = seedPhrase.join(" "); // Chuyển seed phrase thành chuỗi
      const isValid = bip39.validateMnemonic(mnemonic); // Kiểm tra tính hợp lệ của seed phrase

      if (!isValid) {
        alert("Seed phrase không hợp lệ");
        setIsLoading(false);
        return;
      }

      const seed = await bip39.mnemonicToSeed(mnemonic); // Tạo seed từ seed phrase
      const path = `m/44'/501'/0'/0'`; // Đường dẫn BIP44
      const derivedKeypair = Keypair.fromSeed(derivePath(path, seed.toString("hex")).key); // Tạo keypair từ seed

      const publicKey = derivedKeypair.publicKey.toBase58(); // Lấy public key
      const privateKeyBs58 = bs58.encode(derivedKeypair.secretKey); // Chuyển private key sang định dạng Base58

      setWalletAddress(publicKey); // Cập nhật public key
      setPrivateKey(privateKeyBs58); // Cập nhật private key
      localStorage.setItem("walletAddress", publicKey);
      localStorage.setItem("privateKey", privateKeyBs58);
      localStorage.setItem("seedPhrase", mnemonic);

          // Sau 2 giây mới điều hướng
        // Sau 2 giây mới điều hướng
        setTimeout(() => {
          router.push("/home"); // Điều hướng sau khi đã hoàn thành tạo ví
          setIsLoading(false); // Kết thúc trạng thái loading
        }, 2000);
    } catch (error) {
      console.error("Khôi phục ví thất bại:", error);
    } finally {
      setIsLoading(false); // Kết thúc loading
    }

  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-xl font-semibold mb-4">Input Seed Phrase</h2>

      {/* Nhập toàn bộ seed phrase vào một ô */}
      <textarea 
        placeholder="Nhập hoặc dán 12 từ seed phrase"
        onChange={(e) => handleFullSeedPhraseChange(e.target.value)} // Gọi hàm xử lý khi thay đổi
        className="bg-[#31354F] border p-2 w-full max-w-[400px] mb-4 text-gray-200 overflow-auto resize-none rounded-lg" // Sử dụng overflow-auto để cuộn và resize-none để không cho phép thay đổi kích thước
        rows={5} // Thiết lập số hàng mặc định
      />

      {/* Nút khôi phục ví */}
      <button
        onClick={restoreWallet}
        className="bg-[#CDBA74] text-white py-2 px-4 rounded hover:bg-blue-600"
        disabled={isLoading} // Vô hiệu hóa nút khi đang loading
      >
        {isLoading ? "Loading..." : "Khôi phục ví →"}
      </button>

      {/* Hiển thị public key và private key sau khi khôi phục */}
      {walletAddress && privateKey && (
        <div className="mt-4">
          <strong className="text-gray-300">Your Wallet Address:</strong> {formatWalletAddress(walletAddress)}
          <br />
          <strong className="text-gray-300">Your Seed Phrase:</strong> {fullSeedPhrase}
        </div>
      )}
    </div>
  );
};

export default RestoreWallet;
