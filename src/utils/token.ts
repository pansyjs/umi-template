import { TOCKET_KEY } from '@/config';

export const getToken = () => {
  return localStorage.getItem(TOCKET_KEY);
};

export const setToken = (value: string) => {
  localStorage.setItem(TOCKET_KEY, value);
};

export const removeToken = () => {
  localStorage.removeItem(TOCKET_KEY);
};
