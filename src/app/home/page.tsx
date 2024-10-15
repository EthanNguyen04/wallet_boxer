import Index from "@/app/home/ui/Index";
import bg_home from "@/public/bg_home.png";

export default function HomeWallet() {
    return (
        <div
            style={{
                backgroundImage: `url(${bg_home.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }} 
            className="background-container min-h-[100vh] flex flex-col justify-between font-[family-name:var(--font-geist-sans)]">
                <Index />
        </div>
    );
}
