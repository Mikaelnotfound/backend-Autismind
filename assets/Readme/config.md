## ⚙️ Configuração do Ambiente

1. Renomeie o arquivo `.env.example` para `.env` e configure as seguintes variáveis:

    ```bash
    JWT_SECRET=
    JWT_EXPIRATION=
    PORT=
    HOST=
    DB_NAME=
    DB_HOST=
    DB_PORT=
    DB_USER=
    DB_PASSWORD=
    DB_DIALECT=
    EMAIL_ADM=
    ```

2. Certifique-se de que o MySQL está instalado e configurado no seu sistema.
3. Para preencher as variáveis 
    ```bash
    GEMINI_API_KEY=
    GEMINI_API_URL=
    ```
    é preciso acessar o <a href="https://aistudio.google.com/app/apikey">Google AI Studio</a> e gerar sua chave de API. Lá você encontrará as instruções para criar uma API Key e também o valor para a ```GEMINI_API_URL```. Essas credenciais são essenciais para que a aplicação possa se comunicar com a API do Gemini.