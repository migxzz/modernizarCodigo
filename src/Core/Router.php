<?php

namespace Core;

class Router {
    protected $routes = [];
    protected $controller = 'HomeController';
    protected $method = 'index';
    protected $params = [];

    public function __construct() {
    }

    public function addRoute(string $route, array $params = []) {
        $this->routes[$route] = $params;
    }

    public function dispatch(string $url) {
        $url = $this->parseUrl($url);

        if (!empty($url[0])) {
            $controllerName = ucwords(strtolower($url[0])) . 'Controller';
            $controllerFile = __DIR__ . '/../Controllers/' . $controllerName . '.php';
            if (file_exists($controllerFile)) {
                $this->controller = $controllerName;
                unset($url[0]);
            }
        }
        
        $this->controller = 'Controllers\\' . $this->controller;
        
        if (class_exists($this->controller)) {
            $this->controller = new $this->controller;
        } else {
            $this->trigger404("Controller " . str_replace('Controllers\\', '', $this->controller) . " não encontrado.");
            return;
        }

        if (isset($url[1])) {
            $methodName = $url[1];
            if (method_exists($this->controller, $methodName)) {
                $this->method = $methodName;
                unset($url[1]);
            } else {
                $this->trigger404("Método " . $methodName . " não encontrado no controller.");
                return;
            }
        }

        $this->params = $url ? array_values($url) : [];

        call_user_func_array([$this->controller, $this->method], $this->params);
    }

    protected function parseUrl(string $url): array {
        if (strpos($url, '?') !== false) {
            $url = substr($url, 0, strpos($url, '?'));
        }
        
        $url = trim($url, '/');
        $url = filter_var($url, FILTER_SANITIZE_URL);
        return explode('/', $url);
    }
    
    protected function trigger404(string $message = "Página não encontrada.") {
        http_response_code(404);
        if (class_exists('Core\View')) {
            View::render('errors/404', ['message' => $message], 404);
        } else {
            echo "<h1>Erro 404</h1>";
            echo "<p>" . htmlspecialchars($message) . "</p>";
        }
        exit;
    }
}
?>
