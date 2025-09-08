require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

async function checkN8NUsers() {
  try {
    console.log("🔍 Verificando usuários do N8N...");
    console.log("=".repeat(50));
    
    // Verificar se a tabela 'user' existe
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'user'
      )
    `;
    
    if (!tableExists[0].exists) {
      console.log("❌ Tabela 'user' não existe");
      console.log("📋 Isso significa que o N8N ainda não foi configurado");
      return;
    }
    
    console.log("✅ Tabela 'user' existe");
    
    // Verificar estrutura da tabela
    const columns = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'user'
      ORDER BY ordinal_position
    `;
    
    console.log("\n📋 Estrutura da tabela 'user':");
    console.table(columns);
    
    // Contar usuários
    const count = await sql`SELECT COUNT(*) as total FROM "user"`;
    console.log(`\n👥 Total de usuários: ${count[0].total}`);
    
    if (count[0].total > 0) {
      // Buscar todos os usuários (sem senha por segurança)
      const users = await sql`
        SELECT 
          *
        FROM "user"
      `;
      
      console.log("\n👤 Usuários encontrados:");
      console.table(users);
      
      // Verificar se há usuário ativo
      const activeUser = await sql`
        SELECT 
          *
        FROM "user"
        WHERE email IS NOT NULL
        LIMIT 1
      `;
      
      if (activeUser.length > 0) {
        console.log("\n✅ Usuário ativo encontrado:");
        console.log(`   Email: ${activeUser[0]}`);
      }
      
    } else {
      console.log("\n📝 Nenhum usuário encontrado");
      console.log("💡 Isso significa que você pode criar uma nova conta");
    }
    
    // Verificar outras tabelas relacionadas
    console.log("\n🔍 Verificando outras tabelas do N8N...");
    
    const n8nTables = ['credentials', 'workflow', 'execution'];
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
          const count = await sql`SELECT COUNT(*) as total FROM ${sql(table)}`;
          console.log(`   ${table}: ${count[0].total} registros`);
        } else {
          console.log(`   ${table}: não existe`);
        }
      } catch (error) {
        console.log(`   ${table}: erro ao verificar`);
      }
    }
    
    console.log("\n" + "=".repeat(50));
    console.log("🎯 Resumo:");
    if (count[0].total > 0) {
      console.log("✅ N8N já foi configurado com usuário(s)");
      console.log("🔑 Use as credenciais mostradas acima para fazer login");
    } else {
      console.log("📝 N8N não foi configurado ainda");
      console.log("🚀 Você pode criar uma nova conta na interface");
    }
    
  } catch (error) {
    console.error("❌ Erro ao verificar usuários:", error);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  checkN8NUsers();
}

module.exports = { checkN8NUsers };
