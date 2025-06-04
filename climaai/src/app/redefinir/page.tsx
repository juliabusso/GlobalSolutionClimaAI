"use client";

import { useState } from "react";

export default function RedefinirSenhaPage() {
  const [email, setEmail] = useState("");

  const handleRedefinir = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Solicitação de redefinição enviada para:", email);
    // Aqui você integraria com o backend para enviar o link de redefinição
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4 py-16">
      <div className="w-full max-w-md bg-gray-100 p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">
          Redefinir senha
        </h1>

        <form onSubmit={handleRedefinir} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email cadastrado
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white rounded-full py-2 px-4 hover:bg-gray-800 transition font-medium"
          >
            Enviar link de redefinição
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Você receberá um link para redefinir sua senha por email.
        </p>
      </div>
    </main>
  );
}
