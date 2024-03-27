import { api } from "@/lib/axios";
import { token } from "./get-token";

interface GetProfileResponse {
    usuarioId: string
    nome: string
    telefone: string
}

export async function getProfile() {
    const telefone = localStorage.getItem('telefone')
    const response = await api.get<GetProfileResponse>(`/Usuarios/retornar?telefone=${telefone}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}