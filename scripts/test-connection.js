require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

async function testConnection() {
  try {
    console.log("Testando conexão com o banco de dados...");
    
    // Testar conexão
    const version = await sql`SELECT version()`;
    console.log("Versão do PostgreSQL:", version[0].version);
    
    // Testar se a tabela users existe
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      )
    `;
    
    if (tableExists[0].exists) {
      console.log("Tabela 'users' existe!");
      
      // Contar registros
      const count = await sql`SELECT COUNT(*) as total FROM users`;
      console.log(`Total de registros na tabela users: ${count[0].total}`);
      
      // Mostrar alguns registros de exemplo
      const sample = await sql`SELECT * FROM users LIMIT 5`;
      if (sample.length > 0) {
        console.log("Registros de exemplo:");
        console.table(sample);
      } else {
        console.log("Sem registros na tabela!");
      }
    } else {
      console.log("Tabela 'users' não existe. Deve ser executado o database-setup.js primeiro!");
    }
    
    // Script para inserção de dados
    console.log("Testando inserção de dados...");
    const testData = {
      nome: "Teste Usuário",
      email: `teste-${Date.now()}@exemplo.com`,
      phone: "11999999999"
    };
    
    const insertResult = await sql`
      INSERT INTO users (nome, email, phone) 
      VALUES (${testData.nome}, ${testData.email}, ${testData.phone})
      RETURNING *
    `;
    
    console.log("Dados de teste inseridos:", insertResult[0]);
    
    // Limpar dados de teste
    await sql`DELETE FROM users WHERE email = ${testData.email}`;
    console.log("Dados de teste removidos");
    
    console.log("este de conexão concluído com sucesso!");
    
  } catch (error) {
    console.error("Erro no teste de conexão:", error);
    process.exit(1);
  }
}

// Executar teste se chamado diretamente
if (require.main === module) {
  testConnection();
}

module.exports = { testConnection, sql };

