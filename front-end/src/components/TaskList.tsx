import React from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
}

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask }) => {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <span>{task.title} - {task.createdAt}</span>
          <button onClick={() => onDeleteTask(task.id)}>Deletar</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
