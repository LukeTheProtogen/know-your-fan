import { useState } from 'react';
import { motion } from 'framer-motion';

export default function App() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    idade: '',
    cpf: '',
    endereco: '',
    interesses: '',
    atividades: '',
    eventos: '',
    compras: '',
    redesSociais: '',
    linksEsports: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      interesses: formData.interesses.split(',').map(item => item.trim()),
      atividades: formData.atividades.split(',').map(item => item.trim()),
      eventos: formData.eventos.split(',').map(item => item.trim()),
      compras: formData.compras.split(',').map(item => item.trim()),
      redesSociais: formData.redesSociais.split(',').map(item => item.trim()),
      linksEsports: formData.linksEsports.split(',').map(item => item.trim())
    };

    const res = await fetch('http://localhost:4000/api/user', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    alert(data.mensagem);
  };

  const handleDocumentoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const uploadData = new FormData();
      uploadData.append('documento', file);
      uploadData.append('nome', formData.nome);
      uploadData.append('cpf', formData.cpf);

      try {
        const res = await fetch('http://localhost:4000/api/documento/upload', {
          method: 'POST',
          body: uploadData
        });
        const data = await res.json();

        alert(data.valido
          ? 'Documento válido!\nTexto extraído: ' + data.textoExtraido
          : 'Documento inválido!\nTexto extraído: ' + data.textoExtraido);
      } catch (err) {
        alert('Erro ao enviar o documento.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style = {{backgroundImage: "url('https://www.csgowallpapers.com/assets/images/original/mossawi_152245956000_20190128150135_701922027894.jpg')", backgroundSize: 'cover'}}>
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4">
     
      <img src="https://upload.wikimedia.org/wikipedia/pt/f/f9/Furia_Esports_logo.png" alt="Logo da FURIA" className="mx-auto h-16 mb-4"/>
        <h1 className="text-2xl font-semibold text-center">Know Your Fan da FURIA!</h1>

        <input name="nome" placeholder="Nome completo" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        <input name="email" placeholder="Email" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        
        <select name="idade" onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2">
          <option value="">Idade</option>
          <option value="13-17">13-17</option>
          <option value="18-24">18-24</option>
          <option value="25-34">25-34</option>
          <option value="35+">35+</option>
        </select>


      {/* Sugestão de melhoria: adicionar um campo para selecionar o gênero e melhorar esses inputs, está um pouco difícil para entender e posso acabar me quebrando com o código. */ }

        <input name="cpf" placeholder="CPF" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        <input name="endereco" placeholder="Endereço completo" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        <input name="interesses" placeholder="Interesses (arte, jogos, futebol)" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        <input name="atividades" placeholder="Escreva suas atividades! (ex: jogos, streaming)" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        <input name="eventos" placeholder="Quais eventos de CS participou/assistiu?" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        <input name="compras" placeholder="Compras no último ano (Blusa, Bonés, chaveiros e etc)" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        <input name="redesSociais" placeholder="Links das redes sociais (Opcional)" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        <input name="linksEsports" placeholder="Links de perfis e-sports (Opcional)" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />

        {/* Lugar de upload de documento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Documento de identificação</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleDocumentoUpload}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg w-full hover:bg-blue-700 active:scale-95 transition transform duration-150 shadow">
          Enviar
        </button>
      </motion.div>
    </div>
  );
}
