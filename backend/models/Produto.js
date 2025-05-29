// Modelo de Produto
const { pool } = require('../config/database');

class Produto {
  // Obter todos os produtos
  async getAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM produtos ORDER BY nome');
      return rows;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  }

  // Obter um produto específico pelo ID
  async getById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM produtos WHERE id = ?', [id]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error(`Erro ao buscar produto ID ${id}:`, error);
      throw error;
    }
  }

  // Criar um novo produto
  async create(data) {
    try {
      const [result] = await pool.query(`
        INSERT INTO produtos (nome, descricao, preco, estoque) 
        VALUES (?, ?, ?, ?)
      `, [data.nome, data.descricao, data.preco, data.estoque]);
      
      return result.insertId;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }
  }

  // Atualizar um produto existente
  async update(id, data) {
    try {
      const [result] = await pool.query(`
        UPDATE produtos 
        SET nome = ?, descricao = ?, preco = ?, estoque = ? 
        WHERE id = ?
      `, [data.nome, data.descricao, data.preco, data.estoque, id]);
      
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Erro ao atualizar produto ID ${id}:`, error);
      throw error;
    }
  }

  // Excluir um produto
  async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM produtos WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Erro ao excluir produto ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = new Produto();