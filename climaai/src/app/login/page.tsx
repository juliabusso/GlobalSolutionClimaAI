import FormLogin from "../../components/FormLogin/FormLogin";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4 py-16">
      <div className="w-full max-w-md bg-gray-100 p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Entrar na conta</h1>

        <FormLogin />

        <div className="text-center mt-4">
        </div>
      </div>
    </main>
  );
}
