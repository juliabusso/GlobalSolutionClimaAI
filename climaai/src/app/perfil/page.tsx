"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/Button";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha?: string;
}

export default function ProfilePage() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("usuarioId");

    if (!token || !id) {
      router.push("/login");
      return;
    }

    async function buscarUsuario() {
      try {
        const response = await fetch(`https://gs-java-k07h.onrender.com/usuarios/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsuario(data);
        } else {
          localStorage.clear();
          router.push("/login");
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        router.push("/login");
      } finally {
        setCarregando(false);
      }
    }

    buscarUsuario();
  }, [router]);

  const irParaAtualizar = () => {
    router.push("/atualizar");
  };

  if (carregando) {
    return <div className="text-center py-20">Carregando perfil...</div>;
  }

  if (!usuario) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] p-4">
      <div className="bg-white shadow-lg rounded-2xl max-w-md w-full p-6 sm:p-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <Image
            src="/profile-placeholder.png"
            alt="Foto de perfil"
            width={96}
            height={96}
            className="rounded-full object-cover"
          />

          <div className="w-full text-left space-y-3">
            <div>
              <label className="text-sm font-bold text-[#2A597D]">Usuário</label>
              <div className="p-2 border rounded-lg bg-gray-100">{usuario.nome}</div>
            </div>
            <div>
              <label className="text-sm font-bold text-[#2A597D]">Email</label>
              <div className="p-2 border rounded-lg bg-gray-100">{usuario.email}</div>
            </div>
            <div>
              <label className="text-sm font-bold text-[#2A597D]">Senha</label>
              <div className="p-2 border rounded-lg bg-gray-100">********</div>
            </div>
          </div>

          <Button
            onClick={irParaAtualizar}
            className="mt-4 w-full bg-[#F28C6A] text-white font-bold hover:bg-[#e57856]"
          >
            Editar Perfil
          </Button>
        </div>
      </div>
    </div>
  );
}
