import { api } from "@/lib/axios"

interface UpdateProfileBody {
    usuarioId: number
    nome: string
    telefone: string | null
}

export async function updateProfile({usuarioId, nome, telefone}:UpdateProfileBody) {
    await api.put('/Usuarios/Alterar', {usuarioId,nome,telefone})
}