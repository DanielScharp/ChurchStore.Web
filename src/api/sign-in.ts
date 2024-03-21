import { api } from "@/lib/axios";

export interface SignInBody {
    email: string,
    senha: string
}

export async function signIn({email, senha}: SignInBody) {
    return await api.post('login', {email, senha})
}