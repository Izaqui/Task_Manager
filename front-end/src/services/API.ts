import axios from 'axios';

const api = axios.create({
  baseURL:'https://localhost:3002/'
});

export default api;