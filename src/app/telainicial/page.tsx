"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TelaInicial() {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);

  // Verifica no carregamento se já está logado
  useEffect(() => {
    const logged = localStorage.getItem("loggedIn");
    if (logged === "true") {
      setIsLogged(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF9F0] flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-[#F5E0B7] shadow">
        <h1 className="text-2xl font-bold text-[#6B2C1A]">FlavorMix</h1>
        <nav className="flex gap-6 text-[#6B2C1A] font-medium">
          <a href="/telainicial">Início</a>
          <a href="#">Receitas</a>
          <a href="#">Experimentos</a>
          {isLogged ? (
            <a href="/perfil">Perfil</a>
          ) : (
            <a href="/login">Login</a>
          )}
        </nav>
      </header>

      {/* Banner */}
      <section className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#F8C469] to-[#F6B35D] px-8 py-10 rounded-lg m-6">
        <div className="flex flex-col gap-4 max-w-md">
          <h2 className="text-3xl font-bold text-[#6B2C1A]">
            Descubra a ciência dos sabores!
          </h2>
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-3 bg-[#6B2C1A] text-white font-bold rounded-lg shadow-md hover:bg-[#8A3A22] transition"
          >
            INICIAR EXPERIMENTO
          </button>
        </div>

        <div className="mt-6 md:mt-0">
          <Image
            src="/cientista.png"
            alt="Cientista"
            width={280}
            height={280}
            className="rounded-lg"
            priority
          />
        </div>
      </section>

      {/* Receitas */}
      <section className="px-6 py-6">
        <h3 className="text-2xl font-bold text-[#6B2C1A] mb-4">Receitas</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Card 1 - Ovos Mexidos */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center">
            <Image src="/ovos.jpg" alt="Ovos Mexidos" width={150} height={150} />
            <h4 className="mt-4 text-lg font-bold text-[#6B2C1A]">Ovos Mexidos</h4>
            <p className="text-sm text-gray-600">Ovos, manteiga e sal a gosto.</p>
            <button
              onClick={() => router.push("/ovosmexidos")}
              className="mt-3 px-4 py-2 bg-[#6B2C1A] text-white rounded-lg hover:bg-[#8A3A22] transition"
            >
              Cozinhar
            </button>
          </div>

          {/* Card 2 - Misto Quente */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center">
            <Image src="/misto.png" alt="Misto Quente" width={150} height={150} />
            <h4 className="mt-4 text-lg font-bold text-[#6B2C1A]">Misto Quente</h4>
            <p className="text-sm text-gray-600">
              Pão de forma, queijo, presunto e manteiga.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="mt-3 px-4 py-2 bg-[#6B2C1A] text-white rounded-lg hover:bg-[#8A3A22] transition"
            >
              Cozinhar
            </button>
          </div>

          {/* Card 3 - Batata Frita */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center">
            <Image src="/batata.png" alt="Batata Frita" width={150} height={150} />
            <h4 className="mt-4 text-lg font-bold text-[#6B2C1A]">Batata Frita</h4>
            <p className="text-sm text-gray-600">Batata, óleo e sal a gosto.</p>
            <button
              onClick={() => router.push("/login")}
              className="mt-3 px-4 py-2 bg-[#6B2C1A] text-white rounded-lg hover:bg-[#8A3A22] transition"
            >
              Cozinhar
            </button>
          </div>
        </div>  
      </section>
    </div>
  );
}