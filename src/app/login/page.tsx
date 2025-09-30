// src/pages/index.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [modo, setModo] = useState<"login" | "cadastro">("login");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // aqui você poderia validar os dados ou chamar API
    router.push("/telainicial"); // redireciona para tela inicial
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fcefdc]">
      <div className="w-full max-w-sm p-6 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="FlavorMix" className="h-16" />
        </div>

        <h1 className="text-2xl font-bold text-[#6b1b0e] mb-2">FlavorMix</h1>

        <h2 className="text-lg font-semibold text-[#6b1b0e] mb-6">
          {modo === "login" ? "Entrar" : "Criar uma nova conta"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nome"
            className="w-full px-4 py-2 rounded-full bg-[#7a2010] text-white placeholder-gray-300 focus:outline-none"
          />

          {modo === "cadastro" && (
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-full bg-[#7a2010] text-white placeholder-gray-300 focus:outline-none"
            />
          )}

          <input
            type="password"
            placeholder="Senha"
            className="w-full px-4 py-2 rounded-full bg-[#7a2010] text-white placeholder-gray-300 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full py-2 rounded-full bg-[#3d0f07] text-white font-bold"
          >
            {modo === "login" ? "Entrar" : "Criar"}
          </button>
        </form>

        <button
          onClick={() => setModo(modo === "login" ? "cadastro" : "login")}
          className="mt-4 text-[#6b1b0e] font-semibold"
        >
          {modo === "login" ? "Criar nova conta" : "Já tenho conta"}
        </button>

        <p className="mt-6 text-sm text-[#6b1b0e]">
          www.flavormix.com.br
        </p>
      </div>
    </div>
  );
}
