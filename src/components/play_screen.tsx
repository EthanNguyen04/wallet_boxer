"use client"; // Đánh dấu đây là Client Component   

import Image from "next/image";
import bg_menu from "@/public/background/bg_menu.png";
import bg_menu_select from "@/public/background/bg_menu_select.png";

import fPlay from "@/public/background/bg_play.gif";
import fTap from "@/public/background/bg_home.png";
import avata from "@/public/icon/avata.png"; 
import coin from "@/public/icon/1_coin.png"; 
import money from "@/public/icon/2_money.png"; 
import cup from "@/public/icon/3_cup.png"; 
import next from "@/public/icon/next_icon.png"; 
import tapBtn from "@/public/button/tap_btn.png"; 
import energy from "@/public/icon/energy.png"; 
import dt1 from "@/public/img_damt/dt1.png"; 
import dt2 from "@/public/img_damt/dt2.png"; 
import dt3 from "@/public/img_damt/dt3.png"; 
import dt4 from "@/public/img_damt/dt4.png"; 
import dt5 from "@/public/img_damt/dt5.png"; 
import dp1 from "@/public/img_damp/dp1.png"; 
import dp2 from "@/public/img_damp/dp2.png"; 
import dp3 from "@/public/img_damp/dp3.png"; 
import dp4 from "@/public/img_damp/dp4.png"; 
import dp5 from "@/public/img_damp/dp5.png"; 

import n1 from "@/public/img_start/n01.png";
import n3 from "@/public/img_start/n03.png";
import n4 from "@/public/img_start/n04.png";
import n5 from "@/public/img_start/n05.png";
import n6 from "@/public/img_start/n06.png";
import n7 from "@/public/img_start/n07.png";
import n8 from "@/public/img_start/n08.png";
import n9 from "@/public/img_start/n09.png";
import n10 from "@/public/img_start/n10.png";
import n11 from "@/public/img_start/n11.png";
import n12 from "@/public/img_start/n12.png";
import n13 from "@/public/img_start/n13.png";
import n14 from "@/public/img_start/n14.png";
import n15 from "@/public/img_start/n15.png";
import n17 from "@/public/img_start/n17.png";




import { useEffect, useState } from "react";

const PlayScreen = () => { 
    const autoImages =  [n1, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12, n13, n14, n15, n17]; // Mảng chứa các hình ảnh tự động chạy
    const clickImages1 = [dt1, dt2, dt3, dt4, dt5]; // Mảng chứa các hình ảnh khi bấm
    const clickImages2 = [dp1, dp2, dp3, dp4,dp5]; // Mảng chứa các hình ảnh khi bấm
    const [isFaded, setIsFaded] = useState(false);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [walletName, setWalletName] = useState<string | null>(null);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false); // Kiểm soát việc tự động chạy ảnh
    const [isClickMode, setIsClickMode] = useState(false); // Kiểm soát khi nào chạy mảng click
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); // Lưu trữ ID của interval
    const [clickImages, setClickImages] = useState(clickImages1); // Mảng clickImages được chọn ngẫu nhiên

    useEffect(() => {
        // Lấy địa chỉ ví từ localStorage và lưu vào state
        setWalletAddress(localStorage.getItem("walletAddress"));
        setWalletName(localStorage.getItem("walletName"));

    }, []); // Chỉ chạy một lần khi component được mount
    
    // Hàm cắt địa chỉ ví chỉ hiển thị 5 ký tự đầu và 5 ký tự cuối
    const formatWalletAddress = (address: string | null) => {
        if (!address) return null;
        return `${address.slice(0, 5)}...${address.slice(-5)}`;
    };

     // useEffect để tự động chạy ảnh từ mảng autoImages
     // useEffect để tự động chạy ảnh từ mảng autoImages
    useEffect(() => {
        // Dọn dẹp interval cũ trước khi tạo mới
        if (intervalId) {
            clearInterval(intervalId);
        }

        // Mảng ảnh hiện tại sẽ chạy (autoImages hoặc clickImages tùy chế độ)
        const imagesToUse = isClickMode ? clickImages : autoImages;

        // Bắt đầu quá trình tự động thay đổi ảnh
        const newIntervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => {
                // Nếu ở chế độ click và đến cuối mảng, quay lại autoImages
                if (prevIndex === imagesToUse.length - 1 && isClickMode) {
                    setIsClickMode(false); // Quay lại chế độ autoImages
                    return 0; // Reset về hình đầu tiên của autoImages
                }
                return (prevIndex + 1) % imagesToUse.length; // Chuyển sang ảnh tiếp theo
            });
        }, 80); // Đổi ảnh mỗi 1000 ms (1 giây)

        // Lưu lại ID của interval mới
        setIntervalId(newIntervalId);

        // Dọn dẹp interval khi component unmount
        return () => {
            if (newIntervalId) {
                clearInterval(newIntervalId);
            }
        };
    }, [isClickMode, clickImages]); // Chạy lại mỗi khi isClickMode hoặc clickImages thay đổi

    // Hàm chọn ngẫu nhiên 1 trong 2 mảng clickImages
    const getRandomClickImages = () => {
        return Math.random() < 0.5 ? clickImages1 : clickImages2;
    };

    // Hàm xử lý khi nhấn vào hình
    const handleClick = () => {
        setClickImages(getRandomClickImages()); // Chọn ngẫu nhiên 1 mảng clickImages
        setIsClickMode(true); // Chuyển sang chế độ chạy mảng clickImages
        setCurrentImageIndex(0); // Reset về hình đầu tiên của clickImages

        setIsFaded(true); // Bắt đầu hiệu ứng mờ dần
        setTimeout(() => {
            setIsFaded(false); // Kết thúc hiệu ứng mờ sau 200ms
        }, 50);
    };

    const imagesToDisplay = isClickMode ? clickImages : autoImages; // Lựa chọn mảng ảnh đang chạy // Lựa chọn mảng ảnh đang chạy


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
                        <strong className="text-white-300 ml-1 font-light">({walletName})</strong>
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
                        src={imagesToDisplay[currentImageIndex]}
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
                <Image src={bg_menu_select} alt="Image 1" className="cursor-pointer" style={{ width: '24%', height: 'auto' }} />
                <Image src={bg_menu} alt="Image 2" className="cursor-pointer" style={{ width: '24%', height: 'auto' }} />
                <Image src={bg_menu} alt="Image 3" className="cursor-pointer" style={{ width: '24%', height: 'auto' }} />
                <Image src={bg_menu} alt="Image 4" className="cursor-pointer" style={{ width: '24%', height: 'auto' }} />
                </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default PlayScreen;