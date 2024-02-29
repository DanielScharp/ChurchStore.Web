import axios from 'axios'

axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

export const api = axios.create({
    baseURL: "https://localhost:7205",
})