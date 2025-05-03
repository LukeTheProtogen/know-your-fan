import Tesseract from 'tesseract.js';

export const extrairTextoDoArquivo = async (caminhoArquivo: string): Promise<string> => {
  const resultado = await Tesseract.recognize(
    caminhoArquivo,
    'por', // idioma português
    { logger: m => console.log(m) }
  );
  return resultado.data.text;
};
