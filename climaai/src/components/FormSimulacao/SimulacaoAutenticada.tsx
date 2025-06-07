'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormSimulacao from "./FormSimulacao";

export default function SimulacaoAutenticada() {
  const [usuarioLogado, setUsuarioLogado] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const usuarioId = localStorage.getItem("usuarioId");
    if (usuarioId) {
      setUsuarioLogado(true);
    } else {
      setUsuarioLogado(false);
      router.push("/login");
    }
  }, [router]);

  if (usuarioLogado === null) {
    return <p className="text-center mt-10">Verificando autenticação...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4 py-6 bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-800">Veja se está em risco!</h1>
      <FormSimulacao />
    </div>
  );
}
