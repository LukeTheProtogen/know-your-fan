import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { db } from '../config/firebase';

// Domínios válidos para links de e-sports
const dominiosEsports = [
  'faceit.com',
  'esportal.com',
  'challengermode.com'
];

// Validação customizada para links de e-sports
const validarLinkEsports = (url: string) => {

    

  try {
    const parsedUrl = new URL(url);
    return dominiosEsports.some(d => parsedUrl.hostname.includes(d));
  } catch {
    return false;
  }
};

// Esquema de validação com Zod
const fanSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  endereco: z.string().min(5, "Endereço muito curto"),
  cpf: z.string().refine((val) => {
    const cpfLimpo = val.replace(/[^\d]/g, '');
    return cpfValidator.isValid(cpfLimpo);
  }, {
    message: "CPF inválido",
  }),
  interesses: z.array(z.string()).min(1, "Pelo menos um interesse é obrigatório"),
  atividades: z.array(z.string()).optional(),
  eventos: z.array(z.string()).optional(),
  compras: z.array(z.string()).optional(),
  redesSociais: z.array(z.string().url("URL inválida")).optional(),
  linksEsports: z.array(z.string().url("URL inválida"))
    .optional()
    .refine((links) => {
      if (!links) return true;
      return links.every(validarLinkEsports);
    }, {
      message: "Todos os links devem ser de plataformas de e-sports (faceit.com, esportal.com, challengermode.com)"
    })

    
});

// Validação de relevância dos links de redes sociais
function verificarRelevanciaRedesSociais(links: string[]): boolean {
    const palavrasChave = ['furia', 'esports', 'csgo', 'valorant', 'lol', 'e-sports'];
    return links.some(link =>
      palavrasChave.some(palavra =>
        link.toLowerCase().includes(palavra)
      )
    );
  }

// Função assíncrona para cadastrar usuário
export const cadastrarUsuario = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.body || !req.body.cpf) {
      res.status(400).json({ erro: 'O campo CPF é obrigatório.' });
      return;
    }
  
    try {
      // Remove pontuação do CPF
      req.body.cpf = req.body.cpf.replace(/[^\d]+/g, '');
  
      // Valida os dados com Zod
      const dadosValidados = fanSchema.parse(req.body);
  
      // Verifica relevância dos links de redes sociais
      if (dadosValidados.redesSociais && dadosValidados.redesSociais.length > 0) {
        const relevante = verificarRelevanciaRedesSociais(dadosValidados.redesSociais);
        if (!relevante) {
          res.status(400).json({ erro: 'Os links fornecidos não parecem estar relacionados a e-sports.' });
          return;
        }
      }
  
      // Salva no Firebase
      await db.collection('usuarios').add(dadosValidados);
  
      res.status(201).json({
        mensagem: 'Fã cadastrado com sucesso!',
        dados: dadosValidados,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ erro: err.errors });
      } else {
        console.error('Erro ao cadastrar:', err);
        res.status(500).json({ erro: 'Erro interno do servidor.' });
      }
    }
  };

