import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api', // Use /api for vercel.json rewrites
  headers: {
    'Content-Type': 'application/json',
  },
});

// Sign-in request
export const signin = async (identifier, password) => {
  const response = await api.post('/api/auth/signin', { identifier, password });
  return response.data;
};

// Sign-up request
export const signup = async (firstName, lastName, email, password, confirmPassword) => {
  const response = await api.post('/api/auth/signup', {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });
  return response.data;
};

export default api;