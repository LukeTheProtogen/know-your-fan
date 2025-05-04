# know-your-fan
Formulario/Site básico para análise de cadastro de fan, contém um backend que utiliza AI para verificar documentos, cadastro, gosto do usuário, redes sociais, páginas relacionadas a e-sports e verifica autenticidade dos documentos.

## 🛠️ Installation and Testing
#
# Como rodar a aplicação localmente
Este projeto é dividido em duas partes: o backend (servidor que se comunica com o banco de dados) e o frontend (interface de usuário). A seguir estão as instruções de como rodar ambos localmente em seu ambiente de desenvolvimento.

## 1. Pré-requisitos

Antes de rodar a aplicação, você precisa garantir que tenha as seguintes ferramentas instaladas em sua máquina:

Node.js (você pode baixar aqui: Node.js)

```npm ``` (gerenciador de pacotes que vem com o Node.js)

```Git ``` (opcional, mas recomendado, para clonar o repositório)

## 2. Rodando o backend
O backend é responsável por processar as requisições e interagir com o Firebase. Aqui estão os passos para rodá-lo localmente.

### Passo 1: Navegar até a pasta backend
Se você ainda não tiver o repositório clonado, faça isso primeiro:

```
bash
Copy
Edit
git clone https://github.com/SEU-USUARIO/know-your-fan.git
cd know-your-fan/backend
```
### Passo 2: Instalar as dependências
```
bash
Copy
Edit
npm install
```
Isso irá instalar todas as dependências necessárias para o backend funcionar.

### Passo 3: Rodar o servidor
Após instalar as dependências, você pode rodar o servidor localmente:

```
bash
Copy
Edit
npm run dev
```
O servidor estará rodando na porta 4000. Você pode acessar o backend através de http://localhost:4000.

## 3. Rodando o frontend
O frontend é a interface de usuário onde as informações são capturadas e enviadas para o backend.

### Passo 1: Navegar até a pasta frontend
Se você ainda não estiver na pasta do frontend, entre nela:

```
bash
Copy
Edit
cd ../frontend
```
### Passo 2: Instalar as dependências
Dentro da pasta frontend, instale as dependências:

```
bash
Copy
Edit
npm install
```

### Passo 3: Rodar a aplicação
Após instalar as dependências, execute o comando para rodar o frontend localmente:

```
bash
Copy
Edit
npm run dev
```
A aplicação estará provavelmente rodando na porta 5173. Você pode acessar o frontend através de http://localhost:5173.

## 4. Ambiente Firebase
Certifique-se de que o Firebase esteja configurado corretamente para o backend, ou caso precise utilizar outro SGBD, fique a vontade! Aqui estão as etapas:

### Passo 1: Criar um projeto no Firebase Console
Crie um novo projeto no Firebase e obtenha as credenciais de acesso (arquivo firebaseConfig).

### Passo 2: Configurar o Firebase no backend
No arquivo de configuração do backend (firebase.ts ou algo similar), adicione as credenciais que você obteve no passo anterior.

Exemplo:

```
ts
Copy
Edit
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

## 5. Testando a Aplicação
Após iniciar tanto o backend quanto o frontend, você pode testar a aplicação localmente da seguinte forma:

Preencha o formulário no frontend com os dados do usuário (nome, email, etc.).

Faça upload de um documento de CPF ou outro.

O backend irá processar os dados, validar e salvar no banco de dados Firebase.

Você verá uma mensagem de sucesso ou erro com base nos dados enviados.

## 6. Solução de Problemas
Se você encontrar algum erro durante o processo, verifique o seguinte:

Problemas no Firebase: Certifique-se de que a chave de configuração do Firebase foi corretamente configurada e que você tem permissões de leitura e gravação no Firestore.

Erros no frontend: Verifique o console do navegador para possíveis erros relacionados ao JavaScript.

Erros no backend: Verifique o console do terminal onde o backend está rodando para mensagens de erro.
