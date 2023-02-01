import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1500,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-rapidapi-key': 'e28105562fmsh01edebafeeb6117p1f37e7jsn0221a314ae3d',
    'x-rapid-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
  },
});

export const get = (url: string, params?: Record<string, unknown>) => {
  return instance.get(url, { params });
};
