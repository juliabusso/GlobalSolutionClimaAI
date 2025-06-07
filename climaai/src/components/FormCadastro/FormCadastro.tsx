"use client";

import { useState } from "react";
import SpinLoading from "../../components/SpinLoading/SpinLoading";

export default function FormCadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleCadastro = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCarregando(true);
    setMensagem("");

    try {
      const response = await fetch("https://gs-java-k07h.onrender.com/usuarios/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem("Usuário cadastrado com sucesso!");
      } else {
        setMensagem(`Erro: ${data.mensagem || "Falha ao cadastrar."}`);
      }
    } catch (error: unknown) {
      console.error("Erro durante o cadastro:", error);
      setMensagem("Erro ao conectar com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  if (carregando) {
    return <SpinLoading mensagem="Cadastrando usuário..." />;
  }

  return (
    <form onSubmit={handleCadastro} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Usuário</label>
        <input
          type="text"
          required
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="nome de usuário"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          required
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
        <input
          type="password"
          required
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="••••••••"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>

      {mensagem && (
        <div className="text-sm text-center text-red-600 font-medium">{mensagem}</div>
      )}

      <button
        type="submit"
        className="bg-[#F28C6A] text-white rounded-full py-2 px-4 hover:bg-[#e57755] transition font-medium"
      >
        Cadastrar
      </button>
    </form>
  );
}
