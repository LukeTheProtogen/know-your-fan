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

  const [documentoPreview, setDocumentoPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [mensagemStatus, setMensagemStatus] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const redes = formData.redesSociais.split(',').map(item => item.trim());
    const esports = formData.linksEsports.split(',').map(item => item.trim());
  
    const urlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
    const esportesPermitidos = ['faceit.com', 'esportal.com', 'challengermode.com'];
  
    const redesInvalidas = redes.some(url => url && !urlRegex.test(url));
    const esportsInvalidos = esports.some(url =>
      !urlRegex.test(url) || !esportesPermitidos.some(d => url.includes(d))
    );
  
    if (redesInvalidas || esportsInvalidos) {
      alert('⚠️ Verifique os links informados:\n- URLs devem ser válidas.\n- Links de e-sports devem ser de: faceit.com, esportal.com ou challengermode.com');
      return;
    }
  
    const payload = {
      ...formData,
      interesses: formData.interesses.split(',').map(item => item.trim()),
      atividades: formData.atividades.split(',').map(item => item.trim()),
      eventos: formData.eventos.split(',').map(item => item.trim()),
      compras: formData.compras.split(',').map(item => item.trim()),
      redesSociais: redes,
      linksEsports: esports
    };
  
    try {
      const res = await fetch('http://localhost:4000/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(`Erro do servidor: ${res.status} - ${JSON.stringify(data)}`);
      }
  
      alert(data.mensagem);
    } catch (err) {
      alert('Erro ao enviar dados: ' + err);
    }
  };

  const handleDocumentoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setDocumentoPreview(URL.createObjectURL(file));
      setUploadProgress(0);
      setMensagemStatus('');

      const uploadData = new FormData();
      uploadData.append('documento', file);
      uploadData.append('nome', formData.nome);
      uploadData.append('cpf', formData.cpf);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:4000/api/documento/upload');

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
        }
      };

      xhr.onload = () => {
        const response = JSON.parse(xhr.responseText);
        setMensagemStatus(response.valido
          ? '✅ Documento válido!\nTexto extraído: ' + response.textoExtraido
          : '❌ Documento inválido!\nTexto extraído: ' + response.textoExtraido);
      };

      xhr.onerror = () => {
        setMensagemStatus('Erro ao enviar o documento.');
      };

      xhr.send(uploadData);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style = {{backgroundImage: "url('https://www.csgowallpapers.com/assets/images/original/mossawi_152245956000_20190128150135_701922027894.jpg')", backgroundSize: 'cover'}}>
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4">
     
      <img src="https://upload.wikimedia.org/wikipedia/pt/f/f9/Furia_Esports_logo.png" alt="Logo da FURIA" className="mx-auto h-16 mb-4"/>
        <h1 className="text-2xl font-semibold text-center">Know Your Fan da FURIA!</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
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
        
          {/* todos os inputs aqui dentro */}
        <button className="bg-blue-600 text-white p-2 rounded-lg w-full hover:bg-blue-700 active:scale-95 transition transform duration-150 shadow"> Enviar</button>
  
      </form>
      </motion.div>
    </div>
  );
}
