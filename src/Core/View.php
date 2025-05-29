<?php

namespace Core;

class View {
    public static function render(string $view, array $data = [], ?int $httpStatusCode = null, ?string $layout = '') {
        if ($httpStatusCode !== null) {
            http_response_code($httpStatusCode);
        }

        $viewFile = __DIR__ . '/../../templates/' . str_replace('.', '/', $view) . '.php';

        if (!file_exists($viewFile)) {
            throw new \Exception("Arquivo de view não encontrado: {$viewFile}");
        }

        extract($data);

        if ($layout !== null) {
            $layoutFileToUse = ($layout === '') ? 'default' : $layout;
            $layoutFile = __DIR__ . '/../../templates/layouts/' . $layoutFileToUse . '.php';

            if (file_exists($layoutFile)) {
                ob_start();
                require $viewFile;
                $content = ob_get_clean();
                require $layoutFile;
            } else {
                require $viewFile;
            }
        } else {
            require $viewFile;
        }
    }

    public static function e(?string $data): string {
        return htmlspecialchars($data ?? '', ENT_QUOTES, 'UTF-8');
    }
}
?>
