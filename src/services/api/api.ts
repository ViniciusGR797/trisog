import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function createAPI(ctx = undefined) {
  const cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${cookies['@auth.token']}`
    }
  });

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401 && window.location.pathname !== "/") {
        window.location.href = '/';
      }
      return Promise.reject(error); 
    }
  );

  return api;
}

export const api = createAPI();