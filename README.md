# AutisMind Backend

Este é o backend do projeto **AutisMind**, desenvolvido em Node.js. Ele fornece uma interface de terminal para gerenciar usuários, mensagens, chats, personagens e dados históricos. O sistema foi projetado para rodar diretamente no terminal, permitindo interação por meio de menus.

---

## 📋 Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Instalação](#instalação)
- [Execução](#execução)
- [Funcionalidades](#funcionalidades)
  - [Menu Principal](#menu-principal)
  - [Menu do Administrador](#menu-do-administrador)
  - [Menu do Usuário](#menu-do-usuário)
- [Banco de Dados](#banco-de-dados)
- [Contribuição](#contribuição)
- [Contato](#contato)

---

## 🛠 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **MySQL**: Banco de dados relacional.
- **dotenv**: Gerenciamento de variáveis de ambiente.
- **readline-sync**: Biblioteca para entrada de dados no terminal.
- **bcrypt**: Hashing de senhas.
- **mysql2**: Biblioteca para conexão com o MySQL.

---

## 📂 Estrutura do Projeto

```plaintext
backend/
├── src/
│   ├── class/               # Classes principais do sistema
│   │   ├── Usuario.js
│   │   ├── Personagem.js
│   │   ├── Conversa.js
│   │   ├── Historico.js
│   ├── database/            # Configuração do banco de dados
│   │   ├── Pool/
│   │   │   └── Pool.js
│   │   ├── DatabaseQuery.js
│   │   └── querys/
│   │       ├── ChatQuerys.js
│   │       ├── CharacterQuerys.js
│   │       ├── HistoricalQuerys.js
│   │       ├── MessageQuerys.js
│   │       └── UserQuerys.js
│   ├── services/            # Menus e lógica de interação
│   │   ├── menu.js
│   │   ├── menuAdmin.js
│   │   └── menuUsuario.js
|   ├──utils/
|   |  └── verify.js         # Validação de entrada
│   ├── App.js               # Arquivo principal para execução
├── .env                     # Variáveis de ambiente
├── package.json             # Dependências do projeto
└── README.md                # Documentação do projeto
```

---

## ⚙️ Configuração do Ambiente

1. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

    ```bash
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=db_autismind
    PORT=3000
    EMAIL_ADM=admin123@proton.me
    ```

2. Certifique-se de que o MySQL está instalado e configurado no seu sistema.

---

## 🚀 Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/autismind-backend.git
    cd autismind-backend
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure o banco de dados:
    - O banco de dados e as tabelas serão criados automaticamente ao iniciar o sistema.

---

## ▶️ Execução

Para iniciar o sistema, execute o seguinte comando no terminal:

```bash
node src/App.js
```

O menu principal será exibido no terminal, permitindo que você interaja com o sistema.

---

## 📖 Funcionalidades

### Menu Principal

- **1. Login:** Permite que o usuário faça login no sistema.
- **2. Registrar:** Permite que um novo usuário seja registrado.
- **3. Sair:** Encerra o programa.

### Menu do Administrador

Após fazer login como administrador, você terá acesso às seguintes opções:

- **1. Cadastrar Personagem:** Permite criar novos personagens no sistema.
- **2. Visualizar Usuários e Mensagens:** Exibe todos os usuários cadastrados e permite visualizar as mensagens de um usuário específico.
- **3. Sair:** Retorna ao menu principal.

### Menu do Usuário

Após fazer login como usuário, você terá acesso às seguintes opções:

- **1. Criar Conversa:** Permite iniciar uma nova conversa com um personagem.
- **2. Enviar Mensagem:** Permite enviar mensagens para um personagem em uma conversa existente.
- **3. Sair:** Retorna ao menu principal.

---

## 🗄 Banco de Dados

O banco de dados contém as seguintes tabelas:

- **users:** Armazena informações dos usuários.
- **character:** Armazena informações dos personagens.
- **message:** Armazena mensagens enviadas em chats.
- **chat:** Armazena informações dos chats.
- **historical:** Armazena dados históricos relacionados aos usuários.

---

## 🤝 Contribuição

1. Faça um Fork do projeto.
2. Crie uma branch para sua feature:
    ```bash
    git checkout -b minha-feature
    ```

3. Faça commit das suas alterações:
    ```bash
    git commit -m "Minha nova feature"
    ```

4. Envie para o repositório remoto:
    ```bash
    git push origin minha-feature
    ```

5. Abra um Pull Request.

---

## 📧 Contato

Se você tiver alguma dúvida ou quiser discutir sobre o projeto, pode entrar em contato!

**Mikael Carlos**
- E-mail: carlosmikael273@gmail.com
- GitHub: [MIkaelpeganinguem](https://github.com/MIkaelpeganinguem)

**Contribuições de:**

**Misia Taís**
- E-mail (institucional): Mtssm2@aluno.ifal.edu.br
- GitHub: [misiatais](https://github.com/misiatais)

**Vitória Priscila**
- E-mail (institucional): vpsv1@aluno.ifal.edu.br
- GitHub: [peskyBeecode](https://github.com/peskyBeecode)

**Tales Rafael**
- E-mail (institucional): trsl2@aluno.ifal.edu.br
- GitHub: [talitosud007](https://github.com/talitosud007)



Estamos abertos para sugestões e contribuições!