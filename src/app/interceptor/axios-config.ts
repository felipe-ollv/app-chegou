import axios from 'axios';
import { getItem } from "expo-secure-store";

const api = axios.create({
  baseURL: 'http://localhost:3006/api',
});

let token: string | null = null;

export const setToken = (newToken: string | null) => {
  token = newToken;
};

api.interceptors.request.use(
  async (config) => {
    if (!token) {
      token = await getItem('secret');
    }

    const publicPaths = ['/login/user', '/condominium/find-all', '/user/register-user', '/health'];
    
    const isPublic = publicPaths.some(path => config.url?.startsWith(path));

    if (!isPublic && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
