"use client";

export default function Loading({ mensagem = "Carregando..." }: { mensagem?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid" />
      <p className="mt-4 text-gray-600">{mensagem}</p>
    </div>
  );
}
