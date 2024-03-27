import { api } from "@/lib/axios"

export interface OrderTableRowProps {
    order: {
        pedidoId: number
        clienteId: number
        clienteNome: string
        statusNome: 'Pendente' | 'Aprovado' | 'Cancelado' 
        pedidoData: string
        pedidoValor: number
    },
    open: boolean
}



export async function getOrderDetails({order}:OrderTableRowProps) {
    const response = await api.get<OrderTableRowProps>(`Pedidos/itens/listar-pedidoId?pedidoId=${order.pedidoId}`)   

    return response.data
}