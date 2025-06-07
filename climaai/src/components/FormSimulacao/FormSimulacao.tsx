'use client';

import { useEffect, useState } from 'react';
import SpinLoading from '../../components/SpinLoading/SpinLoading';
import { Button } from '../../components/ui/Button';

interface Respostas {
  moraEmEncosta: string;
  rachaduras: string;
  ruaAlaga: string;
  tipoConstrucao: string;
  numeroPessoas: string;
  pertoRio: string;
  drenagem: string;
  cidade: string;
  estado: string;
}

const FormSimulacao = () => {
  const [respostas, setRespostas] = useState<Respostas>({
    moraEmEncosta: '',
    rachaduras: '',
    ruaAlaga: '',
    tipoConstrucao: '',
    numeroPessoas: '',
    pertoRio: '',
    drenagem: '',
    cidade: '',
    estado: '',
  });

  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [mensagemDeCarregamento, setMensagemDeCarregamento] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('usuarioId');
    if (id) {
      setUsuarioId(parseInt(id));
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setRespostas(prev => ({ ...prev, [name]: value }));
  };

  const simularRisco = async () => {
    const payload = {
      moraEmEncosta: respostas.moraEmEncosta === 'sim',
      ruaAlaga: respostas.ruaAlaga === 'sim',
      tipoConstrucao: respostas.tipoConstrucao.toUpperCase(),
      numeroPessoas: parseInt(respostas.numeroPessoas || '0'),
      cidade: respostas.cidade || 'Desconhecida',
      estado: respostas.estado || 'Desconhecido',
    };

    try {
      setCarregando(true);
      setMensagemDeCarregamento('Simulando risco...');
      const response = await fetch('https://gs-java-k07h.onrender.com/avaliacoes/simular', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Simulação de risco: ${data.nivelRisco}`);
      } else {
        const erro = await response.text();
        alert('Erro ao simular risco: ' + erro);
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao conectar com a API de simulação.');
    } finally {
      setCarregando(false);
    }
  };

  const enviarAvaliacao = async () => {
    if (!usuarioId) {
      alert('Usuário não autenticado.');
      return;
    }

    if (!respostas.tipoConstrucao) {
      alert('Por favor, selecione o tipo de construção.');
      return;
    }

    const payload = {
      usuarioId,
      moraEmEncosta: respostas.moraEmEncosta === 'sim',
      ruaAlaga: respostas.ruaAlaga === 'sim',
      tipoConstrucao: respostas.tipoConstrucao.toUpperCase(),
      numeroPessoas: parseInt(respostas.numeroPessoas || '0'),
      cidade: respostas.cidade || 'Desconhecida',
      estado: respostas.estado || 'Desconhecido',
    };

    try {
      setCarregando(true);
      setMensagemDeCarregamento('Enviando avaliação...');
      const response = await fetch('https://gs-java-k07h.onrender.com/avaliacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Avaliação salva com sucesso!');
      } else {
        const erro = await response.text();
        alert('Erro ao enviar avaliação: ' + erro);
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao conectar com a API.');
    } finally {
      setCarregando(false);
    }
  };

  if (carregando) {
    return <SpinLoading mensagem={mensagemDeCarregamento} />;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Formulário de Avaliação de Risco
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Cidade</label>
            <input
              type="text"
              name="cidade"
              value={respostas.cidade}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Digite sua cidade"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Estado</label>
            <input
              type="text"
              name="estado"
              value={respostas.estado}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Digite seu estado"
            />
          </div>

          {[
            { label: 'Você mora em encosta?', name: 'moraEmEncosta' },
            { label: 'Sua casa apresenta rachaduras?', name: 'rachaduras' },
            { label: 'A rua alaga quando chove?', name: 'ruaAlaga' },
            { label: 'Sua casa fica perto de rio ou córrego?', name: 'pertoRio' },
            { label: 'Como é a drenagem da sua rua?', name: 'drenagem', options: ['boa', 'ruim'] },
          ].map(({ label, name, options }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <select
                name={name}
                value={respostas[name as keyof Respostas]}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Selecione</option>
                {(options || ['sim', 'nao']).map(opt => (
                  <option key={opt} value={opt}>
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo de construção da sua casa
            </label>
            <select
              name="tipoConstrucao"
              value={respostas.tipoConstrucao}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Selecione</option>
              <option value="ALVENARIA">Alvenaria</option>
              <option value="MADEIRA">Madeira</option>
              <option value="IMPROVISADA">Improvisada</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantas pessoas moram na sua casa?
            </label>
            <input
              type="number"
              name="numeroPessoas"
              value={respostas.numeroPessoas}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="flex flex-col gap-4 mt-6">
            <Button
              type="button"
              onClick={simularRisco}
              isLoading={carregando}
              className="bg-green-600 hover:bg-green-700"
            >
              Simular Risco
            </Button>

            <Button
              type="button"
              onClick={enviarAvaliacao}
              isLoading={carregando}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Enviar Avaliação para o Sistema
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSimulacao;
