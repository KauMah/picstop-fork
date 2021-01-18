// @ts-ignore: Weirdness with react-native-dotenv
import { API_URL } from '@env';
import axios from 'axios';

export const exo = axios.create({
  baseURL: API_URL,
});

export const setToken = (token: string) => {
  exo.defaults.headers.common.Authorization = token;
};
