"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditarPerfilPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [foto, setFoto] = useState("");
  const [mensagem, setMensagem] = useState("");
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
        const res = await fetch(`https://gs-java-k07h.onrender.com/usuarios/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setNome(data.nome);
          setEmail(data.email);
          setFoto(data.foto || "");
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        router.push("/login");
      }
    }

    buscarUsuario();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const id = localStorage.getItem("usuarioId");

    if (!token || !id) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("https://gs-java-k07h.onrender.com/usuarios/atualizar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: Number(id),
          nome,
          email,
          senha,
          foto, // inclui a URL da imagem
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensagem("Perfil atualizado com sucesso!");
      } else {
        setMensagem(`Erro: ${data.mensagem || "Falha ao atualizar perfil."}`);
      }
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-center text-[#2A597D] mb-6">Editar Perfil</h1>

        {foto && (
          <div className="flex justify-center mb-4">
            <img src={foto} alt="Foto de perfil" className="w-24 h-24 rounded-full object-cover border" />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">URL da Foto</label>
            <input
              type="url"
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-[#6BA6BA]"
              placeholder="https://exemplo.com/sua-foto.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-[#6BA6BA]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-[#6BA6BA]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Nova Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-[#6BA6BA]"
              placeholder="Deixe em branco para manter a atual"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 font-bold text-white rounded-lg bg-[#F28C6A] hover:bg-[#e57755] transition"
          >
            Salvar Alterações
          </button>

          {mensagem && (
            <p className="text-center text-sm mt-2 text-gray-800 font-medium">
              {mensagem}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
