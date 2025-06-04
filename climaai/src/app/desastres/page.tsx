import Image from "next/image";

const desastres = [
  {
    nome: "Deslizamento",
    imagem: "/img/deslizamento.jpg",
    descricao:
      "Deslizamentos ocorrem quando massas de terra e pedras se soltam de encostas, geralmente após chuvas intensas. São agravados por construções irregulares e desmatamento.",
    comoAgir: [
      "Saia imediatamente se notar rachaduras no chão, muros ou paredes.",
      "Observe árvores e postes inclinados, eles são sinais claros.",
      "Nunca tente conter a terra. Vá para locais seguros e mais altos.",
      "Mantenha contato com a Defesa Civil e não retorne até liberação oficial."
    ],
  },
  {
    nome: "Enchentes",
    imagem: "/img/enchente.jpg",
    descricao:
      "Enchentes ocorrem quando a água das chuvas se acumula além da capacidade do solo e do sistema de drenagem. Causam alagamentos, perdas materiais e risco à saúde.",
    comoAgir: [
      "Não ande nem dirija por áreas alagadas, mesmo com pouca água.",
      "Desligue energia elétrica se a água estiver próxima das tomadas.",
      "Procure locais altos e seguros.",
      "Mantenha documentos e itens importantes em sacos plásticos."
    ],
  },
  {
    nome: "Desabamento",
    imagem: "/img/desabamento.jpg",
    descricao:
      "Desabamentos são colapsos de construções ou estruturas, causados por infiltrações, falhas no projeto ou deterioração. São extremamente perigosos.",
    comoAgir: [
      "Evacue imediatamente se ouvir estalos ou ver rachaduras novas.",
      "Jamais volte para buscar objetos pessoais.",
      "Chame imediatamente os bombeiros ou Defesa Civil.",
      "Evite ficar próximo à estrutura com risco de cair."
    ],
  },
];

export default function DesastresPage() {
  return (
    <main className="min-h-screen bg-white text-black px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">
        Como identificar e agir em desastres naturais
      </h1>

      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
        {desastres.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            <div className="relative w-full h-48">
              <Image
                src={item.imagem}
                alt={item.nome}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold mb-2">{item.nome}</h2>
              <p className="text-sm text-gray-800 mb-4">{item.descricao}</p>

              <div className="mt-auto">
                <h3 className="text-sm font-bold text-gray-700 mb-1 uppercase">
                  Como agir:
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {item.comoAgir.map((passo, i) => (
                    <li key={i}>{passo}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
