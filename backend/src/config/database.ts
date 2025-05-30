import prisma from './prisma';

// Função para testar a conexão com o banco de dados
export const testConnection = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log(' Conexão com o banco de dados estabelecida com sucesso!');
    return true;
  } catch (error) {
    console.error(' Erro ao conectar ao banco de dados:', error);
    return false;
  }
};

// Exporta o cliente Prisma para uso em toda a aplicação
export const db = prisma;

// Configurações adicionais do banco de dados
export const dbConfig = {
  connectionLimit: 10,
  connectTimeout: 60000
};