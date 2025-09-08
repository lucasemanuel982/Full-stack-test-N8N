require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

async function resetN8NAuth() {
  try {
    console.log("🔄 Resetando configurações de autenticação do N8N...");
    
    // Verificar se as tabelas do N8N existem
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE '%user%' OR table_name LIKE '%auth%' OR table_name LIKE '%credential%'
    `;
    
    console.log("📋 Tabelas encontradas:", tables.map(t => t.table_name));
    
    // Limpar apenas tabelas do N8N (não nossa tabela users)
    const n8nTables = ['user', 'n8n_user', 'credentials', 'n8n_credentials', 'workflow', 'n8n_workflow'];
    
    for (const table of n8nTables) {
      try {
        const exists = await sql`
          SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = ${table}
          )
        `;
        
        if (exists[0].exists) {
          console.log(`🗑️  Limpando tabela do N8N: ${table}...`);
          await sql`DELETE FROM ${sql(table)}`;
          console.log(`✅ Tabela ${table} limpa!`);
        }
      } catch (error) {
        console.log(`⚠️  Tabela ${table} não encontrada ou erro:`, error.message);
      }
    }
    
    // NÃO mexer na nossa tabela users
    console.log("✅ Nossa tabela 'users' foi preservada!");
    
    console.log("🎉 Reset de autenticação concluído!");
    console.log("📋 Agora você pode acessar o N8N e criar uma nova conta");
    
  } catch (error) {
    console.error("❌ Erro ao resetar autenticação:", error);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  resetN8NAuth();
}

module.exports = { resetN8NAuth };
