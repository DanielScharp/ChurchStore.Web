import { api } from '@/lib/axios'

export interface GetOrdersResponse {
  pedidoId: number
  clienteId: number
  clienteNome: string
  statusNome: string
  pedidoData: string
  pedidoValor: number
  
}

export async function getOrders() {
  const response = await api.get<GetOrdersResponse[]>('/Pedidos/Listar')

  return response.data
}