import { api } from "@/lib/axios";
import { token } from "./get-token";

interface GetProfileResponse {
    usuarioId: Number
    nome: string
    email: string
}

export async function getProfile() {
    const email = localStorage.getItem('email')
    const response = await api.get<GetProfileResponse>(`/Usuarios/retornar?email=${email}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}