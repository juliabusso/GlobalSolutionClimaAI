import Image from "next/image";
import { Button } from "@/components/Button";

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] p-4">
      <div className="bg-white shadow-lg rounded-2xl max-w-md w-full p-6 sm:p-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <Image
            src="/profile-placeholder.png" // Substituir pelo caminho correto da imagem do usuário
            alt="Foto de perfil"
            width={96}
            height={96}
            className="rounded-full object-cover"
          />
          <div className="w-full text-left space-y-3">
            <div>
              <label className="text-sm font-bold text-[#2A597D]">Usuário</label>
              <div className="p-2 border rounded-lg bg-gray-100">john_doe</div>
            </div>
            <div>
              <label className="text-sm font-bold text-[#2A597D]">Email</label>
              <div className="p-2 border rounded-lg bg-gray-100">john@example.com</div>
            </div>
            <div>
              <label className="text-sm font-bold text-[#2A597D]">Senha</label>
              <div className="p-2 border rounded-lg bg-gray-100">********</div>
            </div>
          </div>
          <Button className="mt-4 w-full bg-[#F28C6A] text-white font-bold hover:bg-[#e57856]">
            Editar Perfil
          </Button>
        </div>
      </div>
    </div>
  );
}
