import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { extrairTextoDoArquivo } from '../../ocr.service';

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pasta de destino
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, uniqueName);
  }
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB máximo
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo não permitido'));
    }
  }
});

export const uploadDocumento = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ erro: 'Nenhum arquivo enviado.' });
      return;
    }

    const textoExtraido = await extrairTextoDoArquivo(req.file.path);

    // Aqui você pode fazer validações simples, por exemplo:
    const nomeEsperado = req.body?.nome;
    const cpfEsperado = req.body?.cpf?.replace(/[^\d]/g, '');

    const valido = textoExtraido.includes(nomeEsperado) && textoExtraido.includes(cpfEsperado);

    res.status(200).json({
      mensagem: 'Arquivo processado com sucesso!',
      valido,
      textoExtraido
    });
  } catch (err) {
    console.error('Erro no upload:', err);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
};
  
