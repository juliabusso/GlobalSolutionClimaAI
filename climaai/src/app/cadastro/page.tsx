import Link from 'next/link';
import FormCadastro from '../../components/FormCadastro/FormCadastro';

export default function CadastroPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#bddff9] to-[#6BA6BA] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-[#2A597D] mb-6 text-center">Crie sua conta</h2>

        <FormCadastro />

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
