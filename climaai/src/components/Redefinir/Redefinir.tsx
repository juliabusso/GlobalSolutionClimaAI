'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import SpinLoading from '../../components/SpinLoading/SpinLoading';

export default function Redefinir() {
  const router = useRouter();
  const { nome: nomeContext, email, login } = useAuth();

  const [nome, setNome] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [carregandoAtualizacao, setCarregandoAtualizacao] = useState(false);

  useEffect(() => {
    if (email) {
      setNome(nomeContext || '');
      setIsLoading(false);
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false);
        if (!email) router.push('/login');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [email, nomeContext, router]);

  if (isLoading) {
    return <div className="text-center mt-20">Carregando...</div>;
  }

  if (carregandoAtualizacao) {
    return <SpinLoading mensagem="Atualizando dados..." />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregandoAtualizacao(true);
    setMensagem('');

    try {
      const response = await fetch('https://gs-java-k07h.onrender.com/usuarios/atualizar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          novoNome: nome,
          novaSenha,
        }),
      });

      if (response.ok) {
        setMensagem('Dados atualizados com sucesso!');
        const token = localStorage.getItem("token") || "";
        login(nome, email!, token);
      } else {
        const erro = await response.text();
        setMensagem(`Erro: ${erro}`);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setMensagem('Erro na requisição. Tente novamente.');
    } finally {
      setCarregandoAtualizacao(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4 py-16">
      <div className="w-full max-w-md bg-gray-100 p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Atualizar Dados</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Novo nome"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nova senha</label>
            <input
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nova senha (opcional)"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white rounded-full py-2 px-4 hover:bg-gray-800 transition font-medium"
          >
            Atualizar
          </button>
        </form>
        {mensagem && <p className="text-sm text-center mt-4 text-gray-700">{mensagem}</p>}
      </div>
    </main>
  );
}
