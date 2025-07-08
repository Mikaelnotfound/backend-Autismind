## 📂 Estrutura do Projeto

```plaintext
assets/
├── MER_autimind.png            # Imagem do MER do banco de dados
└── Readme/                     # Documentação do repositório
docs/
└── swagger.js                  # Estrutura da documentação Swagger
src/
├── controllers/                # Controllers das entidades
│   ├── CharacterController.js
│   ├── ChatController.js
│   ├── HistoricalController.js
│   ├── MessageController.js
│   ├── UserLoginController.js
│   └── UserRegisterController.js
├── database/                   # Configuração e queries do banco de dados
│   ├── Pool/
│   │   └── Pool.js
│   ├── querys/
│   │   ├── CharacterQuerys.js
│   │   ├── ChatQuerys.js
│   │   ├── HistoricalQuerys.js
│   │   ├── MessageQuerys.js
│   │   └── UserQuerys.js
|   ├── DatabaseQuery.js
│   └── migrate.js
├── routes/                     # Rotas da API
│   ├── character.js
│   ├── chats.js
│   ├── historical.js
│   ├── index.js
│   ├── message.js
│   └── users.js
└── utils/
│   ├── Auth.js                 # Autenticação de usuários
│   ├── geminiServices.js       # Integração centralizada com Gemini API
│   └── verify.js               # Validação de entrada
├── App.js                      # Arquivo principal para execução (backend)
├── env.js                      # Variáveis de ambiente
└── server.js                   # Configuração do servidor
.gitignore                      # Arquivos e diretórios ignorados pelo Git
LICENSE                         # Licença do projeto
package.json                    # Dependências do projeto
README.md                       # Documentação do projeto
```