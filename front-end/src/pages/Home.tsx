import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import api from '../services/API';
import '../GlobalStyles/styles.css';
import Modal from '../components/Modal';

type Task = {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  createdAt: string;
};

// Modal component

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controle do modal

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (title: string, description: string, priority: string) => {
    try {
      const response = await api.post('/tasks', { title, description, priority });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='container'>
      <h1>Gerenciador de Tarefas</h1>
      <button onClick={handleOpenModal}>Criar Tarefa</button>
      {isModalOpen && <Modal onClose={handleCloseModal} onAddTask={handleAddTask} />}
      {isLoading ? (
        <p>Carregando tarefas...</p>
      ) : (
        <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
      )}
    </div>
  );
};

export default Home;
