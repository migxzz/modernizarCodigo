<?php

?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo Core\View::e($titulo ?? 'Floricultura'); ?></title>
    <style>
        body { font-family: sans-serif; margin: 20px; background-color: #f4f4f4; color: #333; }
        header, footer { background-color: #333; color: #fff; padding: 10px; text-align: center; }
        nav ul { list-style-type: none; padding: 0; text-align: center; }
        nav ul li { display: inline; margin-right: 15px; }
        nav ul li a { color: #fff; text-decoration: none; }
        .container { background-color: #fff; padding: 20px; margin-top: 15px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
    </style>
</head>
<body>
    <header>
        <h1>Floricultura</h1>
        <nav>
            <ul>
                <li><a href="index.php">Início</a></li>
                <li><a href="index.php?url=clientes">Clientes</a></li>
                <li><a href="index.php?url=produtos">Produtos</a></li>
                <li><a href="index.php?url=vendas">Vendas</a></li>
                <?php if (isset($_SESSION['usuario_id'])): ?>
                    <li><a href="index.php?url=logout">Logout</a></li>
                <?php else: ?>
                    <li><a href="index.php?url=login">Login</a></li>
                <?php endif; ?>
            </ul>
        </nav>
    </header>

    <div class="container">
        <?php
        echo $content ?? ''; 
        ?>
    </div>

    <footer>
        <p>&copy; <?php echo date('Y'); ?> Floricultura. Todos os direitos reservados.</p>
    </footer>

</body>
</html>
