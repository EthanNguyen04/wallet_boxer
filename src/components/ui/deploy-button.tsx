"use client"; // Để component có thể xử lý sự kiện phía client

import { useState } from "react";
import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39"; // Import thư viện bip39
import bs58 from "bs58"; // Import thư viện bs58
import { derivePath } from "ed25519-hd-key"; // Nhập derivePath từ ed25519-hd-key
import { useRouter } from "next/navigation"; // Import useRouter

export default function DeployButton() {
  const router = useRouter(); // Khởi tạo useRouter
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Trạng thái dialog
  const [walletAddress, setWalletAddress] = useState(""); // Trạng thái để lưu địa chỉ ví
  const [newKeypair, setNewKeypair] = useState<Keypair | null>(null); // Trạng thái để lưu keypair
  const [privateKey, setPrivateKey] = useState<string | null>(null); // Trạng thái để lưu private key
  const [seedPhrase, setSeedPhrase] = useState<string | null>(null); // Trạng thái để lưu seed phrase
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const createWallet = async () => {
    setIsLoading(true); // Bắt đầu trạng thái loading

    // Tạo seed phrase mới
    const newSeedPhrase = bip39.generateMnemonic(128); // 128 bits = 12 từ
    setSeedPhrase(newSeedPhrase); // Lưu seed phrase vào trạng thái

    // Tạo seed từ seed phrase
    const seed = await bip39.mnemonicToSeed(newSeedPhrase); // Tạo seed từ seed phrase

    const path = `m/44'/501'/0'/0'`; // Đường dẫn BIP44
    const derivedKeypair = Keypair.fromSeed(derivePath(path, seed.toString("hex")).key); // Tạo Keypair từ private key

    setNewKeypair(derivedKeypair); // Cập nhật newKeypair
    const publicKey = derivedKeypair.publicKey.toBase58(); // Lấy địa chỉ công khai

    // Chuyển đổi private key sang định dạng Base58
    const privateKeyBs58 = bs58.encode(derivedKeypair.secretKey); // Chuyển đổi private key thành Base58

    // Cập nhật địa chỉ ví và private key vào trạng thái
    setWalletAddress(publicKey);
    setPrivateKey(privateKeyBs58); // Lưu private key dưới định dạng Base58

    // Lưu vào Local Storage
    localStorage.setItem("walletAddress", publicKey);
    localStorage.setItem("privateKey", privateKeyBs58);
    localStorage.setItem("seedPhrase", newSeedPhrase);

    // Sau 2 giây mới điều hướng
     // Sau 2 giây mới điều hướng
     setTimeout(() => {
      router.push("/new_wallet"); // Điều hướng sau khi đã hoàn thành tạo ví
      setIsLoading(false); // Kết thúc trạng thái loading
      closeDialog(); // Đóng dialog
    }, 2000);
  };

  return (
    <>
      <button
        className="bg-[#676983] text-white font-bold py-2 px-4 rounded-lg transition-colors"
        onClick={openDialog}
      >
        Create new
      </button>

      {isDialogOpen && (
        <div
          id="dialog-create-wallet"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
        >
          <div className="bg-[#31354F] p-6 rounded-md shadow-lg w-90">
            <h2 className="text-xl mb-4">Create Wallet</h2>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="bg-gray-900 px-4 py-2 rounded-md text-gray-400"
                onClick={closeDialog}
              >
                Cancel
              </button>
              <button
                className="bg-[#CDBA74] text-white px-4 py-2 rounded-md flex items-center justify-center"
                onClick={createWallet} // Gọi hàm createWallet khi nhấn Confirm
                disabled={isLoading} // Vô hiệu hoá khi đang loading
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V12H4z"
                      ></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
