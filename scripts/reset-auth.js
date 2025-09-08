require("dotenv").config();

console.log("🔐 Configurações de Autenticação N8N:");
console.log("=".repeat(50));
console.log("N8N_BASIC_AUTH_ACTIVE:", process.env.N8N_BASIC_AUTH_ACTIVE || "não definido");
console.log("N8N_BASIC_AUTH_USER:", process.env.N8N_BASIC_AUTH_USER || "não definido");
console.log("N8N_BASIC_AUTH_PASSWORD:", process.env.N8N_BASIC_AUTH_PASSWORD ? "***definido***" : "não definido");
console.log("=".repeat(50));

if (!process.env.N8N_BASIC_AUTH_ACTIVE) {
  console.log("⚠️  N8N_BASIC_AUTH_ACTIVE não está definido");
  console.log("   Configure: N8N_BASIC_AUTH_ACTIVE=true");
}

if (!process.env.N8N_BASIC_AUTH_USER) {
  console.log("⚠️  N8N_BASIC_AUTH_USER não está definido");
  console.log("   Configure: N8N_BASIC_AUTH_USER=admin");
}

if (!process.env.N8N_BASIC_AUTH_PASSWORD) {
  console.log("⚠️  N8N_BASIC_AUTH_PASSWORD não está definido");
  console.log("   Configure: N8N_BASIC_AUTH_PASSWORD=sua_senha_segura");
}

console.log("\n📋 Para configurar no Railway:");
console.log("1. Vá em Settings → Variables");
console.log("2. Adicione as variáveis acima");
console.log("3. Faça redeploy");
