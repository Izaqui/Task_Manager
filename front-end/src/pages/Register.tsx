import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando o hook useNavigate
import '../GlobalStyles/Global.css';
import api from '../services/API';

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmarPassword, setConfirmarPassword] = useState<string>('');
  const [error, setError] = useState<string>(''); // mensagens de erro
  
  const navigate = useNavigate(); // Instanciando o hook useNavigate

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validação
    if (!name || !email || !password || !confirmarPassword) {
      setError('Todos os campos são obrigatórios!');
      return;
    }

    if (password !== confirmarPassword) {
      setError('As senhas não coincidem!');
      return;
    }

    // enviar os dados para o servidor
    try {
      const response = await api.post('auth/register', {
        name,
        email,
        password,
      });

      if (response.status === 201) {  //verificação de status
        alert('Conta criada com sucesso!');
        navigate('/'); 
      } else {
        setError('Erro ao criar conta. Tente novamente.');
      }
    } catch (err) {
      console.error('Erro ao enviar dados:', err);
      setError('Ocorreu um erro ao enviar os dados. Tente novamente.');
    }
  };

  return (
    <div>
      <h1>Cadastro de Usuário</h1> 
      <div className='Body'>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Name:</p>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
          </label>
          <label>
            <p>E-mail:</p>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <p>password:</p>
            <input
              type="password"
              placeholder="*************"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </label>
          <label>
            <p>Confirmar password:</p>
            <input
              type="password"
              placeholder="*************"
              value={confirmarPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmarPassword(e.target.value)}
            />
          </label>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibindo a mensagem de erro */}
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
