<?php

require_once __DIR__ . '/../src/init.php';

$url = $_GET['url'] ?? '/';

try {
    $router = new Core\Router();
    $router->dispatch($url);
} catch (\Exception $e) {
    http_response_code(500);
    echo "<h1>Erro na Aplicação</h1>";
    echo "<p>Ocorreu um erro inesperado: " . htmlspecialchars($e->getMessage()) . "</p>";
}

?>
