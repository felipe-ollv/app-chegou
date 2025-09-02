import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { getItem } from "expo-secure-store";

const api = axios.create({
  baseURL: 'http://192.168.1.6:3006/api',
});

let token: string | null = null;
let setUserDataGlobal: (data: any) => void;

export const setToken = (newToken: string | null) => {
  token = newToken;
};

export const setUserDataSetter = (setter: (data: any) => void) => {
  setUserDataGlobal = setter;
};

api.interceptors.request.use(
  async (config) => {
    if (!token) {
      token = await getItem('secret');
        if (token) {
          const decoded = jwtDecode(token);
          setUserDataGlobal(decoded);
        }
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
