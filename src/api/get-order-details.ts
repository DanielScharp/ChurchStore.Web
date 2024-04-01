import { api } from "@/lib/axios"

export interface OrderTableRowProps {
    itemId: number
    pedidoId: number
    clienteId: string
    clienteNome:string
    produtoId: number
    produtoNome: string
    produtoValor: number
    quantidade: number
    total: number
}

export async function getOrderDetails(pedidoId:number) {
    const response = await api.get<OrderTableRowProps[]>(`Pedidos/itens/listar-pedidoId?pedidoId=${pedidoId}`)   
console.log(response)
    return response.data
}