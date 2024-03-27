import { api } from '@/lib/axios'

export interface GetOrdersResponse {
  orders: {
    pedidoId: number
    clienteId: number
    clienteNome: string
    statusNome: 'Pendente' | 'Aprovado' | 'Cancelado' 
    pedidoData: string
    pedidoValor: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders() {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex: 0,
    },
  })

  return response.data
}