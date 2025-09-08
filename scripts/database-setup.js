require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

async function setupDatabase() {
  try {
    console.log("Conectando ao banco de dados...");
    
    // Verificar conexão
    const result = await sql`SELECT version()`;
    console.log("Conexão estabelecida:", result[0].version);
    
    // Criar tabela users
    console.log("Criando tabela users...");
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(128) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("Tabela users criada com sucesso!");
    
    // Criar índices
    console.log("Criando índices...");
    await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at)`;
    console.log("Índices criados com sucesso!");
    
    // Verificar estrutura da tabela
    const tableInfo = await sql`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'users'
      ORDER BY ordinal_position
    `;
    
    console.log("Estrutura da tabela users:");
    console.table(tableInfo);
    
    console.log("Conexão e criação de tabela concluída com sucesso!");
    
  } catch (error) {
    console.error("Erro ao configurar banco de dados:", error);
    process.exit(1);
  }
}

// Executar setup se chamado diretamente
if (require.main === module) {
  setupDatabase();
}

module.exports = { setupDatabase, sql };

