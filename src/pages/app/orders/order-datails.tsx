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
        clienteTel: string
        statusNome: string
        pedidoData: string
        pedidoValor: number
    },
    open: boolean
}

interface OrderItem {
    produtoValor: number;
    quantidade: number;
}


export function OrderDetails({order, open}: OrderTableRowProps) {

    const {data: result} = useQuery({
        queryKey: ['order', order.pedidoId],
        queryFn: () => getOrderDetails(order.pedidoId), 
        enabled: open,
    })

    const calculateSubtotal = (item: OrderItem) => {
        return item.produtoValor * item.quantidade;
    };

    // Calculando o total do pedido somando os subtotais de todos os itens
    const calculateTotal = () => {
        if (result) {
            return result.reduce((acc, item) => acc + calculateSubtotal(item), 0);
        }
        return 0;
    };

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
                        {order.clienteTel}
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
                            <TableCell className="text-right">
                                {item.produtoValor.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                })}
                            </TableCell>
                            <TableCell className="text-right">
                                {(item.produtoValor * item.quantidade).toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                })}
                            </TableCell>
                        </TableRow>
                    ))}
                        
                </TableBody>
                <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total do pedido</TableCell>
                    <TableCell className="text-right font-medium">
                        {calculateTotal().toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        })}
                    </TableCell>
                </TableRow>
            </TableFooter>
            </Table>
        </div>
    </DialogContent>
)
}