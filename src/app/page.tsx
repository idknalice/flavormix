'use client';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#5b1f0e]">
      <img
        src="/logo.png"
        alt="FlavorMix"
        className="w-32 h-32 mb-12"
      />
      <button
        onClick={() => router.push("/login")}
        className="px-8 py-3 bg-[#ff9b3b] text-white font-bold rounded-full shadow-lg hover:bg-[#ffa65c] transition"
      >
        INICIAR EXPERIMENTO
      </button>
    </div>
  );
}