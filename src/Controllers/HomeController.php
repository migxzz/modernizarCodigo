<?php

namespace Controllers;

use Core\View;

class HomeController {
    public function index() {
        $data = [
            'titulo' => 'Página Inicial',
            'mensagem' => 'Bem-vindo ao sistema de Floricultura!'
        ];
        
        View::render('home/index', $data);
    }
}
?>
