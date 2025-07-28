# Live Chat App - Node.js + Next.js + MongoDB

Este é um sistema de chat em tempo real com autenticação, desenvolvido em Node.js (Express), React/Next.js, MongoDB e Socket.io. Inclui suporte a Docker.

## Funcionalidades

- Cadastro e login de usuários
- Autenticação com JWT (via cookies httpOnly)
- Chat em tempo real via WebSocket
- Notificações de novas mensagens (exibe apenas se a conversa não estiver selecionada)
- Armazenamento de mensagens no MongoDB
- Status online/offline em tempo real
- Interface responsiva

## Tecnologias

- Backend: Node.js, Express, Socket.io, MongoDB, Mongoose, Passport.js
- Frontend: Next.js, React, Tailwind CSS
- Banco: MongoDB Local (ou Atlas)
- Containerização: Docker e Docker Compose

---

## Instruções de uso com Docker

### 1. Clone o repositório

```bash
git clone https://github.com/tiagoazv/teste-chat.git
cd teste-chat
```

### 2. Configure as variáveis de ambiente

Renomeie o arquivo `.env.sample` para `.env` dentro da pasta `backend/`, com o seguinte conteúdo:

```env
# backend/.env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://mongo:27017/chat (ou se preferir coloque aqui a conexão com o Atlas)
JWT_SECRET=sua_chave_jwt_aqui
JWT_EXPIRE=24h
CLIENT_URL=http://localhost:3000
```

No frontend, faça a mesma coisa para o arquivo `.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Suba o ambiente com Docker

Com o docker instalado em seu sistema, execute:

```bash
docker-compose up --build
```

Isso irá iniciar:
- Backend em `http://localhost:5000`
- Frontend em `http://localhost:3000`
- MongoDB interno

---

## Como testar o sistema

### Cenário com múltiplos usuários:
> O modo anônimo pode impedir o carregamento devido ao isolamento de cookies de sessão.

**Recomendado**:
1. Abra o sistema em dois navegadores distintos (ex: Chrome e Firefox).
2. Cadastre e faça login com usuários diferentes.
3. Converse entre eles. As mensagens aparecerão em tempo real.
4. A **notificação de nova mensagem** só aparece se o chat **não estiver selecionado**.

---

## Scripts (modo manual)

Rodar backend:
```bash
cd backend
npm install
npm run dev
```

Rodar frontend:
```bash
cd frontend
npm install
npm run dev
```

Rodar ambos:
```bash
cd teste-chat
npm install
npm run dev
```