'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import SpinLoading from '../../components/SpinLoading/SpinLoading';

export default function Perfil() {
  const { nome, email, logout } = useAuth();
  const router = useRouter();
  const [carregando, setCarregando] = useState(false);

  const handleDelete = async () => {
    const confirmacao = confirm("Tem certeza que deseja deletar sua conta?");
    if (!confirmacao || !email) return;

    setCarregando(true);

    try {
      const response = await fetch(`https://gs-java-k07h.onrender.com/usuarios/deletar/${encodeURIComponent(email)}`, {
        method: 'DELETE'
      });

      if (response.ok || response.status === 204) {
        alert("Conta deletada com sucesso.");
        logout();
        router.push('/');
      } else {
        const erro = await response.text();
        alert(`Erro ao deletar: ${erro}`);
      }
    } catch (error) {
      alert("Erro de rede ao deletar conta.");
      console.error(error);
    } finally {
      setCarregando(false);
    }
  };

  if (carregando) {
    return <SpinLoading mensagem="Deletando conta..." />;
  }

  if (!nome || !email) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-center">Carregando dados do perfil...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow">
        <h1 className="mb-4 text-center text-2xl font-bold">Perfil do Usuário</h1>
        <div className="space-y-2 text-gray-800">
          <p>
            <strong>Nome:</strong> {nome}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
        </div>
        <div className="mt-6 flex justify-between">
          <Button onClick={() => router.push('/redefinir')}>
            Editar Perfil
          </Button>
          <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
            Deletar Conta
          </Button>
        </div>
      </div>
    </div>
  );
}
