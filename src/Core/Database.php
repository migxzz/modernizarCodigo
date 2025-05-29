<?php

namespace Core;

use PDO;
use PDOException;

class Database {
    private static $instance = null;
    private $pdo;

    private function __construct() {
        try {
            $this->pdo = new PDO(DB_DSN, DB_USER, DB_PASS, DB_OPTIONS);
        } catch (PDOException $e) {
            error_log("Erro de conexão com o banco de dados: " . $e->getMessage());
            die("Erro ao conectar com o banco de dados. Por favor, tente novamente mais tarde.");
        }
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->pdo;
    }

    public function query(string $sql, array $params = []) {
        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($params);
            return $stmt;
        } catch (PDOException $e) {
            error_log("Erro na consulta SQL: " . $e->getMessage() . " SQL: " . $sql . " Params: " . print_r($params, true));
            return false;
        }
    }

    public function lastInsertId() {
        return $this->pdo->lastInsertId();
    }
}

?>
