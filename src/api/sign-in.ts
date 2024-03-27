import { api } from "@/lib/axios";

export interface SignInBody {
    telefone: string,
    senha: string
}

export async function signIn({telefone, senha}: SignInBody) {
    return await api.post('login', {telefone, senha})
}