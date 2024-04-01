import { getOrderDetails } from '@/api/get-order-details'
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
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

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

export function OrderDetails({order, open}: OrderTableRowProps) {

    const {data: result} = useQuery({
        queryKey: ['order', order.pedidoId],
        queryFn: () => getOrderDetails(order.pedidoId), 
        enabled: open,
    })


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
                    {result?.map((item) => (
                        <TableRow key={item.produtoId}>
                            <TableCell>{item.produtoNome}</TableCell>
                            <TableCell className="text-right">{item.quantidade}</TableCell>
                            <TableCell className="text-right">{item.produtoValor}</TableCell>
                            <TableCell className="text-right">{item.produtoValor * item.quantidade}</TableCell>
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