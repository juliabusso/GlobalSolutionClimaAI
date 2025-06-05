import Link from "next/link";

export default function Cadastro() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#bddff9] to-[#6BA6BA] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-[#2A597D] mb-6 text-center">Crie sua conta</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6BA6BA]"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Usuário</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6BA6BA]"
              placeholder="nome de usuário"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Senha</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6BA6BA]"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 font-bold text-white rounded-xl bg-[#F28C6A] hover:bg-[#e57755] transition-colors"
          >
            Cadastrar
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Já possui uma conta?{' '}
          <Link href="/login" className="text-[#0e0495] font-semibold hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
