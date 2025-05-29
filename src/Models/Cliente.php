<?php

namespace Models;

use Core\Database;
use PDO;

class Cliente {
    private $db;
    private $table_name = "clientes";

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function getAll(): array {
        $query = "SELECT id, nome, cpf, email, telefone FROM " . $this->table_name . " ORDER BY id DESC";
        $stmt = $this->db->query($query);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById(int $id) {
        $query = "SELECT id, nome, cpf, email, telefone FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create(array $data): bool {
        $query = "INSERT INTO " . $this->table_name . " (nome, cpf, email, telefone) VALUES (:nome, :cpf, :email, :telefone)";
        $stmt = $this->db->prepare($query);

        $stmt->bindParam(':nome', $data['nome']);
        $stmt->bindParam(':cpf', $data['cpf']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':telefone', $data['telefone']);

        try {
            return $stmt->execute();
        } catch (\PDOException $e) {
            error_log("Erro ao criar cliente: " . $e->getMessage() . " Dados: " . print_r($data, true));
            return false;
        }
    }

    public function update(int $id, array $data): bool {
        $query = "UPDATE " . $this->table_name . " SET nome = :nome, cpf = :cpf, email = :email, telefone = :telefone WHERE id = :id";
        $stmt = $this->db->prepare($query);

        $stmt->bindParam(':nome', $data['nome']);
        $stmt->bindParam(':cpf', $data['cpf']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':telefone', $data['telefone']);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        try {
            return $stmt->execute();
        } catch (\PDOException $e) {
            error_log("Erro ao atualizar cliente ID {$id}: " . $e->getMessage() . " Dados: " . print_r($data, true));
            return false;
        }
    }

    public function delete(int $id): bool {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        try {
            return $stmt->execute();
        } catch (\PDOException $e) {
            error_log("Erro ao deletar cliente ID {$id}: " . $e->getMessage());
            return false;
        }
    }
}
?>
