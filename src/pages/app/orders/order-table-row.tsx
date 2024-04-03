import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./order-datails";

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { OrderStatus } from "@/components/order-status";
import { useState } from "react";
import { useMutation} from "@tanstack/react-query";
import { updateStatus } from "@/api/update-status";
import { toast } from "sonner";

export interface OrderTableRowProps {
    order: {
        pedidoId: number
        clienteId: number
        clienteNome: string
        statusNome: string
        pedidoData: string
        pedidoValor: number
    }
}

export function OrderTableRow({ order }: OrderTableRowProps){
    
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isOrder, setIsOrder] = useState(order);

    const {mutateAsync: updateStatusFn} = useMutation({
        mutationFn: updateStatus,
    })

    async function handleStatusOrder(status:number) {
        try {

            const updatedOrder = {
                ...order,
                statusNome: status === 2 ? "Pago" : status === 3 ? "Entregue" : "Cancelado"
            };

            setIsOrder(updatedOrder);

            await updateStatusFn({
                pedidoId: order.pedidoId,
                statusId: status,
            }) 

            toast.success('Pedido atualizado com sucesso!')
        } catch {
            toast.error('Falha ao atualizar pedido, tente novamente!')
        }
    }
    return(
        <TableRow>
            <TableCell>
                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="xs" >
                            <Search className="h-3 w-3" />
                            <span className="sr-only">Detalhes do pedido</span>
                        </Button>
                    </DialogTrigger>
                    <OrderDetails order={isOrder} open={isDetailsOpen} />
                </Dialog>
            </TableCell>
            
            <TableCell className="font-mono text-xs font-medium">
                {isOrder.pedidoId}
            </TableCell>
            <TableCell className="text-muted-foreground">
                {formatDistanceToNow(isOrder.pedidoData, {
                    locale: ptBR,
                    addSuffix: true
                })}
            </TableCell>
            <TableCell>
                <OrderStatus status={isOrder.statusNome} />
            </TableCell>
            <TableCell className="font-mediu">
                {isOrder.clienteNome}
            </TableCell>
            <TableCell className="font-medium">
                {isOrder.pedidoValor.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })}
            </TableCell>
            <TableCell>
                {
                    isOrder.statusNome == 'Pendente' ?
                    <Button variant="outline" size="xs" onClick={() => handleStatusOrder(2)}>
                        <ArrowRight className="mr-2 h-3 w-3" />
                        Pago
                    </Button> :
                    <Button variant="outline" size="xs" onClick={() => handleStatusOrder(3)}>
                        <ArrowRight className="mr-2 h-3 w-3" />
                        Entregue
                    </Button>
                }
            </TableCell>
            <TableCell>
                <Button variant="destructive" size="xs" onClick={() => handleStatusOrder(4)}>
                    <X className="mr-2 h-3 w-3" />
                    Cancelar
                </Button>
            </TableCell>
        </TableRow>
    )
}