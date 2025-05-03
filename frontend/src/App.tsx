// Importando as bibliotecas necessárias para rodar
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css';
import { useState } from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold text-blue-500">
        Tailwind está funcionando! 🎉
      </h1>
      <p className="mt-4 text-lg">
        Agora sim! Estilização com Tailwind no React usando Vite.
      </p>
    </div>
  );
}

