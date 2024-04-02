import { api } from "@/lib/axios"

interface UpdateStatus {
    pedidoId: number
    statusId: number
}

export async function updateStatus({pedidoId, statusId}:UpdateStatus) {
    await api.put(`/Pedidos/Alterar-Status?pedidoId=${pedidoId}&statusId=${statusId}`)
}