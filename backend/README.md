# Floricultura - Aplicação Refatorada

Este projeto é uma refatoração da aplicação Floricultura, utilizando:
- **Frontend**: React
- **Backend**: Node.js com Express
- **Banco de Dados**: MySQL (mantido do projeto original)
- **ORM**: Prisma
- **Infraestrutura**: Docker Compose

## Novas Implementações

### Prisma ORM com Docker Compose

Recentemente implementamos as seguintes melhorias:

1. **Integração do Prisma ORM**
   - Modelagem completa do banco de dados usando schema Prisma
   - Sistema de migrações para controle de versão do banco
   - Resolução do erro P3014 usando configuração de banco shadow

2. **Configuração de Docker Compose**
   - Containers para MySQL, backend e frontend
   - Rede compartilhada entre os serviços
   - Volume persistente para dados do MySQL

3. **Sistema de Seed Data**
   - Dados iniciais para desenvolvimento e testes
   - Execução automática durante inicialização do container

## Estrutura do Projeto Atualizada

```
modernizarCodigo/
├── backend/           # API Node.js com Express
│   ├── config/        # Configurações do servidor e banco de dados
│   ├── controllers/   # Controladores da API
│   ├── prisma/        # Schema Prisma e migrações
│   │   ├── schema.prisma  # Definição do modelo de dados
│   │   └── seed.ts    # Script para dados iniciais
│   ├── repositories/  # Camada de acesso a dados
│   ├── routes/        # Rotas da API
│   ├── services/      # Lógica de negócios
│   ├── server.ts      # Ponto de entrada do servidor
│   ├── .env           # Variáveis de ambiente
│   └── Dockerfile     # Configuração do container backend
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
    ├── Dockerfile     # Configuração do container frontend
    └── package.json   # Dependências do frontend
```

## Como executar

### Usando Docker Compose (Recomendado)
```bash
# Construir e iniciar todos os containers
docker-compose up --build

# Iniciar em modo detached (background)
docker-compose up -d
```

### Gerenciar containers individualmente
```bash
# Iniciar apenas o banco de dados
docker-compose up mysql

# Reiniciar apenas o backend
docker-compose restart backend

# Ver logs de um serviço específico
docker-compose logs -f backend
```

### Acessar o banco de dados
```bash
# Entrar no shell MySQL
docker exec -it legacy_ap_mysql mysql -u root -proot_password legacy_ap

# Verificar tabelas existentes
docker exec -it legacy_ap_mysql mysql -u root -proot_password -e "SHOW TABLES FROM legacy_ap;"

# Consultar dados de uma tabela
docker exec -it legacy_ap_mysql mysql -u root -proot_password -e "SELECT * FROM legacy_ap.Cliente;"
```

### Gerenciar o Prisma
```bash
# Executar Prisma Studio (interface visual para o banco)
docker exec -it legacy_ap_backend npx prisma studio

# Criar nova migração após alterar o schema
docker exec -it legacy_ap_backend npx prisma migrate dev --name nome_da_migracao

# Executar seed manualmente
docker exec -it legacy_ap_backend npx prisma db seed
```

### Parar e limpar o ambiente
```bash
# Parar todos os containers
docker-compose down

# Remover volumes (apaga dados persistentes)
docker-compose down -v
```

### Método Tradicional (sem Docker)
```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm start
```

## Modelo de Dados

O schema Prisma define 4 modelos principais:
- `Cliente`: Armazena informações de clientes (nome, cpf, email, telefone)
- `Produto`: Catálogo de produtos (nome, descrição, preço, quantidade)
- `Venda`: Registros de vendas com relação ao cliente e forma de pagamento
- `ItemVenda`: Tabela de junção entre Venda e Produto (muitos-para-muitos)