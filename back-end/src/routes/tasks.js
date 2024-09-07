const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Listar todas as tarefas do usuário autenticado
router.get('/', authMiddleware, async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.userId } });
  res.json(tasks);
});

// Adicionar nova tarefa
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, priority } = req.body;

  try {
    const task = await Task.create({ title, description, priority, userId: req.userId });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Atualizar tarefa
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, completed } = req.body;

  const task = await Task.findOne({ where: { id, userId: req.userId } });

  if (!task) {
    return res.status(404).json({ message: 'Tarefa não encontrada.' });
  }

  task.title = title;
  task.description = description;
  task.priority = priority;
  task.completed = completed;

  await task.save();
  res.json(task);
});

// Excluir tarefa
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOne({ where: { id, userId: req.userId } });

  if (!task) {
    return res.status(404).json({ message: 'Tarefa não encontrada.' });
  }

  await task.destroy();
  res.json({ message: 'Tarefa excluída com sucesso.' });
});

module.exports = router;