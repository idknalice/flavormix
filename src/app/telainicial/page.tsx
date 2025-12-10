// src/app/telainicial/page.tsx
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function TelaInicial() {
  const router = useRouter();
  const { user, isLogged, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-[#F5E0B7] shadow">
        <h1 className="text-2xl font-bold text-[#6B2C1A]">FlavorMix</h1>
        <nav className="flex gap-6 text-[#6B2C1A] font-medium">
          <a href="/telainicial" className="hover:text-[#8A3A22]">Início</a>
          <a href="#" className="hover:text-[#8A3A22]">Receitas</a>
          {isLogged ? (
            <div className="flex gap-4 items-center">
              <span className="text-sm">Olá, {user?.name}</span>
              <a href="/perfil" className="hover:text-[#8A3A22]">Perfil</a>
              <button 
                onClick={handleLogout}
                className="hover:text-[#8A3A22]"
              >
                Sair
              </button>
            </div>
          ) : (
            <a href="/login" className="hover:text-[#8A3A22]">Login</a>
          )}
        </nav>
      </header>

      {/* Banner */}
      <section className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#F8C469] to-[#F6B35D] px-8 py-10 rounded-lg m-6">
        <div className="flex flex-col gap-4 max-w-md">
          <h2 className="text-3xl font-bold text-[#6B2C1A]">
            {isLogged 
              ? `Bem-vindo de volta, ${user?.name}!` 
              : "Descubra a ciência dos sabores!"
            }
          </h2>
          <button
            onClick={() => router.push(isLogged ? "/experimentos" : "/login")}
            className="px-6 py-3 bg-[#6B2C1A] text-white font-bold rounded-lg shadow-md hover:bg-[#8A3A22] transition"
          >
            {isLogged ? "CONTINUAR EXPERIMENTOS" : "INICIAR EXPERIMENTO"}
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
        <h3 className="text-2xl font-bold text-[#6B2C1A] mb-4">Receitas Populares</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Card 1 - Ovos Mexidos */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center">
            <Image src="/ovos.jpg" alt="Ovos Mexidos" width={150} height={150} />
            <h4 className="mt-4 text-lg font-bold text-[#6B2C1A]">Ovos Mexidos</h4>
            <p className="text-sm text-gray-600">Ovos, manteiga e sal a gosto.</p>
            <button
              onClick={() => router.push(isLogged ? "/ovosmexidos" : "/login")}
              className="mt-3 px-4 py-2 bg-[#6B2C1A] text-white rounded-lg hover:bg-[#8A3A22] transition"
            >
              {isLogged ? "Cozinhar" : "Fazer Login"}
            </button>
          </div>

          {/* Card 2 - Misto Quente */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center">
            <Image src="/tapronta.png" alt="Tapioca" width={150} height={150} />
            <h4 className="mt-4 text-lg font-bold text-[#6B2C1A]">Tapioca</h4>
            <p className="text-sm text-gray-600">
              Goma de mandioca e queijo.
            </p>
            <button
              onClick={() => router.push(isLogged ? "/tapioca" : "/login")}
              className="mt-3 px-4 py-2 bg-[#6B2C1A] text-white rounded-lg hover:bg-[#8A3A22] transition"
            >
              {isLogged ? "Cozinhar" : "Fazer Login"}
            </button>
          </div>

          {/* Card 3 - Batata Frita */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center">
            <Image src="/batata.png" alt="Batata Frita" width={150} height={150} />
            <h4 className="mt-4 text-lg font-bold text-[#6B2C1A]">Batata Frita</h4>
            <p className="text-sm text-gray-600">Batata, óleo e sal a gosto.</p>
            <button
              onClick={() => router.push(isLogged ? "/batata" : "/login")}
              className="mt-3 px-4 py-2 bg-[#6B2C1A] text-white rounded-lg hover:bg-[#8A3A22] transition"
            >
              {isLogged ? "Cozinhar" : "Fazer Login"}
            </button>
          </div>
        </div>  
      </section>
    </div>
  );
}