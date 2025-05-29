# Sistema de Gerenciamento de Floricultura

Um sistema web desenvolvido em PHP para gerenciamento de floricultura, incluindo controle de clientes, produtos e vendas.

## 📋 Sobre o Projeto

Este é um sistema de gerenciamento completo para floriculturas que permite:
- Cadastro e gerenciamento de clientes
- Controle de produtos e estoque
- Registro e acompanhamento de vendas
- Interface web responsiva e intuitiva

## 🛠 Tecnologias Utilizadas

- **PHP 7.4+** - Linguagem de programação principal
- **MySQL** - Banco de dados
- **HTML5/CSS3** - Interface do usuário
- **Arquitetura MVC** - Padrão de desenvolvimento
- **PDO** - Conexão com banco de dados
- **Sessions** - Gerenciamento de sessões

## 📁 Estrutura do Projeto

```
hacka-flores/
├── config/
│   └── database.php          # Configurações do banco de dados
├── db/
│   └── conexao.php          # Classe de conexão (legacy)
├── public/
│   ├── index.php            # Ponto de entrada da aplicação
│   ├── login.php            # Página de login
│   ├── logout.php           # Script de logout
│   ├── venda_add.php        # Adicionar venda
│   ├── vendas.php           # Listagem de vendas
│   └── css/
│       └── style.css        # Estilos da aplicação
├── src/
│   ├── init.php             # Inicialização da aplicação
│   ├── Controllers/         # Controladores MVC
│   │   ├── ClientesController.php
│   │   ├── HomeController.php
│   │   ├── ProdutosController.php
│   │   └── VendasController.php
│   ├── Core/                # Classes principais do sistema
│   │   ├── Database.php     # Gerenciador de banco de dados
│   │   ├── Router.php       # Sistema de roteamento
│   │   └── View.php         # Renderização de views
│   └── Models/              # Modelos de dados
│       ├── Cliente.php
│       ├── Produto.php
│       └── Venda.php
└── templates/               # Templates/Views
    ├── cliente/
    ├── produto/
    ├── venda/
    ├── home/
    ├── layouts/
    └── errors/
```

## ⚙️ Configuração e Instalação

### Pré-requisitos

- PHP 7.4 ou superior
- MySQL 5.7 ou superior
- Servidor web (Apache/Nginx) ou XAMPP/WAMP
- Composer (opcional)

### Passos para Instalação

1. **Clone o repositório**
   ```bash
   git clone [url-do-repositorio]
   cd hacka-flores
   ```

2. **Configure o banco de dados**
   - Crie um banco de dados MySQL chamado `legacy_ap`
   - Execute os scripts SQL necessários para criar as tabelas
   - Ajuste as configurações em `config/database.php` se necessário

3. **Configuração do arquivo database.php**
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'legacy_ap');
   define('DB_USER', 'root');
   define('DB_PASS', '');
   ```

4. **Configure o servidor web**
   - Aponte o DocumentRoot para a pasta `public/`
   - Ou use o servidor interno do PHP: `php -S localhost:8000 -t public/`

5. **Acesse a aplicação**
   - Abra o navegador e acesse `http://localhost` ou `http://localhost:8000`

Teste PR