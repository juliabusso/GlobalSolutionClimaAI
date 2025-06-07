import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#3366cc] text-white px-6 py-4 flex justify-between items-center gap-6">

      {/* Container Principal para Sobre e Nomes */}
      <div className="flex-grow flex justify-between items-start">
        
        {/* Seção Sobre */}
        <div className="max-w-md">
          <h2 className="text-lg font-semibold mb-1">Sobre</h2>
          <p className="text-sm">
            Projeto desenvolvido para a conclusão do semestre com o objetivo de ajudar pessoas em catástrofes.
          </p>
        </div>

        {/* Nomes dos Membros */}
        <div className="text-sm text-right">
          <p>Julia Damasceno Busso – RM560293</p>
          <p>João Gabriel Fuchs Grecco – RM559863 – 1TDSPB</p>
          <p>Felipe Anselmo Soares Costa – RM560661 – 1TDSPB</p>
        </div>

      </div>

      {/* Logos */}
      <div className="flex gap-4 pl-6">
        <Image
          src="/img/logo.png" 
          alt="Logo do Projeto"
          width={48}
          height={48}
        />
        <Image
          src="/img/fiap.png" 
          alt="Logo FIAP"
          width={48}
          height={48}
        />
      </div>
      
    </footer>
  )
}