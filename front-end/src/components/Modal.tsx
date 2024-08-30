import React, { useState, useEffect } from 'react';
import '../GlobalStyles/styles.css'

const Modal: React.FC<{ onClose: () => void; onAddTask: (title: string, description: string, priority: string) => void }> = ({ onClose, onAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('low');
  
    const handleSubmit = () => {
      onAddTask(title, description, priority);
      onClose();
    };
  
    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Criar Nova Tarefa</h2>
          <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="text" placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
          <button onClick={handleSubmit}>Adicionar Tarefa</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    );
  };
  
  export default Modal;