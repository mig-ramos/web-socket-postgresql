const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { Client } = require('pg');
const db = require('./db');  // Arquivo de configuração do banco

// Inicializando o servidor Express e WebSocket
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configurar o servidor para servir arquivos estáticos
app.use(express.static('public'));

// Conectar ao banco de dados PostgreSQL
const pgClient = new Client({
  connectionString: 'postgresql://postgres:123456@localhost:5432/socket-test?schema=public', // Altere conforme necessário
});
pgClient.connect();

// Usando LISTEN no PostgreSQL para detectar mudanças
pgClient.query('LISTEN notificacoes');

pgClient.on('notification', (msg) => {
  console.log('Alteração no banco detectada:', msg);
  // Enviar a notificação para todos os clientes conectados via WebSocket
  io.emit('update', msg.payload);
});

// Iniciar o servidor
server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
