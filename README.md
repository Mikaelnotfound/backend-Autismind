# AutisMind Backend

Este é o backend do projeto **AutisMind**, desenvolvido em Node.js com Express.js. Ele fornece uma API RESTful para gerenciar usuários, mensagens, chats, personagens e dados históricos.

## 📋 Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Instalação](#instalação)
- [Execução](#execução)
- [Rotas da API](#rotas-da-api)
  - [Usuários](#usuários)
  - [Login](#login)
  - [Histórico](#histórico)
  - [Mensagens](#mensagens)
  - [Chats](#chats)
  - [Personagens](#personagens)
- [Banco de Dados](#banco-de-dados)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## 🛠 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express.js**: Framework para criação de APIs.
- **MySQL**: Banco de dados relacional.
- **dotenv**: Gerenciamento de variáveis de ambiente.
- **bcrypt**: Hashing de senhas.
- **mysql2**: Biblioteca para conexão com o MySQL.

---

## 📂 Estrutura do Projeto

```plaintext
backend/
├── src/
│   ├── controllers/        # Controladores da API
│   │   ├── [ChatController.js](http://_vscodecontentref_/1)
│   │   ├── [CharacterController.js](http://_vscodecontentref_/2)
│   │   ├── [HistoricalController.js](http://_vscodecontentref_/3)
│   │   ├── [MessageController.js](http://_vscodecontentref_/4)
│   │   ├── [registerController.js](http://_vscodecontentref_/5)
│   │   └── [UserLoginController.js](http://_vscodecontentref_/6)
│   ├── database/           # Configuração do banco de dados
│   │   ├── [Pool.js](http://_vscodecontentref_/7)
│   │   ├── [DatabaseQuery.js](http://_vscodecontentref_/8)
│   │   └── querys/
│   │       ├── [ChatQuerys.js](http://_vscodecontentref_/9)
│   │       ├── [CharacterQuerys.js](http://_vscodecontentref_/10)
│   │       ├── [HistoricalQuerys.js](http://_vscodecontentref_/11)
│   │       ├── [MessageQuerys.js](http://_vscodecontentref_/12)
│   │       └── [UserQuerys.js](http://_vscodecontentref_/13)
│   ├── [App.js](http://_vscodecontentref_/14)              # Configuração principal do servidor
│   └── [routes.js](http://_vscodecontentref_/15)           # Definição das rotas da API
├── .env                    # Variáveis de ambiente
├── package.json            # Dependências do projeto
└── [README.md](http://_vscodecontentref_/16)               # Documentação do projeto


### ⚙️ Configuração do Ambiente

1. Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
    ```bash
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=db_autismind
    PORT=3000

2. Certifique-se de que o MySQL está instalado e configurado no seu sistema.

3. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/autismind-backend.git
    cd autismind-backend

4. Instale as dependências:
    ```bash
    npm install

5. Execute com:
    ```bash
    npm start

## 📖 Rotas da API

**Usuários**
- **GET** `/api/register`: Retorna todos os usuários.
- **GET** `/api/register/:id`: Retorna um usuário pelo ID.
- **POST** `/api/register`: Cria um novo usuário.
- **PUT** `/api/register/:id`: Atualiza um usuário pelo ID.
- **DELETE** `/api/register/:id`: Deleta um usuário pelo ID.

**Login**
 - **GET** `/api/login`: Realiza o login de um usuário.

**Histórico**
- **GET** `/api/historical/:id`: Retorna o histórico de um usuário.
- **POST** `/api/historical/:id`: Adiciona dados ao histórico de um usuário.

**Mensagens**
- **GET** `/api/messages/user/:userId`: Retorna todas as mensagens de um usuário.
- **GET** `/api/messages/chat/:chatId`: Retorna todas as mensagens de um chat.
- **POST** `/api/messages/chat/:id`: Cria uma nova mensagem.
- **DELETE** `/api/messages/:id`: Exclui uma mensagem pelo ID.

**Chats**
- **GET** `/api/chats/user/:userId: Retorna todos os chats de um usuário.
- **POST** `/api/chats`: Cria um novo chat.
- **DELETE** `/api/chats/:id`: Exclui um chat pelo ID.

**Personagens**
- **GET** `/api/characters`: Retorna todos os personagens.
- **GET** `/api/characters/:id`: Retorna um personagem pelo ID.
- **POST** `/api/characters`: Cria um novo personagem.
- **DELETE** `/api/characters/:id`: Exclui um personagem pelo ID.


## 🗄 Banco de Dados

O banco de dados é configurado automaticamente pelo script de inicialização. Ele contém as seguintes tabelas:

- **users**: Armazena informações dos usuários.
- **character**: Armazena informações dos personagens.
- **message**: Armazena mensagens enviadas em chats.
- **chat**: Armazena informações dos chats.
- **historical**: Armazena dados históricos relacionados aos usuários.


### 🤝 Contribuição

1. Faça um Fork do projeto.
2. Crie uma branch para sua feature.

    ```bash
    git checkout -b minha-feature

3. Faça commit das suas alterações:

    ```bash
    git commit -m "Minha nova feature"

4. Envie para o repositório remoto:

    ```bash
    git push origin minha-feature

5. Abra um Pull Request.


### 📧 Contato

Se você tiver alguma dúvida ou quiser discutir sobre o projeto, pode entrar em contato conosco!

- E-mail: carlosmikael273@gmail.com
- GitHub: [MIkaelpeganinguem](https://github.com/MIkaelpeganinguem)

Estamos abertos para sugestões e contribuições!