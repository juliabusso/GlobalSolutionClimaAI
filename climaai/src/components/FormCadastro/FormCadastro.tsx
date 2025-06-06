"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FormCadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const router = useRouter();

  const handleCadastro = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('https://gs-java-k07h.onrender.com/usuarios/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        // Salva os dados no localStorage se a API retornar
        if (data.token) localStorage.setItem("token", data.token);
        if (data.id) localStorage.setItem("usuarioId", data.id);
        localStorage.setItem("nome", data.nome);
        localStorage.setItem("email", data.email);

        setMensagem('Cadastro realizado com sucesso!');
        router.push("/simulacao"); // Redireciona após cadastro
      } else {
        setMensagem(`Erro: ${data.message || "Não foi possível cadastrar."}`);
      }
    } catch (error: unknown) {
      console.error("Erro no cadastro:", error);
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleCadastro}>
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
        <label className="block text-sm font-semibold text-gray-700">Usuário</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6BA6BA]"
          placeholder="nome de usuário"
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
  );
}
