// src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import documentRoutes from './routes/document.routes';

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Processa JSON
app.use(express.urlencoded({ extended: true })); // Processa form-urlencoded

// Servir arquivos da pasta 'uploads'
app.use('/uploads', express.static('uploads'));

// ✅ Isola as rotas
app.use('/api/user', userRoutes);       // POST /api/user/
app.use('/api/documento', documentRoutes); // POST /api/documento/upload

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
