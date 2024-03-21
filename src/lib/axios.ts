import { env } from '@/env';
import axios from 'axios'

axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

export const api = axios.create({
    baseURL: env.VITE_API_URL,
})