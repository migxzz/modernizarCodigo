<?php

date_default_timezone_set('America/Sao_Paulo');
error_reporting(E_ALL);
ini_set('display_errors', 1);

spl_autoload_register(function ($class_name) {
    $class_name = str_replace('\\', DIRECTORY_SEPARATOR, $class_name);
    $file = __DIR__ . '/' . $class_name . '.php';
    
    if (file_exists($file)) {
        require_once $file;
        return true;
    }
    return false;
});

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

require_once __DIR__ . '/../config/database.php';

?>
