import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function createAPI() {
  const api = axios.create({
    baseURL,
  });

  api.interceptors.request.use(
    (config) => {
      const cookies = parseCookies();
      const user = cookies['@auth.user'];
      const token = user ? JSON.parse(user).token : "";

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401 && window.location.pathname !== '/') {
        window.location.href = '/';
      }
      return Promise.reject(error);
    }
  );

  return api;
}

export const api = createAPI();
