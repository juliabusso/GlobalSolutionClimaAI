'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [usuario, setUsuario] = useState<{ nome: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Recupera dados do usuário do localStorage
    const nome = localStorage.getItem("nome");
    const token = localStorage.getItem("token");

    if (token && nome) {
      setUsuario({ nome });
    }
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
      {/* Barra azul com logo e navegação */}
      <div className="bg-[#3366cc] flex flex-wrap items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <Image
            src="/img/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
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
              <span className="text-white font-medium">
                Olá, {usuario.nome}
              </span>
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
                Crie sua conta
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Banner com imagem */}
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
