'use client';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CadastroPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const router = useRouter();

  const handleCadastro = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("https://gs-java-k07h.onrender.com/usuarios/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("nome", data.nome);
        localStorage.setItem("email", data.email);
        setMensagem("Cadastro realizado com sucesso!");
        router.push("/perfil");
      } else {
        setMensagem(data.message || "Erro no cadastro.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#bddff9] to-[#6BA6BA] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-[#2A597D] mb-6 text-center">Crie sua conta</h2>
        <form onSubmit={handleCadastro} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6BA6BA]"
              placeholder="Nome completo"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6BA6BA]"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6BA6BA]"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 font-bold text-white rounded-xl bg-[#F28C6A] hover:bg-[#e57755] transition-colors"
          >
            Cadastrar
          </button>
          {mensagem && <p className="text-center text-sm mt-2 text-red-600">{mensagem}</p>}
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          Já possui uma conta?{' '}
          <Link href="/login" className="text-[#0e0495] font-semibold hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
