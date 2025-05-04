import sharp from "sharp";
import { createWorker } from "tesseract.js";
import path from "path";
import fs from "fs";

export async function extrairTextoComOCR(caminhoImagem: string): Promise<string> {
  // Preprocessar imagem com sharp
  const imagemProcessada = caminhoImagem.replace(/(\.\w+)$/, "_pre$1");

  await sharp(caminhoImagem)
    .resize(1000) // ajusta para uma largura consistente
    .grayscale()
    .normalize() // aumenta contraste
    .toFile(imagemProcessada);

  // Usar Tesseract para extrair texto da imagem processada
  const worker = await createWorker("por"); // português
  const {
    data: { text },
  } = await worker.recognize(imagemProcessada);

  await worker.terminate();
  fs.unlinkSync(imagemProcessada); // limpa imagem temporária
  return text;
}
