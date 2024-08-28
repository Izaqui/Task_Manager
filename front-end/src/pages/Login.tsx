import React, { useState } from 'react';
import '../GlobalStyles/Global.css';
import { Link } from 'react-router-dom';
import api from '../Api/API';
interface IResponse{
  status: string;
}
const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   
    const [error, setError] = useState(''); 
    const [status, setStatus]= useState('');

    const handleSubmit = async (event: React.FormEvent) => {
      const data = {
        email,
        password
      }  
      event.preventDefault();   

      const response = await api.post('loginsimples',data);
      const {status} = response.data as IResponse;
      if(status === 'error'){
        setStatus('Erro: acesso negado');
      }else{
        setStatus('logado');
      }
    };

    return (
        <div className='Body'>
          <div className='Container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Email:</p>
                    <input type="email" placeholder='example@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)}   
 />
                </label>
                <label>
                    <p>Senha:</p>
                    <input type="password" placeholder='*************' value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit">Entrar</button>
            </form>   

            <p>Não tem uma conta? <Link to="Register">Criar Conta</Link></p>
          </div>
        </div>
    );
};

export default Login;