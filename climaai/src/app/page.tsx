'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-white text-black px-4 py-8 sm:px-6 lg:px-12">
      <section className="max-w-5xl mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          ⛈ Catástrofes Naturais São Devastadoras — Mas a Prevenção Salva Vidas
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4">
          Deslizamentos, enchentes, desabamentos.<br/>
          Todos os anos, milhares de famílias são surpreendidas por tragédias que poderiam ser evitadas ou
          amenizadas com informação e preparo. Viver em uma área de risco sem saber é mais comum do
          que parece — e pode ser fatal. Foi pensando nisso que criamos este simulador:
          uma ferramenta gratuita e simples para te ajudar a entender o seu nível de risco e se preparar melhor.
        </p>
      </section>

      <div className="my-6 w-full max-w-5xl mx-auto">
        <Image
          src="/img/tornado.jpg"
          alt="Imagem de tornado"
          width={1200}
          height={400}
          className="rounded-lg w-full h-auto object-cover"
        />
      </div>

      <div className="flex justify-center">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition">
          Vamos te ajudar!
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <div className="border p-6 rounded-md bg-gray-50 shadow">
          <h2 className="text-lg font-semibold mb-4">
            🔍 O Que Você Vai Encontrar Aqui?
          </h2>
          <ul className="text-sm space-y-3">
            <li>
              <span className="text-green-600 font-bold">✅ Simulação de risco personalizada</span><br />
              Descubra se sua casa está em área de risco com base nas suas respostas.
            </li>
            <li>
              <span className="text-gray-700 font-bold">📃 Formulário fácil e rápido</span><br />
              Em poucos minutos, você informa onde mora e as condições da sua residência.
            </li>
            <li>
              <span className="text-green-700 font-bold">📈 Resultado imediato</span><br />
              O sistema calcula automaticamente se o risco é baixo, médio ou alto — com orientações de como agir.
            </li>
            <li>
              <span className="text-gray-700 font-bold">📊 Histórico das suas avaliações</span><br />
              Acompanhe suas simulações anteriores e atualize quando quiser.
            </li>
          </ul>
        </div>

        <div className="border p-6 rounded-md bg-blue-50 shadow text-center flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-2 text-red-600">
              ⛔️ Quanto mais você sabe, melhor você se protege.
            </h2>
            <p className="text-sm text-gray-800">
              Não espere o pior acontecer.<br />
              Use agora mesmo nosso simulador e dê o primeiro passo para proteger sua vida e a da sua família.
            </p>
          </div>
          <Link href="/formulario" className="mt-6">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-semibold rounded-md transition">
              Começar Avaliação
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
