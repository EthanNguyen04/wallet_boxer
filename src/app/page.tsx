import PlayScreen from "@/components/play_screen";
import bg from "@/public/background/bg_home.png";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Play",
  description: "Play",
};
export default function Home() {
  return (
    <div
            style={{
                backgroundImage: `url(${bg.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }} 
            className="min-h-[100vh] background-container min-h-[100vh] flex flex-col justify-between font-[family-name:var(--font-geist-sans)]">
                <PlayScreen />
    </div>
  );
}
