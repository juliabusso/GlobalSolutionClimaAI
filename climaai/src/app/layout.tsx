import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./components/globals.css";

export const metadata = {
  title: "ClimaAI",
  description: "Simulador de risco pessoal em desastres naturais",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="flex flex-col min-h-screen bg-white text-gray-800">
        <Header />
        <main className="flex-grow px-4 sm:px-8 md:px-16 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
