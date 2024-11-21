"use client"; // Để component có thể xử lý sự kiện phía client

import { useState } from "react";
import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39"; 
import bs58 from "bs58"; 
import { derivePath } from "ed25519-hd-key"; 
import { useRouter } from "next/navigation"; 
import Link from "next/link";

export default function CreateWallet() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const createWallet = async () => {
    setIsLoading(true);
    const newSeedPhrase = bip39.generateMnemonic(128); 
    const seed = await bip39.mnemonicToSeed(newSeedPhrase); 
    const derivedKeypair = Keypair.fromSeed(derivePath(`m/44'/501'/0'/0'`, seed.toString("hex")).key);
    const publicKey = derivedKeypair.publicKey.toBase58(); 
    const privateKeyBs58 = bs58.encode(derivedKeypair.secretKey); 

    // Lưu vào Local Storage
    localStorage.setItem("walletAddress", publicKey);
    localStorage.setItem("privateKey", privateKeyBs58);
    localStorage.setItem("seedPhrase", newSeedPhrase);
    localStorage.setItem("keypair", JSON.stringify(Array.from(derivedKeypair.secretKey)));

    setTimeout(() => {
      router.push("/create_account"); 
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <button
        className="flex items-center justify-center bg-[#F5E022] text-[#282635] font-bold py-5 rounded-lg border-2 border-solid border-[#F5E022] "
        onClick={createWallet}
        disabled={isLoading}
        style={{ width: "90%", height: "6vh", fontSize: "120%" }}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-3 text-[#282635]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V12H4z" />
            </svg>
            Creating...
          </>
        ) : "Create new account"}
      </button>

      {isLoading ? (
        <div className="opacity-30 w-[90%] h-[6vh] flex items-center justify-center text-[120%] text-[#F5E022] bg-[#15141F] rounded-lg border-2 border-solid border-[#F5E022] py-5">
          <p className="m-0">Import account</p>
        </div>
      ) : (
        <Link href="/import_account" className="w-[90%] h-[6vh] text-[120%] bg-[#15141F] text-[#F5E022] rounded-lg border-2 border-solid border-[#F5E022] flex items-center justify-center py-5">
          <p className="m-0">Import account</p>
        </Link>
      )}
    </>
  );
}
