"use-strict";

require('dotenv').config();
const HOST = process.env.HOST;
const PORT = process.env.PORT;

const swaggerDocs = {
  openapi: "3.0.0",
  info: {
    title: "API Autismind - Chatbot",
    version: "1.0.0",
    description: "Documentação da API do Autismind - Chatbot",
    contact: {
      name: "Autismind Team",
      email: "carlosmikael273@gmail.com"
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/license/mit/"
    }
  },
  servers: [
    {
      url: `http://${HOST}:${PORT}/api`,
      description: "Servidor de desenvolvimento"
    }
  ],
  paths: {
    // USERS
    "/users": {
      get: {
        tags: ["Usuários"],
        summary: "Buscar todos os usuários",
        description: "Retorna uma lista de todos os usuários registrados no sistema.",
        responses: {
          200: {
            description: "Lista de usuários.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "integer", example: 1 },
                      username: { type: "string", example: "peter" },
                      email: { type: "string", example: "peter.doc@gmail.com" },
                      communication_level: { type: "integer", example: 5 }
                    }
                  },
                  example: [
                    {
                      id: 1,
                      username: "peter",
                      email: "peter.doc@gmail.com",
                      communication_level: 5
                    },
                    {
                      id: 2,
                      username: "john",
                      email: "john.doe@gmail.com",
                      communication_level: 4
                    }
                  ]
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["Usuários"],
        summary: "Criar um novo usuário",
        description: "Cria um novo usuário no sistema.",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string", example: "peter" },
                  email: { type: "string", example: "peter.doc@gmail.com" },
                  password: { type: "string", example: "123456" },
                  communication_level: { type: "integer", example: 5 }
                },
                required: ["username", "email", "password", "communication_level"]
              }
            }
          }
        },
        responses: {
          201: {
            description: "User created successfully."
          },
          400: { description: "Invalid data." },
          409: { description: "User already exists." }
        }
      }
    },
    "/users/{id}": {
      get: {
        tags: ["Usuários"],
        summary: "Buscar usuário por ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID do usuário"
          }
        ],
        responses: {
          200: {
            description: "Usuário encontrado.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "integer", example: 1 },
                    username: { type: "string", example: "peter" },
                    email: { type: "string", example: "peter.doc@gmail.com" },
                    communication_level: { type: "integer", example: 5 }
                  }
                }
              }
            }
          },
          404: { description: "User not found." }
        }
      },
      put: {
        tags: ["Usuários"],
        summary: "Atualizar usuário por ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID do usuário"
          }
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string", example: "peter" },
                  email: { type: "string", example: "peter.doc@gmail.com" },
                  password: { type: "string", example: "123456" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "User updated successfully." },
          404: { description: "User not found." }
        }
      },
      delete: {
        tags: ["Usuários"],
        summary: "Deletar usuário por ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID do usuário"
          }
        ],
        responses: {
          200: { description: "User deleted successfully." },
          404: { description: "User not found." }
        }
      }
    },

    // LOGIN
    "/login/": {
      post: {
        tags: ["Login"],
        summary: "Login do usuário",
        description: "Realiza o login do usuário e retorna o token JWT.",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", example: "peter.doc@gmail.com" },
                  password: { type: "string", example: "123456" }
                },
                required: ["email", "password"]
              }
            }
          }
        },
        responses: {
          200: {
            description: "Login successful.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Login successful" },
                    user: {
                      type: "object",
                      properties: {
                        id: { type: "integer", example: 1 },
                        username: { type: "string", example: "peter" },
                        email: { type: "string", example: "peter.doc@gmail.com" },
                        jwt_token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR..." }
                      }
                    }
                  }
                }
              }
            }
          },
          400: { description: "Invalid email format." },
          401: { description: "Invalid password." },
          404: { description: "User not found." }
        }
      }
    },

    // HISTORICAL
    "/users/{userId}/historical/": {
      get: {
        tags: ["Histórico"],
        summary: "Buscar histórico de usuário por ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID do usuário"
          }
        ],
        responses: {
          200: {
            description: "Histórico encontrado.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    historical: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "integer", example: 1 },
                          date: { type: "string", format: "date-time", example: "2023-10-01T12:00:00Z" },
                          chat_id: { type: "integer", example: 1 },
                          chat_title: { type: "string", example: "Chat with Peter" },
                          user_id: { type: "integer", example: 1 }
                        }
                      },
                      example: [
                        {
                          id: 1,
                          date: "2023-10-01T12:00:00Z",
                          chat_id: 1,
                          chat_title: "Chat with Peter",
                          user_id: 1
                        },
                        {
                          id: 2,
                          date: "2023-10-02T14:30:00Z",
                          chat_id: 2,
                          chat_title: "Chat with John",
                          user_id: 1
                        }
                      ]
                    }
                  }
                }
              }
            }
          },
          403: { description: "Access denied." },
          404: { description: "User not found." }
        }
      }
    },

    // MESSAGES
    "/users/{userId}/messages/": {
      get: {
        tags: ["Mensagens"],
        summary: "Buscar mensagens de usuário por ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID do usuário"
          }
        ],
        responses: {
          200: {
            description: "Mensagens encontradas.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    messages: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "integer", example: 1 },
                          shipping_date: { type: "string", format: "date-time", example: "2023-10-01T12:00:00Z" },
                          sent_by: { type: "string", enum: ["user", "bot"], example: "user" },
                          content: { type: "string", example: "Hello, how are you?" },
                          user_id: { type: "integer", example: 1 },
                          chat_id: { type: "integer", example: 1 }
                        }
                      },
                      example: [
                        {
                          id: 1,
                          shipping_date: "2023-10-01T12:00:00Z",
                          sent_by: "user",
                          content: "Hello, how are you?",
                          user_id: 1,
                          chat_id: 1
                        },
                        {
                          id: 2,
                          shipping_date: "2023-10-02T14:30:00Z",
                          sent_by: "bot",
                          content: "I'm fine, thank you!",
                          user_id: 1,
                          chat_id: 1
                        }
                      ]
                    }
                  }
                }
              }
            }
          },
          403: { description: "Access denied." },
          404: { description: "User not found." }
        }
      }
    },
    "/chat/{chatId}/messages/": {
      get: {
        tags: ["Mensagens"],
        summary: "Buscar mensagens de chat por ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "chatId",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID do chat"
          }
        ],
        responses: {
          200: {
            description: "Mensagens encontradas.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    messages: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "integer", example: 1 },
                          shipping_date: { type: "string", format: "date-time", example: "2023-10-01T12:00:00Z" },
                          sent_by: { type: "string", enum: ["user", "bot"], example: "user" },
                          content: { type: "string", example: "Hello, how are you?" },
                          user_id: { type: "integer", example: 1 },
                          chat_id: { type: "integer", example: 1 }
                        }
                      },
                      example: [
                        {
                          id: 1,
                          shipping_date: "2023-10-01T12:00:00Z",
                          sent_by: "user",
                          content: "Hello, how are you?",
                          user_id: 1,
                          chat_id: 1
                        },
                        {
                          id: 2,
                          shipping_date: "2023-10-02T14:30:00Z",
                          sent_by: "bot",
                          content: "I'm fine, thank you!",
                          user_id: 1,
                          chat_id: 1
                        }
                      ]
                    }
                  }
                }
              }
            }
          },
          404: { description: "Chat not found." }
        }
      }
    },
    "/messages/chat/{id}": {
      post: {
        tags: ["Mensagens"],
        summary: "Criar nova mensagem em um chat",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID do chat"
          }
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user_id: { type: "integer", example: 1 },
                  content: { type: "string", example: "Oi, tudo bem?" },
                  sent_by: { type: "string", enum: ["user", "bot"], example: "user" }
                },
                required: ["user_id", "content", "sent_by"]
              }
            }
          }
        },
        responses: {
          200: { description: "message registered successfully" },
          400: { description: "Dados inválidos ou chat não encontrado." }
        }
      }
    },
    "/messages/{id}": {
      delete: {
        tags: ["Mensagens"],
        summary: "Deletar mensagem por ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID da mensagem"
          }
        ],
        responses: {
          200: { description: "Message deleted successfully" },
          404: { description: "Message not found" }
        }
      }
    },

    // CHATS
    "/users/chats/{userId}": {
      get: {
        tags: ["Chats"],
        summary: "Buscar todos os chats de um usuário",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID do usuário"
          }
        ],
        responses: {
          200: {
            description: "Lista de chats.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    chats: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "integer", example: 1 },
                          date: { type: "string", format: "date-time", example: "2023-10-01T12:00:00Z" },
                          title: { type: "string", example: "Chat com o bot" },
                          user_id: { type: "integer", example: 1 },
                          character_id: { type: "integer", example: 1 }
                        }
                      },
                      example: [
                        {
                          id: 1,
                          date: "2023-10-01T12:00:00Z",
                          title: "Chat com o bot",
                          user_id: 1,
                          character_id: 1
                        },
                        {
                          id: 2,
                          date: "2023-10-02T14:30:00Z",
                          title: "Chat com o amigo",
                          user_id: 1,
                          character_id: 2
                        }
                      ]
                    }
                  }
                }
              }
            }
          },
          403: { description: "Access denied." },
          404: { description: "User not found." }
        }
      }
    },
    "/chats": {
      post: {
        tags: ["Chats"],
        summary: "Criar novo chat",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user_id: { type: "integer", example: 1 },
                  character_id: { type: "integer", example: 1 },
                  title: { type: "string", example: "Meu chat" }
                },
                required: ["user_id", "character_id", "title"]
              }
            }
          }
        },
        responses: {
          201: { description: "Chat created successfully" },
          400: { description: "Dados inválidos" }
        }
      }
    },
    "/chats/{id}": {
      delete: {
        tags: ["Chats"],
        summary: "Deletar chat por ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID do chat"
          }
        ],
        responses: {
          200: { description: "Chat deleted successfully" },
          404: { description: "Chat not found" }
        }
      }
    },

    // CHARACTERS
    "/characters": {
      get: {
        tags: ["Personagens"],
        summary: "Buscar todos os personagens",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Lista de personagens.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    characters: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "integer", example: 1 },
                          name: { type: "string", example: "Bot Amigo" },
                          personality: { type: "string", example: "Alegre e prestativo" }
                        }
                      },
                      example: [
                        {
                          id: 1,
                          name: "Bot Amigo",
                          personality: "Alegre e prestativo"
                        },
                        {
                          id: 2,
                          name: "Assistente Inteligente",
                          personality: "Sábio e calmo"
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["Personagens"],
        summary: "Criar novo personagem",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Bot Amigo" },
                  personality: { type: "string", example: "Alegre e prestativo" }
                },
                required: ["name", "personality"]
              }
            }
          }
        },
        responses: {
          201: { description: "Character created successfully" },
          400: { description: "Invalid data" }
        }
      }
    },
    "/characters/{id}": {
      get: {
        tags: ["Personagens"],
        summary: "Buscar personagem por ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID do personagem"
          }
        ],
        responses: {
          200: {
            description: "Personagem encontrado.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    character: {
                      type: "object",
                      properties: {
                        id: { type: "integer", example: 1 },
                        name: { type: "string", example: "Bot Amigo" },
                        personality: { type: "string", example: "Alegre e prestativo" }
                      }
                    }
                  }
                }
              }
            }
          },
          404: { description: "Character not found" }
        }
      },
      delete: {
        tags: ["Personagens"],
        summary: "Deletar personagem por ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID do personagem"
          }
        ],
        responses: {
          200: { description: "Character deleted successfully" },
          404: { description: "Character not found" }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  }
};

module.exports = swaggerDocs;