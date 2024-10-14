import Image from "next/image";
import Link from "next/link";
import DeployButton from "@/components/ui/deploy-button";

export default function Home() {
  return (
    <div className="min-h-[100vh] flex flex-col justify-between p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex flex-col items-center">
        <p className="text-center text-3xl font-bold">Boxer Clans</p>
        <img
          className="dark:invert mt-10"
          src="./public/img/icon.png"
          alt="Boxer logo"
          width={100}
          height={100}
        />
      </header>

      <main className="flex flex-col items-center sm:items-start ">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/import_wallet">
              <button className="bg-[#CDBA74] text-[#323349]"
                style={{width: "120px", height: "40px", borderRadius: "10px"}}>
                Login →
              </button>
          </Link>
          <DeployButton />
        </div>
      </main>

      <footer className="flex justify-center items-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to us website →
        </a>
      </footer>
    </div>
  );
}
