// Modelo de Venda
const { pool } = require('../config/database');

class Venda {
  // Obter todas as vendas com detalhes do cliente
  async getAllWithDetails() {
    try {
      const [rows] = await pool.query(`
        SELECT v.id, v.forma_pagamento, v.dt_venda, c.nome AS cliente_nome
        FROM vendas v
        JOIN clientes c ON v.cliente_id = c.id
        ORDER BY v.dt_venda DESC
      `);
      return rows;
    } catch (error) {
      console.error('Erro ao buscar vendas:', error);
      throw error;
    }
  }

  // Obter uma venda específica pelo ID
  async getById(id) {
    try {
      const [rows] = await pool.query(`
        SELECT v.id, v.cliente_id, v.forma_pagamento, v.dt_venda, c.nome AS cliente_nome
        FROM vendas v
        JOIN clientes c ON v.cliente_id = c.id
        WHERE v.id = ?
      `, [id]);
      
      if (rows.length === 0) return null;
      
      // Buscar os itens da venda
      const [itens] = await pool.query(`
        SELECT iv.id, iv.produto_id, iv.quantidade, iv.preco_unitario, 
               p.nome AS produto_nome
        FROM itens_venda iv
        JOIN produtos p ON iv.produto_id = p.id
        WHERE iv.venda_id = ?
      `, [id]);
      
      rows[0].itens = itens;
      return rows[0];
    } catch (error) {
      console.error(`Erro ao buscar venda ID ${id}:`, error);
      throw error;
    }
  }

  // Criar uma nova venda
  async create(data, itens) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Inserir a venda
      const [result] = await connection.query(`
        INSERT INTO vendas (cliente_id, forma_pagamento, dt_venda) 
        VALUES (?, ?, NOW())
      `, [data.cliente_id, data.forma_pagamento]);
      
      const vendaId = result.insertId;
      
      // Inserir os itens da venda
      for (const item of itens) {
        // Buscar o preço atual do produto
        const [produto] = await connection.query('SELECT preco FROM produtos WHERE id = ?', [item.produto_id]);
        
        if (!produto || produto.length === 0) {
          throw new Error(`Produto ID ${item.produto_id} não encontrado`);
        }
        
        const precoUnitario = produto[0].preco;
        
        await connection.query(`
          INSERT INTO itens_venda (venda_id, produto_id, quantidade, preco_unitario)
          VALUES (?, ?, ?, ?)
        `, [vendaId, item.produto_id, item.quantidade, precoUnitario]);
      }
      
      await connection.commit();
      return vendaId;
    } catch (error) {
      await connection.rollback();
      console.error('Erro ao criar venda:', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  // Excluir uma venda
  async delete(id) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Excluir os itens da venda primeiro (devido à chave estrangeira)
      await connection.query('DELETE FROM itens_venda WHERE venda_id = ?', [id]);
      
      // Excluir a venda
      const [result] = await connection.query('DELETE FROM vendas WHERE id = ?', [id]);
      
      await connection.commit();
      return result.affectedRows > 0;
    } catch (error) {
      await connection.rollback();
      console.error(`Erro ao excluir venda ID ${id}:`, error);
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = new Venda();