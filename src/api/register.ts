import { api } from "@/lib/axios";

export interface RegisterBody {
    nome: string,
    email: string,
    senha: string,
}

export async function registerUser({nome, email, senha}: RegisterBody) {
    return await api.post('usuarios/cadastrar', {nome, email, senha})
}