# N8N Workflows - Integração com PostgreSQL

Este projeto contém uma implementação completa do N8N para integração com PostgreSQL, incluindo workflows automatizados, scripts de configuração e ferramentas de desenvolvimento para gerenciar dados de usuários.

## 📋 O que foi implementado

### 🔧 **Scripts de Configuração e Teste**
- **`scripts/database-setup.js`** - Script Node.js para configuração automática do banco de dados
- **`scripts/test-connection.js`** - Script de teste de conexão com validação completa
- **`scripts/generate-encryption-key.js`** - Gerador de chaves de criptografia para segurança
- **`scripts/setup-database.sql`** - Script SQL para criação da tabela `users` e índices

### **Workflows N8N Criados**
- **`workflows/receive-data-workflow.json`** - Workflow para receber dados do backend e salvar no PostgreSQL
- **`workflows/clear-data-workflow.json`** - Workflow para limpar a tabela users
- **`workflows/get-data-workflow.json`** - Workflow para buscar todos os dados da tabela users

### **Configuração de Desenvolvimento**
- **`docker-compose.yml`** - Configuração completa para rodar N8N localmente com Docker
- **`package.json`** - Dependências e scripts npm para desenvolvimento
- **`nixpacks.toml`** - Configuração de build otimizada para Railway
- **`railway.json`** - Configuração específica de deploy para Railway

### **Segurança e Configuração**
- **`env.example`** - Template de variáveis de ambiente com todas as configurações
- **`.gitignore`** - Configuração para ignorar arquivos sensíveis
- **Scripts de geração de chaves** de criptografia para proteção de dados

### **Funcionalidades Implementadas**
- ✅ **Conexão automática** com PostgreSQL (Neon)
- ✅ **Criação automática** da tabela `users` com índices
- ✅ **Testes de conexão** e validação de dados
- ✅ **Workflows completos** para CRUD operations
- ✅ **Configuração de segurança** com criptografia
- ✅ **Deploy automatizado** para Railway
- ✅ **Desenvolvimento local** com Docker

## Deploy na Railway

### 1. Preparação do Banco de Dados

**Opção 1: Usando Node.js (Recomendado)**
```bash
# Configure as variáveis de ambiente
cp env.example .env

# Execute o setup do banco
npm run setup-db

# Teste a conexão
npm run test-db
```


### 2. Procedimentos na Railway

1. **Conecte seu repositório** na Railway
2. **Configure as variáveis de ambiente**:
3. **Deploy automático** será iniciado

### 3. Configuração dos Workflows

Após o deploy, acesse o N8N e importe os workflows:

1. **Acesse**: `https://seu-app.railway.app`
2. **Login**: admin / sua_senha_segura
3. **Importe os workflows**:
   - `workflows/receive-data-workflow.json`
   - `workflows/clear-data-workflow.json`
   - `workflows/get-data-workflow.json`

## 📋 Workflows Disponíveis

### 1. Receive Data Workflow
- **Endpoint**: `POST /webhook/receive-data`
- **Função**: Recebe dados do backend e salva no PostgreSQL
- **Retorna**: Lista completa de usuários
- **Fluxo**: Webhook → PostgreSQL Insert → PostgreSQL Select → Response

### 2. Clear Data Workflow
- **Endpoint**: `POST /webhook/clear-data`
- **Função**: Limpa a tabela users (TRUNCATE)
- **Retorna**: Confirmação de limpeza
- **Fluxo**: Webhook → PostgreSQL TRUNCATE → Response

### 3. Get Data Workflow
- **Endpoint**: `GET /webhook/get-data`
- **Função**: Retorna todos os dados da tabela users
- **Retorna**: Lista completa de usuários
- **Fluxo**: Webhook → PostgreSQL Select → Response

## Scripts de Desenvolvimento

### **Scripts NPM Disponíveis**
```bash
npm run setup-db      # Configura o banco de dados automaticamente
npm run test-db       # Testa conexão e valida dados
npm run generate-key  # Gera chave de criptografia segura
npm start            # Inicia o N8N localmente
npm run dev          # Inicia N8N com tunnel (desenvolvimento)
```

### **Detalhes dos Scripts**

#### **`scripts/database-setup.js`**
- ✅ **Verifica conexão** com PostgreSQL
- ✅ **Cria tabela `users`** com estrutura completa
- ✅ **Cria índices** para performance
- ✅ **Valida estrutura** da tabela
- ✅ **Logs informativos** com emojis

#### **`scripts/test-connection.js`**
- ✅ **Testa conexão** básica com banco
- ✅ **Verifica existência** da tabela users
- ✅ **Conta registros** existentes
- ✅ **Testa inserção** de dados de exemplo
- ✅ **Limpa dados** de teste automaticamente
- ✅ **Validação completa** de operações

#### **`scripts/generate-encryption-key.js`**
- ✅ **Gera chave AES-256** (32 bytes)
- ✅ **Formato hexadecimal** seguro
- ✅ **Instruções claras** de uso
- ✅ **Avisos de segurança** importantes

## Estrutura do Banco de Dados

### **Tabela `users`**
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(128) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Índices Criados**
- ✅ **`idx_users_email`** - Índice único no email
- ✅ **`idx_users_created_at`** - Índice na data de criação

### **Configuração PostgreSQL**
- **Host**: `ep-raspy-hat-ae7atyzo-pooler.c-2.us-east-2.aws.neon.tech`
- **Database**: `neondb`
- **User**: `neondb_owner`
- **Password**: `npg_sT7fzuD6Veot`
- **Port**: `5432`
- **SSL**: `true` (obrigatório para Neon)

## 🔧 Configuração da Conexão PostgreSQL

No N8N, configure a conexão PostgreSQL:

1. **Vá em Credentials** → **Add Credential** → **Postgres**
2. **Configure**:
   - **Host**: `ep-raspy-hat-ae7atyzo-pooler.c-2.us-east-2.aws.neon.tech`
   - **Database**: `neondb`
   - **User**: `neondb_owner`
   - **Password**: `npg_sT7fzuD6Veot`
   - **Port**: `5432`
   - **SSL**: `true`

## URLs dos Webhooks

Após o deploy, os webhooks estarão disponíveis em:

- **Receber dados**: `https://seu-app.railway.app/webhook/receive-data`
- **Limpar dados**: `https://seu-app.railway.app/webhook/clear-data`
- **Buscar dados**: `https://seu-app.railway.app/webhook/get-data`

## Segurança e Configurações

### **Chave de Criptografia**
- ✅ **Gerada automaticamente** com `npm run generate-key`
- ✅ **AES-256** (padrão militar)
- ✅ **32 bytes** em formato hexadecimal

Para rodar localmente:

```bash
# Clone o repositório
git clone <seu-repositorio>

# Instale dependências
npm install

# Configure variáveis de ambiente
cp env.example .env

# Setup do banco de dados
npm run setup-db

# Teste a conexão
npm run test-db

# Execute o N8N
npm start
```

## Arquitetura e Tecnologias

### **Stack Tecnológico**
- ✅ **N8N** - Automação de workflows e integração
- ✅ **PostgreSQL** - Banco de dados relacional (Neon)
- ✅ **Node.js** - Runtime para scripts e N8N
- ✅ **Railway** - Plataforma de deploy em nuvem
- ✅ **GitHub** - Controle de versão e CI/CD



### **Fluxo de Dados**
1. **Frontend** envia requisição para backend
2. **Backend** processa e descriptografa dados
3. **Backend** envia dados para N8N via webhook
4. **N8N** salva dados no PostgreSQL
5. **N8N** retorna dados para frontend
6. **Frontend** exibe dados na tabela

## Estrutura do Projeto

```
n8n-workflows/
├── workflows/                    # Workflows N8N
│   ├── receive-data-workflow.json
│   ├── clear-data-workflow.json
│   └── get-data-workflow.json
├── scripts/                      # Scripts de desenvolvimento
│   ├── setup-database.sql       # Script SQL para criação da tabela
│   ├── database-setup.js        # Setup automático do banco
│   ├── test-connection.js       # Teste de conexão e validação
│   └── generate-encryption-key.js # Gerador de chaves de segurança
├── package.json                 # Dependências e scripts npm
├── railway.json                 # Configuração de deploy para Railway
├── nixpacks.toml               # Configuração de build otimizada
├── env.example                 # Template de variáveis de ambiente
└── README.md                   # Documentação completa
```


### Problemas Comuns

1. **Erro de conexão PostgreSQL**:
   - Verifique as credenciais
   - Confirme se o SSL está habilitado
   - Teste a conexão diretamente

2. **Workflows não funcionam**:
   - Verifique se estão ativos
   - Confirme as URLs dos webhooks
   - Verifique os logs de erro

3. **Deploy falha**:
   - Verifique as variáveis de ambiente
   - Confirme se o banco está acessível
   - Verifique os logs de build

