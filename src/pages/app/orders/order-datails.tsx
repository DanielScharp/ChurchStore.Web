import { OrderStatus } from '@/components/order-status'
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { api } from '@/lib/axios'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { ProductItemProps } from '../bag/bag'

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

export function OrderDetails({order}: OrderTableRowProps, {open}: OrderTableRowProps) {

    const [itens, setItens] = useState<ProductItemProps['produto'][]>([])

    if(open){
        useEffect(() => {
            api.get(`Pedidos/itens/listar-pedidoId?pedidoId=${order.pedidoId}`).then(
                response => {
                    setItens(response.data)
                }
            ).catch(error => {
                console.error('Erro ao buscar produtos:', error);
            });
        }, []);
    }
    


return (
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Pedido: {order.pedidoId}</DialogTitle>
            <DialogDescription>Detalhes do pedido</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
            <Table>
                <TableBody>
                    <TableRow>
                    <TableCell className="text-muted-foreground">Status</TableCell>
                    <TableCell className="flex justify-end">
                        <div className="flex items-center gap-2">
                            <OrderStatus status={order.statusNome} />
                        </div>
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell className="text-muted-foreground">Cliente</TableCell>
                    <TableCell className="flex justify-end">
                        {order.clienteNome}
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell className="text-muted-foreground">Telefone</TableCell>
                    <TableCell className="flex justify-end">
                        (11) 99999-9999
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell className="text-muted-foreground">E-mail</TableCell>
                    <TableCell className="flex justify-end">
                        diego@rocketseat.com.br
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell className="text-muted-foreground">
                        Realizado há
                    </TableCell>
                    <TableCell className="flex justify-end">
                        {formatDistanceToNow(order.pedidoData, {
                            locale: ptBR,
                            addSuffix: true
                        })}
                    </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead className="text-right">Qtd.</TableHead>
                    <TableHead className="text-right">Preço</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {itens.map(item => (
                        <TableRow>
                            <TableCell>{item.produtoNome}</TableCell>
                            <TableCell className="text-right">2</TableCell>
                            <TableCell className="text-right">R$ 69,90</TableCell>
                            <TableCell className="text-right">R$ 139,80</TableCell>
                        </TableRow>
                    ))}
                        
                </TableBody>
                <TableFooter>
                    <TableRow>
                    <TableCell colSpan={3}>Total do pedido</TableCell>
                    <TableCell className="text-right font-medium">
                        R$ 259,60
                    </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    </DialogContent>
)
}