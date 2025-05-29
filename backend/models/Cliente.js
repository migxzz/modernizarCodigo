// Modelo de Cliente
const { pool } = require('../config/database');

class Cliente {
  // Obter todos os clientes
  async getAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM clientes ORDER BY nome');
      return rows;
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      throw error;
    }
  }

  // Obter um cliente específico pelo ID
  async getById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error(`Erro ao buscar cliente ID ${id}:`, error);
      throw error;
    }
  }

  // Criar um novo cliente
  async create(data) {
    try {
      const [result] = await pool.query(
        `
        INSERT INTO clientes (nome, email, telefone) 
        VALUES (?, ?, ?)
      `,
        [data.nome, data.email, data.telefone]
      );

      return result.insertId;
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      throw error;
    }
  }

  // Atualizar um cliente existente
  async update(id, data) {
    try {
      const [result] = await pool.query(
        `
        UPDATE clientes 
        SET nome = ?, email = ?, telefone = ? 
        WHERE id = ?
      `,
        [data.nome, data.email, data.telefone, id]
      );

      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Erro ao atualizar cliente ID ${id}:`, error);
      throw error;
    }
  }

  // Excluir um cliente
  async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM clientes WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Erro ao excluir cliente ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = new Cliente();
