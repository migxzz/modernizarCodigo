# Floricultura - Aplicação Refatorada

Este projeto é uma refatoração da aplicação Floricultura, utilizando:
- **Frontend**: React
- **Backend**: Node.js com Express
- **Banco de Dados**: MySQL (mantido do projeto original)

## Estrutura do Projeto

```
hacka-flores-refatorado/
├── backend/           # API Node.js com Express
│   ├── config/        # Configurações do servidor e banco de dados
│   ├── controllers/   # Controladores da API
│   ├── models/        # Modelos de dados
│   ├── routes/        # Rotas da API
│   ├── middleware/    # Middlewares da aplicação
│   ├── utils/         # Funções utilitárias
│   ├── server.js      # Ponto de entrada do servidor
│   └── package.json   # Dependências do backend
│
└── frontend/          # Aplicação React
    ├── public/        # Arquivos estáticos
    ├── src/           # Código fonte React
    │   ├── components/# Componentes React
    │   ├── pages/     # Páginas da aplicação
    │   ├── services/  # Serviços para comunicação com a API
    │   ├── context/   # Contextos React (estado global)
    │   ├── hooks/     # Hooks personalizados
    │   ├── utils/     # Funções utilitárias
    │   ├── App.js     # Componente principal
    │   └── index.js   # Ponto de entrada do React
    └── package.json   # Dependências do frontend
```

## Como executar

### Backend
```
cd backend
npm install
npm start
```

### Frontend
```
cd frontend
npm install
npm start
```