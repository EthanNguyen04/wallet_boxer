"use client"; // Đánh dấu đây là Client Component   

import Image from "next/image";
import f1 from "@/public/Frame1.png";
import f2 from "@/public/Frame2.png";
import f3 from "@/public/Frame3.png";
import f4 from "@/public/Frame4.png";
import fPlay from "@/public/bg_play.gif";
import fTap from "@/public/Frame_tap.png";
import avata from "@/public/ava.png"; 
import coin from "@/public/1_coin.png"; 
import money from "@/public/2_money.png"; 
import cup from "@/public/3_cup.png"; 
import next from "@/public/next_icon.png"; 
import tapBtn from "@/public/tap_btn.png"; 
import energy from "@/public/E_icon.png"; 
import nv from "@/public/nv.png"; 
import nv2 from "./image/nv2.png"; 

import { useEffect, useState } from "react";

const Index = () => { 

    const [isFaded, setIsFaded] = useState(false);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const address = localStorage.getItem("walletAddress");

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

    

    const [currentImage, setCurrentImage] = useState(nv); // Đặt hình ảnh ban đầu

    const handleClick = () => {
        setIsFaded(true);
        
        // Sau khi nhấn, đổi hình ảnh từ tapBtn sang nv2
        setCurrentImage(nv2); 

        // Đặt lại độ mờ và hình ảnh sau một thời gian nhất định (200ms)
        setTimeout(() => {
        setIsFaded(false);
        setCurrentImage(nv);
        }, 50);
    };




    return (
        <div className="flex main flex-col items-center w-full h-screen">
          {/* Container cho play và tap */}
            <div className="flex flex-col h-full w-full">
                {/* Play Section */}
                <div
                className="flex flex-col w-full h-[55%] items-center bg-cover bg-center"
                style={{ backgroundImage: `url(${fPlay.src})` }}
                >
                <div className="items-center header flex flex-col mt-1 w-[98%] bg-gradient-to-b from-[#444458] via-[#2A2B3E] to-[#26273A] rounded-lg shadow-inner shadow-gray-600"
                    style={{ boxShadow: 'inset 0 0 0 1px #676983',}}>
                    {/* Hàng chứa avatar và văn bản */}
                    <div className="flex items-center w-full space-x-3 pl-4 pr-4 pt-1">
                    <Image
                        src={avata}
                        alt="Image avata"
                        className="cursor-pointer rounded-full w-6"
                    />
                    <p className="flex justify-center items-center text-center text-xs">
                        <strong className="text-gray-300 mr-1 font-extralight">ID</strong>
                        {formatWalletAddress(walletAddress)}
                    </p>
                    <Image
                            src={next}
                            alt="Image avata"
                            className="cursor-pointer rounded-full w-4"
                        />
                    </div>
                    <div className="flex flex-row w-full items-center text-center justify-evenly mb-1 mt-2">
                        <div className="flex items-center max-w-[30%] min-w-[30%] space-x-3 bg-gradient-to-b from-[#26273A] via-[#2A2B3E] to-[#444458] rounded-lg shadow-inner shadow-gray-600 pr-2 p-1"
                            style={{ boxShadow: 'inset 0 0 0 1px #676983',}}>
                            <Image
                                src={coin}
                                alt="Image avata"
                                className="cursor-pointer rounded-full w-4"
                            />
                            <p className="justify-center text-xs">
                                237,16k
                            </p>
                        </div>
                        <div className="flex items-center min-w-[30%] space-x-3 bg-gradient-to-b from-[#26273A] via-[#2A2B3E] to-[#444458] rounded-lg shadow-inner shadow-gray-600 pr-2 p-1"
                            style={{ boxShadow: 'inset 0 0 0 1px #676983',}}>                        
                            <Image
                                src={money}
                                alt="Image avata"
                                className="cursor-pointer rounded-full w-4"
                            />
                            <p className="flex justify-center items-center text-center text-xs">
                                200,25k
                            </p>
                        </div>
                        <div className="flex items-center min-w-[30%] space-x-3 bg-gradient-to-b from-[#26273A] via-[#2A2B3E] to-[#444458] rounded-lg shadow-inner shadow-gray-600 pr-2 p-1"
                            style={{ boxShadow: 'inset 0 0 0 1px #676983',}}>
                            <Image
                                src={cup}
                                alt="Image avata"
                                className="cursor-pointer rounded-full w-4"
                            />
                            
                            <p className="flex justify-center items-center text-center text-xs text-[#F5E022]">
                                <strong className="text-gray-300 font-extralight mr-1">RANK: </strong>
                                1110
                            </p>

                            <Image
                                src={next}
                                alt="Image avata"
                                className="cursor-pointer rounded-full w-4"
                            />
                        </div>
                    </div>
                    
                </div>

                <div className="flex-grow flex items-end w-full justify-center">
                    <Image
                        src={currentImage}
                        alt="Image avata"
                        className="cursor-pointer w-[50%] mr-30 mb-5"
                    />
                </div>
            </div>
    
            {/* Tap Section */}
            <div
              className="w-full h-[45%] bg-cover bg-center items-center flex flex-col justify-end"
              style={{ backgroundImage: `url(${fTap.src})` }}
            >
                <div className="mb-[10%] justify-top items-center header flex flex-row w-[90%] bg-gradient-to-r from-[#FDCD19] to-[#77779B] rounded-xl shadow-xl"
                    style={{ 
                        boxShadow: '0 5px 10px #282635'
                    }}>

                    <div className="flex items-center w-full">
                        <Image
                            src={energy}
                            alt="Image avata"
                            className="cursor-pointer w-10 pl-1"
                        />
                        <div className="flex flex-col w-full px-1 ">
                            <p className="flex text-center text-xs text-[#323349] pt-1 pl-1">
                                ENERGY
                            </p>
                            <div className=" h-3 m-1 flex flex-row w-[70%] px-1 bg-gradient-to-r from-[#4C455B] to-[#313249] rounded-3xl overflow-hidden">
                                
                            
                            </div>
                        </div>
                        <div className="p-3 flex flex-row w-full bg-gradient-to-r from-[#36374C] to-[#36374C] justify-center items-center" 
                            style={{ 
                                background: 'linear-gradient(to left, rgba(54, 55, 76, 1) 16%, rgba(54, 55, 76, 0) 100%)',
                                borderRadius: '50px 20px 20px 50px', 
                                boxShadow: 'inset 0 0 0 0.5px #36374C',
                            }}>
                            <p className="flex text-center text-sm text-[#323349] pr-1 text-[#F5E022]">
                                5500
                            </p>
                            <p className="flex text-center text-sm text-[#323349] pr-1 text-[#fff]">
                                / 
                            </p>
                            <p className="flex text-center text-sm text-[#323349] pr-1 text-[#fff]">
                                10000
                            </p>
                            <Image
                                src={coin}
                                alt="Image avata"
                                className="rounded-full w-[15%] ml-1"
                            />
                        </div>
                    </div>
                    <div>

                    </div>
                </div>


                <Image
                    src={tapBtn}
                    alt="Image avata"
                    className="cursor-pointer rounded-full w-[35%] mb-2"
                    style={{ opacity: isFaded ? 0.8 : 1 }} // Giảm độ mờ xuống 40%
                    onClick={handleClick} // Gọi hàm khi nhấn
                />
       

              {/* Navigation Images nằm dưới cùng */}
                <div className="flex flex-row items-center justify-between px-2 pb-2">
                    {[f1, f2, f3, f4].map((frame, index) => (
                    <Image
                        key={index}
                        src={frame}
                        alt={`Image ${index + 1}`}
                        className="cursor-pointer"
                        style={{ width: '24%', height: 'auto' }}
                    />
                    ))}
                </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default Index;