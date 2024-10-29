"use client"; // Để component có thể xử lý sự kiện phía client

import { useRouter } from "next/navigation"; 
import React, { useState, useEffect } from "react";

const Loading = () => {
    const [progress, setProgress] = useState(1);
    const router = useRouter();

    // Tăng dần từ 1 đến 100 trong 10 giây
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev < 100) {
                    return prev + 1; // Tăng tiến độ lên 1%
                } else {
                    clearInterval(interval); // Dừng interval khi đạt 100%
                    return 100; // Đảm bảo rằng giá trị là 100
                }
            });
        }, 100); // Mỗi 100ms tăng thêm 1%, tổng 10 giây (100 x 100ms)

        return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
    }, []);

    // Chuyển trang khi đạt 100%
    useEffect(() => {
        if (progress === 100) {
            router.push("/"); 
        }
    }, [progress]); // Chạy effect này mỗi khi progress thay đổi


    // Tính toán để điều chỉnh vòng tròn SVG
    const circleRadius = 45;
    const circumference = 2 * Math.PI * circleRadius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-between mt-[15vh]">
            {/* SVG với hiệu ứng màu động */}
            <svg width="50vw"
                height="50vw"
                viewBox="0 0 100 100" // Giữ tỷ lệ đường tròn
                className="transform -rotate-90">
                <circle
                    cx="50"
                    cy="50"
                    r={circleRadius}
                    stroke="#444458"
                    strokeWidth="1"
                    fill="none"
                />
                <circle
                    cx="50"
                    cy="50"
                    r={circleRadius}
                    stroke="#F5E022"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{
                        transition: "stroke-dashoffset 0.1s linear",
                    }}
                />
            </svg>
            {/* Hiển thị phần trăm */}
            <div className="flex flex-row items-center justify-center w-full mt-5 font-medium">
                <p className="text-base text-[#F5E022] scale-y-150">{progress}%</p>
                <p className="ml-2 text-base">Create new account</p> {/* Sử dụng ml-2 để tạo khoảng cách nhỏ giữa các phần tử */}
            </div>

            <div className="flex flex-row justify-center w-full mt-[40%] font-medium">
                <p className="text-base text-[#FFFFFF] font-semibold">Pro Tip:</p>
                <p className="ml-2 text-base text-[#b4b4b8]">Lorem ipsum dolor sit amet,<br /> consectetur adipiscing elit. Convallis vestib. </p> {/* Sử dụng ml-2 để tạo khoảng cách nhỏ giữa các phần tử */}
            </div>
        </div>
    );
};

export default Loading;
