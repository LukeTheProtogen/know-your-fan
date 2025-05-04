import Tesseract from 'tesseract.js';

export const extrairTextoDoArquivo = async (caminhoArquivo: string): Promise<string> => {
  try {
    const resultado = await Tesseract.recognize(
      caminhoArquivo,
      'por+eng',
      { logger: m => console.log(m) }
    );

    return resultado.data.text.replace(/\s+/g, ' ').trim(); // Limpa quebras de linha e espaços duplicados
  } catch (err) {
    console.error('Erro ao extrair texto:', err);
    return '';
  }
};
