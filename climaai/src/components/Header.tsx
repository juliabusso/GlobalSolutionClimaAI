'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Usuario {
  nome: string;
  email: string;
  foto?: string;
}

export default function Header() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("usuarioId");

    if (!token || !id) {
      setUsuario(null);
      return;
    }

    async function fetchUser() {
      try {
        const res = await fetch(`https://gs-java-k07h.onrender.com/usuarios/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (res.ok) {
          const data = await res.json();
          setUsuario({
            nome: data.nome,
            email: data.email,
            foto: data.foto
          });
          // opcional: atualizar localStorage caso nome/email sejam atualizados
          localStorage.setItem("nome", data.nome);
          localStorage.setItem("email", data.email);
        } else {
          localStorage.clear();
          setUsuario(null);
        }
      } catch (e) {
        console.error("Erro ao buscar usuário:", e);
        localStorage.clear();
        setUsuario(null);
      }
    }

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUsuario(null);
    router.push("/login");
  };

  const menuItems = [
    { label: "Simulação", href: "/simulacao" },
    { label: "Desastres", href: "/desastres" },
    { label: "Home", href: "/" },
    { label: "Metereologia", href: "/metereologia" },
    { label: "Membros", href: "/membros" }
  ];

  return (
    <header className="w-full">
      <div className="bg-[#3366cc] flex flex-wrap items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <Image src="/img/logo.png" alt="Logo" width={50} height={50} className="rounded-full" />
        </div>

        <nav className="flex flex-wrap gap-3">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="bg-white text-black border-2 border-black rounded-full px-4 py-1 text-sm font-medium hover:bg-gray-100 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 mt-3 md:mt-0">
          {usuario ? (
            <>
              {usuario.foto && (
                <Image
                  src={usuario.foto}
                  alt="Avatar"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              )}
              <span className="text-white font-medium text-sm">Olá, {usuario.nome}</span>
              <Link
                href="/perfil"
                className="bg-white text-black rounded-full px-4 py-1 text-sm font-medium hover:bg-gray-100 transition"
              >
                Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white rounded-full px-4 py-1 text-sm font-medium hover:bg-red-600 transition"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-white text-black rounded-l-full px-4 py-1 text-sm font-medium hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                href="/cadastro"
                className="bg-white text-black rounded-r-full px-4 py-1 text-sm font-medium hover:bg-gray-100 transition"
              >
                Cadastre-se
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="w-full">
        <Image
          src="/img/banner.jpg"
          alt="Imagem de nuvens"
          width={1600}
          height={300}
          className="w-full h-auto object-cover"
          priority
        />
      </div>
    </header>
  );
}
