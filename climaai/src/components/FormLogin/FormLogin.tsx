"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://gs-java-k07h.onrender.com/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem("Login bem-sucedido!");

        localStorage.setItem("usuarioId", data.id);
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        router.push("/simulacao");
      } else {
        setMensagem(`Erro: ${data.mensagem || "Email ou senha inválidos."}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro durante o login:", error.message);
      } else {
        console.error("Erro desconhecido durante o login.");
      }
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          required
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="seuemail@exemplo.com"
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
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>

      {mensagem && (
        <div className="text-sm text-center text-red-600 font-medium">
          {mensagem}
        </div>
      )}

      <button
        type="submit"
        className="bg-black text-white rounded-full py-2 px-4 hover:bg-gray-800 transition font-medium"
      >
        Entrar
      </button>
    </form>
  );
}
