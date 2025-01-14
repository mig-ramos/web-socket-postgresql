const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:123456@localhost:5432/socket-test?schema=public',
});

client.connect()
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

module.exports = client;
