"use client"; // Đánh dấu đây là Client Component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import copy_ic from "@/public/icon/copy.png"; 
import success from "@/public/icon/success.png"; 
import eror from "@/public/icon/error.png"; 
import Noti from "@/components/ui_notification/snackbar"
import bs58 from "bs58"; 

//test smcontract
import { Connection, PublicKey, clusterApiUrl, Keypair, SystemProgram } from '@solana/web3.js';
import {Program, AnchorProvider, Wallet} from '@project-serum/anchor';
import { CustomWallet } from '@/class/CustomWallet'; // Import CustomWallet

import idl from './idl.json'; // Đường dẫn chính xác đến file IDL

const CreateAccount = () => {
    
    const router = useRouter();
    const [seedPhrase, setSeedPhrase] = useState<string | null>(null);
    const [wl, setwl] = useState<string | null>(null);

    const [hasText, setHasText] = useState(false);
    const [message, setMessage] = useState('0/25'); // Đặt trạng thái ban đầu cho số ký tự
    const [isLimitExceeded, setIsLimitExceeded] = useState(false); // Trạng thái khi vượt giới hạn
    const [isCopyClicked, setIsCopyClicked] = useState(false); // Trạng thái khi nút sao chép được bấm

    const [notification, setNotification] = useState<string | null>(null); // Trạng thái thông báo
    const [notificationImage, setNotificationImage] = useState<string | undefined>(undefined); // Thay đổi null thành undefined

    useEffect(() => {
        const seed = localStorage.getItem("seedPhrase");
        setwl(localStorage.getItem("walletAddress"));
        setSeedPhrase(seed);
    }, []);

   //smcontract
   const [boxerName, setBoxerName] = useState('');
   const boxerWallet = localStorage.getItem("walletAddress");
   const privateKeyBs58 = localStorage.getItem("privateKey"); // đây là dang base58


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        // Kiểm tra giới hạn độ dài
        if (newValue.length <= 25) {
            setBoxerName(newValue); // Cập nhật giá trị
            setMessage(`${newValue.length}/25`); // Cập nhật thông báo độ dài
            setHasText(newValue.length > 0); // Cập nhật trạng thái có nội dung
            setIsLimitExceeded(false); // Không hiển thị cảnh báo
        } else {
            setMessage("Limit exceeded!"); // Thông báo khi vượt giới hạn
            setIsLimitExceeded(true); // Hiển thị cảnh báo
        }
    };




    const programId = new PublicKey(idl.address); // Lấy địa chỉ từ IDL
    const network = 'https://api.devnet.solana.com'; // hoặc URL của devnet
    const opts = {
    preflightCommitment: 'processed',
    };

    const handleCreateClick = async  () => {
       
        if (!boxerWallet || !privateKeyBs58) {
            alert("Missing wallet or private key information.");
            return;
        }

        const privateKey = bs58.decode(privateKeyBs58);
        const userKeypair = Keypair.fromSecretKey(privateKey);
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        
        const programId = new PublicKey(idl.address); // Sử dụng địa chỉ từ IDL
        const provider = new AnchorProvider(connection, new Wallet(userKeypair), { commitment: 'confirmed' });
        
        // Khởi tạo Program với IDL
        const program = new Program(idl, programId, provider);

        // Tạo boxer account mới
        const boxerAccount = Keypair.generate();


        try {
            // Tạo giao dịch
        const tx = await program.rpc.add_boxer(boxerName, boxerWallet, {
            accounts: {
                boxer: boxerAccount.publicKey,
                user: userKeypair.publicKey,
                systemProgram: SystemProgram.programId,
            },
        });

        // Gửi giao dịch và xác nhận
        const txSignature = await provider.sendAndConfirm(tx, [userKeypair, boxerAccount]);


            // Hiển thị kết quả
            setNotification("Boxer created successfully!");
            setNotificationImage(success.src);
            setTimeout(() => {
                setNotification(null);
                setNotificationImage(undefined);
            }, 3000);
            setMessage("Transaction signature:"+ txSignature);

             // Lưu walletName vào localStorage
            localStorage.setItem("walletName", boxerName);
            // Chuyển đến trang tiếp theo
            localStorage.setItem("title", 'Create new account');
            //router.push("/loading_account");
            
        } catch (err) {
            setNotification("Error creating boxer!");
            setNotificationImage(eror.src);
            setTimeout(() => {
                setNotification(null);
                setNotificationImage(undefined);
            }, 3000);
            setMessage("Error during transaction:"+ err);
        }
    };
    const handleCopyClick = async () => {
        if (seedPhrase) {
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    // Phương pháp chính với navigator.clipboard
                    await navigator.clipboard.writeText(seedPhrase);
                } else {
                    // Fallback với document.execCommand
                    const textArea = document.createElement("textarea");
                    textArea.value = seedPhrase;
                    textArea.style.position = "fixed"; // Đảm bảo không làm xáo trộn UI
                    textArea.style.opacity = "0";
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand("copy");
                    document.body.removeChild(textArea);
                }
                setNotification("Seed phrase copied!");
                setNotificationImage(success.src);
                setIsCopyClicked(true);
                setTimeout(() => {
                    setNotification(null);
                    setNotificationImage(undefined);
                }, 3000);
            } catch (err) {
                setNotification("Error copy!");
                setNotificationImage(eror.src);
                setIsCopyClicked(false);
                setTimeout(() => {
                    setNotification(null);
                    setNotificationImage(undefined);
                }, 3000);
            }
        }
    };
    

    return (
        <div className="flex flex-col w-full h-[100vh] pb-10">
            <Noti 
                
                message={notification} 
                image={notificationImage} // Truyền hình ảnh vào thông báo
                onClose={() => {
                    setNotification(null);
                    setNotificationImage(undefined);
                }} 
            /> {/* Hiển thị thông báo */}
            <p className="text-[#ffffff] text-[25px] font-bold my-5 scale-y-150">Create new account</p>
            <div className="flex-grow">
                <p className="text-[#b4b4b8] font-bold my-2">Wallet name</p>
                <input
                    value={boxerName}
                    className={`border rounded-xl w-full h-10 px-4 py-2 placeholder-gray-700 ${isLimitExceeded ? 'border-red-500' : hasText ? 'border-[#F5E022]' : 'border-[#676983]'}
                    bg-[#15141F] focus:border-blue-500 focus:outline-none`}
                    placeholder="Enter user name"
                    onChange={handleInputChange}
                />
                <p
                    className={`text-right font-bold my-2 ${isLimitExceeded ? 'text-red-500 animate-blink' : 'text-[#b4b4b8]'}`}
                >
                    {message}
                </p>
                <p
                    className={`text-right font-bold my-2 ${isLimitExceeded ? 'text-red-500 animate-blink' : 'text-[#b4b4b8]'}`}
                >
                    {wl}
                </p>
                <style jsx>{`
                    @keyframes blink {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0; }
                    }
                    .animate-blink {
                        animation: blink 1s linear infinite;
                    }
                `}</style>
                
                <div className="w-full mt-5 flex flex-col p-4 rounded-lg"
                    style={{ boxShadow: 'inset 0 0 0 1px #676983',
                        background: 'linear-gradient(to bottom, #444458 37%, #2A2B3E 81%, #26273A 100%)',
                    }}>
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex-col">
                            <p className="text-xl text-[#ffffff] scale-y-150">Seed phrase</p>
                            <p className="text-[#b4b4b8] text-sm scale-y-120 mt-2">We have created a unique</p>
                        </div>

                        <div className="copy rounded-xl flex items-center justify-center py-3 px-4" 
                            style={{ boxShadow: 'inset 0 0 0 1px #676983'}}
                            onClick={handleCopyClick} // Thêm sự kiện bấm cho nút sao chép
                        >
                            <Image 
                                src={copy_ic}
                                alt="Image copy"
                                className="w-4 mr-2" // Thêm margin bên phải để tạo khoảng cách giữa biểu tượng và văn bản
                            />
                            <p className="text-[#F5E022] text-xs">Copy</p>
                        </div>
                    </div>

                    <div 
                        className="bg-[#15141F] p-5 rounded-xl mt-3 relative" 
                        style={{ boxShadow: 'inset 0 0 0 1px #676983' }}
                    >
                        {/* Nội dung với hiệu ứng nhòe khi sao chép */}
                        <p className={`${isCopyClicked ? 'blur-sm' : ''} transition duration-300`}>
                            {seedPhrase}
                        </p>
                    </div>


                </div>
            </div>

            {/* Nút tạo tài khoản ở dưới cùng */}
            <div className="flex flex-col items-center gap-4">
                <button 
                    onClick={handleCreateClick} // Chuyển đến trang tiếp theo
                    disabled={!hasText || isLimitExceeded || !isCopyClicked} // Vô hiệu hóa nút nếu không hợp lệ
                    className={`bg-[#F5E022] text-[#323349] px-4 py-2 rounded-xl w-full text-xl ${(!hasText || isLimitExceeded || !isCopyClicked) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Create →
                </button>
            </div>
        </div>
    );
};

export default CreateAccount;
