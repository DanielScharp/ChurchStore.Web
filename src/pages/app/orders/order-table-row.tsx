import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./order-datails";

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { OrderStatus } from "@/components/order-status";

export interface OrderTableRowProps {
    order: {
        pedidoId: number
        clienteId: number
        clienteNome: string
        statusNome: 'Pendente' | 'Aprovado' | 'Cancelado' 
        pedidoData: string
        pedidoValor: number
    }
}

export function OrderTableRow({ order }: OrderTableRowProps){


    return(
        <TableRow>
            <TableCell>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="xs" >
                            <Search className="h-3 w-3" />
                            <span className="sr-only">Detalhes do pedido</span>
                        </Button>
                    </DialogTrigger>
                    <OrderDetails order={order} />
                </Dialog>
            </TableCell>
            
            <TableCell className="font-mono text-xs font-medium">
                {order.pedidoId}
            </TableCell>
            <TableCell className="text-muted-foreground">
                {formatDistanceToNow(order.pedidoData, {
                    locale: ptBR,
                    addSuffix: true
                })}
            </TableCell>
            <TableCell>
                <OrderStatus status={order.statusNome} />
            </TableCell>
            <TableCell className="font-mediu">
                {order.clienteNome}
            </TableCell>
            <TableCell className="font-medium">
                {order.pedidoValor.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })}
            </TableCell>
            <TableCell>
                <Button variant="outline" size="xs">
                    <ArrowRight className="mr-2 h-3 w-3" />
                    Aprovar
                </Button>
            </TableCell>
            <TableCell>
                <Button variant="ghost" size="xs">
                    <X className="mr-2 h-3 w-3" />
                    Cancelar
                </Button>
            </TableCell>
        </TableRow>
    )
}