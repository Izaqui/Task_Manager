const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db/db');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json());

// Rotas de autenticação
app.use('/auth', authRoutes);

// Rotas de tarefas
app.use('/tasks', taskRoutes);

// Sincronização com o banco de dados e inicialização do servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
