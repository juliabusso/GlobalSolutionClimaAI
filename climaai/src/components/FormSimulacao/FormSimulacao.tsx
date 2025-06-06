'use client';
 
import { useEffect, useState } from 'react';
 
interface Respostas {
    moraEmEncosta: string;
    rachaduras: string;
    ruaAlaga: string;
    tipoConstrucao: string;
    numeroPessoas: string;
    pertoRio: string;
    drenagem: string;
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
    });
 
    const [usuarioId, setUsuarioId] = useState<number | null>(null);
 
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
 
    const calcularRisco = () => {
        let risco = 0;
 
        if (respostas.moraEmEncosta === 'sim') risco += 2;
        if (respostas.rachaduras === 'sim') risco += 2;
        if (respostas.ruaAlaga === 'sim') risco += 1;
        if (respostas.tipoConstrucao === 'madeira') risco += 1;
        if (respostas.pertoRio === 'sim') risco += 1;
        if (respostas.drenagem === 'ruim') risco += 1;
        if (parseInt(respostas.numeroPessoas) > 4) risco += 1;
 
        let classificacao = 'baixo';
        if (risco >= 6) classificacao = 'alto';
        else if (risco >= 3) classificacao = 'médio';
 
        alert(`O nível de risco é: ${classificacao.toUpperCase()}`);
    };
 
    const enviarAvaliacao = async () => {
        if (!usuarioId) {
            alert('Usuário não autenticado.');
            return;
        }
 
        const payload = {
            usuarioId,
            moraEmEncosta: respostas.moraEmEncosta === 'sim',
            ruaAlaga: respostas.ruaAlaga === 'sim',
            tipoConstrucao: respostas.tipoConstrucao.toUpperCase(), // "ALVENARIA" ou "MADEIRA"
            numeroPessoas: parseInt(respostas.numeroPessoas || '0'),
        };
 
        try {
            const response = await fetch('http://localhost:8080/api/avaliacoes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
 
            if (response.ok) {
                const data = await response.json();
                alert(`Avaliação salva com sucesso! Nível de risco: ${data.nivelRisco}`);
            } else {
                const erro = await response.text();
                alert('Erro ao enviar avaliação: ' + erro);
            }
        } catch (err) {
            console.error(err);
            alert('Erro ao conectar com a API.');
        }
    };
 
    return (
        <form className="max-w-xl mx-auto space-y-4">
            <div>
                <label className="block text-sm font-medium">Você mora em encosta?</label>
                <select name="moraEmEncosta" value={respostas.moraEmEncosta} onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="">Selecione</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                </select>
            </div>
 
            <div>
                <label className="block text-sm font-medium">Sua casa apresenta rachaduras?</label>
                <select name="rachaduras" value={respostas.rachaduras} onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="">Selecione</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                </select>
            </div>
 
            <div>
                <label className="block text-sm font-medium">A rua alaga quando chove?</label>
                <select name="ruaAlaga" value={respostas.ruaAlaga} onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="">Selecione</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                </select>
            </div>
 
            <div>
                <label className="block text-sm font-medium">Tipo de construção da sua casa:</label>
                <select name="tipoConstrucao" value={respostas.tipoConstrucao} onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="">Selecione</option>
                    <option value="alvenaria">Alvenaria</option>
                    <option value="madeira">Madeira</option>
                </select>
            </div>
 
            <div>
                <label className="block text-sm font-medium">Quantas pessoas moram na sua casa?</label>
                <input
                    type="number"
                    name="numeroPessoas"
                    value={respostas.numeroPessoas}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
 
            <div>
                <label className="block text-sm font-medium">Sua casa fica perto de rio ou córrego?</label>
                <select name="pertoRio" value={respostas.pertoRio} onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="">Selecione</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                </select>
            </div>
 
            <div>
                <label className="block text-sm font-medium">Como é a drenagem da sua rua?</label>
                <select name="drenagem" value={respostas.drenagem} onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="">Selecione</option>
                    <option value="boa">Boa</option>
                    <option value="ruim">Ruim</option>
                </select>
            </div>
 
            <div className="flex flex-col gap-4 mt-6">
                <button
                    type="button"
                    onClick={calcularRisco}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                    Simular Risco
                </button>
 
                <button
                    type="button"
                    onClick={enviarAvaliacao}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Enviar Avaliação para o Sistema
                </button>
            </div>
        </form>
    );
};
 
export default FormSimulacao;