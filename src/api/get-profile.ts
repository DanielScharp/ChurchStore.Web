import { api } from "@/lib/axios";

interface GetProfileResponse {
    usuarioId: Number
    nome: string
}

export async function getProfile() {
    const response = await api.get<GetProfileResponse>('/Usuarios/retornar')

    return response.data
}