# 🏆 know-your-fan
Formulario/Site básico para análise de cadastro de fan, contém um backend que utiliza AI para verificar documentos, cadastro, gosto do usuário, redes sociais, páginas relacionadas a e-sports e verifica autenticidade dos documentos.

## 🛠️ Installation and Testing
<p align="center">
 <a href="#pre-requisitos">Pré-Requisitos</a> •
 <a href="#backend">Rodando o Backend</a> •
 <a href="#frontend">Rodando o Frontend</a> •
 <a href="#firebase">Montando Banco de dados (Firebase) </a> •
 <a href="#app">Testando a Aplicação</a> • 
 <a href="#problemas">Solução de Problemas</a> • 
 <a href="#autor">Autor</a> • 
</p><br>

# Como rodar a aplicação localmente?
Este projeto é dividido em duas partes: o backend (servidor que se comunica com o banco de dados) e o frontend (interface de usuário). A seguir estão as instruções de como rodar ambos localmente em seu ambiente de desenvolvimento.

<h2 id="pre-requisitos">🗒️ 1. Pré-Requisitos</h2>

Antes de rodar a aplicação, você precisa garantir que tenha as seguintes ferramentas instaladas em sua máquina:

Node.js (você pode baixar aqui: Node.js)

```npm ``` (gerenciador de pacotes que vem com o Node.js)

```Git ``` (opcional, mas recomendado, para clonar o repositório)

<h2 id="backend">💻 2. Rodando o Backend</h2>
O backend é responsável por processar as requisições e interagir com o Firebase, assim ele envia os dados e as informações que o Tesseract.js captura para o banco.

### Passo 1: Navegar até a pasta backend
Se você ainda não tiver o repositório clonado, faça isso primeiro:

```
git clone https://github.com/SEU-USUARIO/know-your-fan.git
cd know-your-fan/backend
```
### Passo 2: Instalar as dependências do BACKEND
Na pasta know-your-fan/backend, rode:
```
npm install
```
Isso irá instalar todas as dependências necessárias para o backend funcionar.

### Passo 3: Rodar o servidor
Após instalar as dependências, você pode rodar o servidor localmente:

```
npm run dev
```
O servidor estará rodando na porta 4000. Você pode acessar o backend através de http://localhost:4000.


<h2 id="frontend">🎨 3. Rodando o frontend</h2>
O frontend é a interface de usuário onde as informações são capturadas e enviadas para o backend.

### Passo 1: Navegar até a pasta frontend
Se você ainda não estiver na pasta do frontend, entre nela:

```
cd ../frontend
```
### Passo 2: Instalar as dependências
Dentro da pasta frontend, instale as dependências:

```
npm install
```

### Passo 3: Rodar a aplicação
Após instalar as dependências, execute o comando para rodar o frontend localmente:

```
npm run dev
```
A aplicação estará provavelmente rodando na porta 5173. Você pode acessar o frontend através de http://localhost:5173.


<h2 id="firebase">📁 4. Ambiente Firebase</h2>

Certifique-se de que o Firebase esteja configurado corretamente para o backend, ou caso precise utilizar outro SGBD, fique a vontade! Aqui estão as etapas:

### Passo 1: Criar um projeto no Firebase Console
Crie um novo projeto no Firebase e obtenha as credenciais de acesso (arquivo firebaseConfig) e obtenha sua chave de API.

### Passo 2: Configurar o Firebase no backend
No arquivo de configuração do backend (firebase.ts ou algo similar), adicione as credenciais que você obteve no passo anterior.

Exemplo:

```
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Suas credenciais do Firebase
const firebaseConfig = {
  apiKey: 'API_KEY',
  authDomain: 'PROJECT_ID.firebaseapp.com',
  projectId: 'PROJECT_ID',
  storageBucket: 'PROJECT_ID.appspot.com',
  messagingSenderId: 'SENDER_ID',
  appId: 'APP_ID',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
```

<h2 id="app">✅ 5. Testando a Aplicação</h2>

Após iniciar **ambos o backend quanto o frontend**, você pode testar a aplicação localmente da seguinte forma:

Preencha o formulário no frontend com os dados do usuário (nome, email, etc.).

Faça upload de um documento de CPF ou outro.

O backend irá processar os dados, validar e salvar no banco de dados Firebase.

Você verá uma mensagem de sucesso ou erro com base nos dados enviados.


<h2 id="problemas">👾 6. Solução de Problemas</h2>

Se você encontrar algum erro durante o processo, ou acredita que algo precisa de melhorias, fique a vontade para deixar um comentário ou sugestão!

### Como você pode ajudar?

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e deixe um commit com uma mensagem das alterações: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`


<h2 id="autor">👤 Autor</h2>

<a href="https://br.linkedin.com/in/lucasgossdias-"><br>
Lucas/Luke</a>
 <br />
 
[![Gmail Badge](https://img.shields.io/badge/-lucasgossdias@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:lucasossdias@gmail.com)](mailto:lucasgossdias@gmail.com.com)



