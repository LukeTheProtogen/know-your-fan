
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
app.use(express.urlencoded({ extended: true })); 

// Aqui eu envio as fotos que são analisadas para a pasta uploads
app.use('/uploads', express.static('uploads'));

// Fazendo as rotas dos arquivos
app.use('/api/user', userRoutes);       // POST /api/user/ (Anotando para o POSTMAN e consultas aqui)
app.use('/api/documento', documentRoutes); // POST /api/documento/upload (Também estou anotadno para o Postman)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}, você pode acessar a API pelo POSTMAN!`));
