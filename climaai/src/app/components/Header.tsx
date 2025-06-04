'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const menuItems = [
    { label: "Simulação", href: "/simulacao" },
    { label: "Desastres", href: "/desastres" },
    { label: "Home", href: "/" },
    { label: "Metereologia", href: "/metereologia" },
    { label: "Membros", href: "/membros" }
  ];

  return (
    <header className="w-full">
      {/* Barra azul com logo, navegação e acesso */}
      <div className="bg-[#3366cc] flex flex-wrap items-center justify-between px-4 py-2">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Image
            src="/img/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>

        {/* Navegação central */}
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

        {/* Acesso/Login */}
        <div className="flex gap-2 mt-3 md:mt-0">
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

          {/* Acesso/Login */}
        <div className="flex gap-2 mt-3 md:mt-0">
          <Link
            href="/perfil"
            className="bg-white text-black rounded px-4 py-1 text-sm font-medium hover:bg-gray-100 transition"
          >
            Perfil
          </Link>

        </div>
        </div>
      </div>
      
      {/* Imagem de fundo com nuvens */}
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
