'use client';

import { useState } from 'react';

export default function SimuladorRisco() {
  const [respostas, setRespostas] = useState({
    pertoRio: '',
    alagamentos: '',
    encosta: '',
    rachaduras: '',
    drenagem: '',
  });
  const [risco, setRisco] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRespostas({ ...respostas, [e.target.name]: e.target.value });
  };

  const calcularRisco = () => {
    const valores = Object.values(respostas);
    const respostasSim = valores.filter((v) => v === 'sim').length;

    if (respostasSim >= 3) setRisco('⚠️ Sua casa está em ÁREA DE RISCO.');
    else if (respostasSim === 2) setRisco('⚠️ Há sinais de alerta, fique atento.');
    else setRisco('✅ Sua casa não aparenta estar em área de risco.');
  };

  return (
    <main className="max-w-2xl mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">
        Simulação de Risco Personalizada
      </h1>
      <p className="mb-6 text-black dark:text-gray-300">
        Descubra se sua casa está em área de risco com base nas suas respostas.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          calcularRisco();
        }}
        className="space-y-4"
      >
        <Pergunta
          label="Sua casa está perto de um rio ou córrego?"
          name="pertoRio"
          value={respostas.pertoRio}
          onChange={handleChange}
        />

        <Pergunta
          label="Já houve alagamentos na sua região?"
          name="alagamentos"
          value={respostas.alagamentos}
          onChange={handleChange}
        />

        <Pergunta
          label="Sua casa está em área de encosta ou morro?"
          name="encosta"
          value={respostas.encosta}
          onChange={handleChange}
        />

        <Pergunta
          label="Existem rachaduras nas paredes ou no chão da casa?"
          name="rachaduras"
          value={respostas.rachaduras}
          onChange={handleChange}
        />

        <Pergunta
          label="Há problemas de drenagem de água (escoamento)?"
          name="drenagem"
          value={respostas.drenagem}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-[#f28c6a] text-white px-6 py-2 rounded-full hover:bg-[#e67858] transition"
        >
          Verificar Risco
        </button>
      </form>

      {risco && (
        <div className="mt-6 p-4 border rounded-lg bg-white text-black dark:bg-gray-800 dark:text-white">
          <strong>Resultado:</strong>
          <p className="mt-2">{risco}</p>
        </div>
      )}
    </main>
  );
}

function Pergunta({ label, name, value, onChange }: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className="text-left">
      <label className="block mb-1 text-black dark:text-white">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
        required
      >
        <option value="">Selecione</option>
        <option value="sim">Sim</option>
        <option value="nao">Não</option>
      </select>
    </div>
  );
}
