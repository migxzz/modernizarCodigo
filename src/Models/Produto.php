<?php

namespace Models;

use Core\Database;
use PDO;

class Produto {
    private $db;
    private $table_name = "produtos";

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function getAll(): array {
        $query = "SELECT id, nome, descricao, preco, quantidade FROM " . $this->table_name . " ORDER BY id DESC";
        $stmt = $this->db->query($query);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById(int $id) {
        $query = "SELECT id, nome, descricao, preco, quantidade FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create(array $data): bool {
        $query = "INSERT INTO " . $this->table_name . " (nome, descricao, preco, quantidade) VALUES (:nome, :descricao, :preco, :quantidade)";
        $stmt = $this->db->prepare($query);

        $stmt->bindParam(':nome', $data['nome']);
        $stmt->bindParam(':descricao', $data['descricao']);
        $stmt->bindParam(':preco', $data['preco']); 
        $stmt->bindParam(':quantidade', $data['quantidade'], PDO::PARAM_INT);

        try {
            return $stmt->execute();
        } catch (\PDOException $e) {
            error_log("Erro ao criar produto: " . $e->getMessage() . " Dados: " . print_r($data, true));
            return false;
        }
    }

    public function update(int $id, array $data): bool {
        $query = "UPDATE " . $this->table_name . " SET nome = :nome, descricao = :descricao, preco = :preco, quantidade = :quantidade WHERE id = :id";
        $stmt = $this->db->prepare($query);

        $stmt->bindParam(':nome', $data['nome']);
        $stmt->bindParam(':descricao', $data['descricao']);
        $stmt->bindParam(':preco', $data['preco']);
        $stmt->bindParam(':quantidade', $data['quantidade'], PDO::PARAM_INT);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        try {
            return $stmt->execute();
        } catch (\PDOException $e) {
            error_log("Erro ao atualizar produto ID {$id}: " . $e->getMessage() . " Dados: " . print_r($data, true));
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
            error_log("Erro ao deletar produto ID {$id}: " . $e->getMessage());
            return false;
        }
    }
}
?>
