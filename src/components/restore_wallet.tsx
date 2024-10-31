"use client";

import React, { useState } from 'react';
import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import bs58 from "bs58";
import { derivePath } from "ed25519-hd-key";
import { useRouter } from "next/navigation";
import warning from "@/public/icon/warning.png"; 
import success from "@/public/icon/success.png"; 
import eror from "@/public/icon/error.png"; 
import Notification from '@/components/ui_notification/snackbar';

const RestoreWallet = () => {
  const router = useRouter();
  const [seedPhrase, setSeedPhrase] = useState<string>(""); // Dùng seed phrase từ người dùng
  const [privateKeyInput, setPrivateKeyInput] = useState<string>(""); // Dùng private key từ người dùng
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1'); // Trạng thái tab
  const [notification, setNotification] = useState<string | null>(null); // Trạng thái thông báo
  const [notificationImage, setNotificationImage] = useState<string | undefined>(undefined); // Thay đổi null thành undefined

  // Hàm để khôi phục ví từ seed phrase hoặc private key
  const restoreWallet = async () => {
    setIsLoading(true);
    try {
      let derivedKeypair;

      if (activeTab === 'tab1') { // Nếu đang ở tab seed phrase
        if (!bip39.validateMnemonic(seedPhrase)) {
          setNotification("Invalid Seed phrase!"); // Hiển thị thông báo 
          setNotificationImage(warning.src); // Cập nhật hình ảnh cho thông báo
          setIsLoading(false); 
          setTimeout(() => {
              setNotification(null);
              setNotificationImage(undefined); // Thay đổi null thành undefined
          }, 3000);
          return;
        }
        const seed = await bip39.mnemonicToSeed(seedPhrase);
        const path = `m/44'/501'/0'/0'`;
        derivedKeypair = Keypair.fromSeed(derivePath(path, seed.toString("hex")).key);

      } else if (activeTab === 'tab2') { // Nếu đang ở tab private key
        try {
          const decodedPrivateKey = bs58.decode(privateKeyInput);
          derivedKeypair = Keypair.fromSecretKey(decodedPrivateKey);
        } catch (error) {
          setNotification("Invalid Private key!"); // Hiển thị thông báo 
          setNotificationImage(warning.src); // Cập nhật hình ảnh cho thông báo
          setIsLoading(false); // Đánh dấu nút sao chép đã được bấm
          setTimeout(() => {
              setNotification(null);
              setNotificationImage(undefined); // Thay đổi null thành undefined
          }, 3000);
          return;
        }
      }

      if (!derivedKeypair) {
        setNotification("Unable to create keypair."); // Hiển thị thông báo lỗi
        setNotificationImage(warning.src); // Cập nhật hình ảnh cho thông báo
        // Đặt timeout để ẩn thông báo sau 3 giây
        setIsLoading(false);
        setTimeout(() => {
            setNotification(null);
            setNotificationImage(undefined); // Thay đổi null thành undefined
        }, 3000);

        return; // Thoát hàm nếu không thể tạo keypair
      }

      const publicKey = derivedKeypair.publicKey.toBase58();
      const privateKeyBs58 = bs58.encode(derivedKeypair.secretKey);

      setWalletAddress(publicKey);
      setPrivateKey(privateKeyBs58);

      localStorage.setItem("walletAddress", publicKey);
      localStorage.setItem("privateKey", privateKeyBs58);
      localStorage.setItem("seedPhrase", seedPhrase);

      setTimeout(() => {
        localStorage.setItem("title", 'Import account');
        setNotification("Success"); // Hiển thị thông báo lỗi
        setNotificationImage(success.src); // Cập nhật hình ảnh cho thông báo
        // Đặt timeout để ẩn thông báo sau 3 giây
        router.push("/loading_account");
        setIsLoading(false);
        setTimeout(() => {
            setNotification(null);
            setNotificationImage(undefined); // Thay đổi null thành undefined
        }, 3000);
      }, 2000);
    } catch (error) {
      setNotification("Error"); // Hiển thị thông báo lỗi
        setNotificationImage(eror.src); // Cập nhật hình ảnh cho thông báo
        // Đặt timeout để ẩn thông báo sau 3 giây
        setIsLoading(false);
        setTimeout(() => {
            setNotification(null);
            setNotificationImage(undefined); // Thay đổi null thành undefined
        }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm để xử lý khi nhấp vào tab
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Notification 
                
                message={notification} 
                image={notificationImage} // Truyền hình ảnh vào thông báo
                onClose={() => {
                    setNotification(null);
                    setNotificationImage(undefined);
                }} 
            /> {/* Hiển thị thông báo */}
      <div>
        <p className="text-[#ffffff] text-[150%] font-bold my-5 scale-y-150">Create new account</p>
        <p className="text-[#b4b4b8] text-[90%] font-bold my-3">Enter backup seed phrase associated with the account.</p>
      </div>
  
      {/* Tab Navigation */}
      <div className="flex justify-around mt-5 bg-[#15141F] rounded-xl h-[6vh] ">
        <button
          onClick={() => handleTabClick('tab1')}
          className={`font-bold text-[120%] flex-grow my-1 ml-1 rounded-xl ${activeTab === 'tab1' ? 'bg-[#F5E022] text-[#282635]' : 'bg-[#15141F] text-[#F5E022]'}`}
        >
          Seed phrase
        </button>
        <button
          onClick={() => handleTabClick('tab2')}
          className={`font-bold text-[120%] flex-grow my-1 mr-1 rounded-xl ${activeTab === 'tab2' ? 'bg-[#F5E022] text-[#282635]' : 'bg-[#15141F] text-[#F5E022]'}`}
        >
          Private key
        </button>
      </div>
  
      {/* Nội dung tương ứng với tab */}
      <div className="mt-10 flex-grow">
        {activeTab === 'tab1' && (
          <div>
            <p className="text-[#b4b4b8] text-base font-bold my-3">Seed phrase</p>
            <textarea
              value={seedPhrase}
              onChange={(e) => setSeedPhrase(e.target.value)}
              placeholder="Enter seed phrase"
              className="bg-[#15141F] border border-[#676983] p-2 w-full max-w-[400px] mb-4 text-gray-200 overflow-auto resize-none rounded-xl focus:border-blue-500 focus:outline-none"
              rows={5}
            />
          </div>
        )}
        {activeTab === 'tab2' && (
          <div>
            <p className="text-[#b4b4b8] text-base font-bold my-3">Private key</p>
            <textarea
              value={privateKeyInput}
              onChange={(e) => setPrivateKeyInput(e.target.value)}
              placeholder="Enter private key"
              className="bg-[#15141F] border border-[#676983] p-2 w-full max-w-[400px] mb-4 text-gray-200 overflow-auto resize-none rounded-xl focus:border-blue-500 focus:outline-none"
              rows={5}
            />
          </div>
        )}
      </div>
  
      {/* Nút ở dưới cùng màn hình */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <button
          onClick={restoreWallet}
          disabled={isLoading || (activeTab === 'tab1' ? !seedPhrase : !privateKeyInput)} // Kiểm tra giá trị
          className={`bg-[#F5E022] text-[#323349] px-4 py-2 rounded-xl w-full text-xl ${isLoading || (activeTab === 'tab1' ? !seedPhrase : !privateKeyInput) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Loading...' : 'Continue →'}
        </button>
      </div>
    </div>
  );
  

};

export default RestoreWallet;
