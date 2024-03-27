import { api } from "@/lib/axios";

export interface RegisterBody {
    nome: string,
    telefone: string,
    senha: string,
}

export async function registerUser({nome, telefone, senha}: RegisterBody) {
    return await api.post('usuarios/cadastrar', {nome, telefone, senha})
}