import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando o hook useNavigate
import '../GlobalStyles/Global.css';
import api from '../services/API';

const Register: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState(''); // mensagens de erro
  
  const navigate = useNavigate(); // Instanciando o hook useNavigate

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validação
    if (!nome || !email || !senha || !confirmarSenha) {
      setError('Todos os campos são obrigatórios!');
      return;
    }

    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem!');
      return;
    }

    // enviar os dados para o servidor
    try {
      const response = await api.post('/register', {
        nome,
        email,
        senha,
      });

      if (response.status === 201) {  //verificação de status
        alert('Conta criada com sucesso!');
        navigate('/login'); // Redirecionando para a tela de login
      } else {
        setError('Erro ao criar conta. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      setError('Ocorreu um erro ao enviar os dados. Tente novamente.');
    }
  };

  return (
    <div>
      <h1>Cadastro de usuario</h1>
      <div className='Body'>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Nome:</p>
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </label>
          <label>
            <p>E-mail:</p>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <p>Senha:</p>
            <input
              type="password"
              placeholder="*************"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </label>
          <label>
            <p>Confirmar Senha:</p>
            <input
              type="password"
              placeholder="*************"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
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
