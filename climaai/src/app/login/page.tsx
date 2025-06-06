'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FormLogin from "../../components/FormLogin/FormLogin";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("usuarioId");

    // Verifica se já está logado e redireciona para o perfil
    if (token && id) {
      fetch(`https://gs-java-k07h.onrender.com/usuarios/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
        .then((res) => {
          if (res.ok) {
            router.push("/perfil");
          } else {
            localStorage.clear(); // Token inválido
          }
        })
        .catch(() => localStorage.clear());
    }
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4 py-16">
      <div className="w-full max-w-md bg-gray-100 p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Entrar na conta</h1>

        <FormLogin />

        <div className="text-center mt-4">
          <Link
            href="/redefinir"
            className="text-sm text-blue-600 hover:underline"
          >
            Esqueceu a senha?
          </Link>
        </div>
      </div>
    </main>
  );
}
