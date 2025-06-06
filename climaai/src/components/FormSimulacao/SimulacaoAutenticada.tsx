"use client";

import { useEffect, useState } from "react";
import FormLogin from "../FormLogin/FormLogin";
import FormSimulacao from "./FormSimulacao";

export default function SimulacaoAutenticada() {
    const [usuarioLogado, setUsuarioLogado] = useState(false);

    useEffect(() => {
        const usuarioId = localStorage.getItem("usuarioId");
        if (usuarioId) {
            setUsuarioLogado(true);
        }
    }, []);

    return (
        <div className="max-w-xl mx-auto mt-10 px-4">
            {usuarioLogado ? (
                <>
                    <h1 className="text-2xl font-bold mb-4 text-center">Formulário de Avaliação de Risco</h1>
                    <FormSimulacao />
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-4 text-center">Você precisa estar logado para continuar</h1>
                    <FormLogin />
                </>
            )}
        </div>
    );
}