import './globals.css';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata = {
  title: 'ClimaAI',
  description: 'Simulador de risco climático personalizado',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}