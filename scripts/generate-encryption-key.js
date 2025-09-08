const crypto = require('crypto');

function generateEncryptionKey() {
  // Gera uma chave de 32 bytes (256 bits) para AES-256
  const key = crypto.randomBytes(32).toString('hex');
  
  console.log('have de criptografia gerada:');
  console.log('='.repeat(50));
  console.log(key);
  console.log('='.repeat(50));
  console.log('');
  console.log('Copie esta chave e use na variável N8N_ENCRYPTION_KEY');
  console.log('IMPORTANTE: Guarde esta chave em local seguro!');
  console.log('Se você perder, não conseguirá acessar dados criptografados.');
  
  return key;
}

// Executar se chamado diretamente
if (require.main === module) {
  generateEncryptionKey();
}

module.exports = { generateEncryptionKey };
