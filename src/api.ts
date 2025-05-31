import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    "Content-Type": "application/json"
  }
  // 你可以加上 headers、timeout 等全局配置
});

export default api;
