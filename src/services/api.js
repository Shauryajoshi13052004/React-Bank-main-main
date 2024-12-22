import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// To handle JWT authentication, set Authorization header
const setAuthHeader = (token) => {
  api.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export { api, setAuthHeader };
