<?php

namespace Models;

use Core\Database;
use PDO;
use PDOException;

class Venda {
    private $db;
    private $table_name = "vendas";
    private $table_itens_name = "itens_venda";

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function getAllWithDetails(): array {
        $query = "SELECT v.id, v.forma_pagamento, v.dt_venda, c.nome AS cliente_nome
                  FROM " . $this->table_name . " v
                  JOIN clientes c ON v.cliente_id = c.id
                  ORDER BY v.dt_venda DESC";
        
        $stmt = $this->db->query($query);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create(array $data, array $itens) {
        $this->db->beginTransaction();

        try {
            $query_venda = "INSERT INTO " . $this->table_name . " (cliente_id, forma_pagamento, dt_venda) 
                            VALUES (:cliente_id, :forma_pagamento, NOW())";
            $stmt_venda = $this->db->prepare($query_venda);
            $stmt_venda->bindParam(':cliente_id', $data['cliente_id'], PDO::PARAM_INT);
            $stmt_venda->bindParam(':forma_pagamento', $data['forma_pagamento']);
            
            $stmt_venda->execute();
            $venda_id = $this->db->lastInsertId();

            if (!$venda_id) {
                throw new PDOException("Não foi possível obter o ID da venda criada.");
            }

            $query_item = "INSERT INTO " . $this->table_itens_name . " 
                           (venda_id, produto_id, quantidade, preco_unitario) 
                           VALUES (:venda_id, :produto_id, :quantidade, :preco_unitario)";
            $stmt_item = $this->db->prepare($query_item);

            $produtoModel = new Produto();

            foreach ($itens as $item) {
                if (empty($item['produto_id']) || empty($item['quantidade']) || (int)$item['quantidade'] <= 0) {
                    throw new PDOException("Item de venda inválido: Produto ou quantidade faltando/inválida.");
                }

                $produto = $produtoModel->getById((int)$item['produto_id']);
                if (!$produto || !isset($produto['preco'])) {
                    throw new PDOException("Produto ID " . $item['produto_id'] . " não encontrado ou sem preço definido.");
                }
                $preco_unitario = $produto['preco'];

                $stmt_item->bindParam(':venda_id', $venda_id, PDO::PARAM_INT);
                $stmt_item->bindParam(':produto_id', $item['produto_id'], PDO::PARAM_INT);
                $stmt_item->bindParam(':quantidade', $item['quantidade'], PDO::PARAM_INT);
                $stmt_item->bindParam(':preco_unitario', $preco_unitario);
                
                $stmt_item->execute();
            }

            $this->db->commit();
            return (int)$venda_id;

        } catch (PDOException $e) {
            $this->db->rollBack();
            error_log("Erro ao criar venda: " . $e->getMessage() . " Dados Venda: " . print_r($data, true) . " Itens: " . print_r($itens, true));
            return false;
        }
    }
}
?>
