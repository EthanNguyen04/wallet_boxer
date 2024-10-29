// components/Notification.tsx

import React from 'react';
import Cancel from "@/public/icon/cancel.png"; 
import Image from 'next/image';

interface NotificationProps {
    message: string | null;
    image?: string;
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, image, onClose }) => {
    if (!message) return null; // Không hiển thị nếu không có thông báo

    return (
        <div className="flex flex-rows max-w-[450px] w-[90vw] m-auto my-5 fixed top-0 left-0 right-0 items-center justify-between z-50 bg-[#444458] p-3 rounded-xl">
            <div className='flex flex-rows items-center justify-center'>
                {image && <img src={image} alt="Notification Icon" className="w-4 h-4" />}
                <p className='ml-2'>{message}</p>
            </div>
            
            <Image
                src={Cancel}
                alt="Image copy"
                className="w-3 text-xs underline items-center "
                onClick={onClose}
            />
        </div>
    );
};

export default Notification;
