"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AuthPage() {
  const [modo, setModo] = useState<"login" | "cadastro">("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simular processo de autenticação
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Criar dados do usuário
      const userData = {
        id: Date.now().toString(),
        name: formData.name || "Usuário FlavorMix",
        email: formData.email || "usuario@flavormix.com"
      };

      // Fazer login
      login(userData);
      
      // Redirecionar para tela inicial
      router.push("/telainicial");
      
    } catch (error) {
      console.error('Erro no login:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
          {modo === "cadastro" && (
            <input
              name="name"
              type="text"
              placeholder="Nome"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-full bg-[#7a2010] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff9b3b]"
            />
          )}

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-full bg-[#7a2010] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff9b3b]"
          />

          <input
            name="password"
            type="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-full bg-[#7a2010] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff9b3b]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-full bg-[#3d0f07] text-white font-bold hover:bg-[#5b1f0e] disabled:opacity-50 transition"
          >
            {loading ? "Processando..." : modo === "login" ? "Entrar" : "Criar"}
          </button>
        </form>

        <button
          onClick={() => {
            setModo(modo === "login" ? "cadastro" : "login");
            setFormData({ name: "", email: "", password: "" });
          }}
          className="mt-4 text-[#6b1b0e] font-semibold hover:text-[#8b2b1e] transition"
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