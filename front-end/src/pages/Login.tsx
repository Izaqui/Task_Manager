import React, { useState } from 'react';
import '../GlobalStyles/Global.css';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/API';

interface IResponse {
  status: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');   
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState(''); // Estado separado para mensagem de sucesso
  
  const navigate = useNavigate(); 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();   

    const data = {
      email,
      password
    };

    try {
      const response = await api.post('users', data);
      const { status } = response.data as IResponse;

      if (status === 'error') {
        setError('Erro: acesso negado');
        setSuccess(''); // Limpa mensagem de sucesso se houver erro
      } else {
        setSuccess('Logado com sucesso');
        setError(''); // Limpa mensagem de erro se o login for bem-sucedido
        console.log('logado');
        navigate('/home'); 
      }
    } catch (error: any) {
      // Verifica se o erro é uma instância de erro conhecido
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Erro ao fazer login. Por favor, tente novamente.');
      }
      setSuccess('');
    }
  };

  return (
    <div className='Body'>
      <div className='Container'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Email:</p>
            <input 
              type="email" 
              placeholder='example@gmail.com' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}   
            />
          </label>
          <label>
            <p>Senha:</p>
            <input 
              type="password" 
              placeholder='*************' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </label>
          <button type="submit">Entrar</button>
        </form> 
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>} {/* Exibe mensagem de sucesso */}

        <p>Não tem uma conta? <Link to="/Register">Criar Conta</Link></p>
      </div>
    </div>
  );
};

export default Login;
