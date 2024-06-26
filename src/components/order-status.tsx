type OrderStatus = string

interface OrderStatusProps {
    status: OrderStatus
}
  
export function OrderStatus({ status }: OrderStatusProps) {
    return (
        <div className="flex items-center gap-2">
            {status === 'Pendente' && 
                (
                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                )
            }
            {status === 'Pago' && 
                (
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                )
            }
            {status === 'Entregue' && 
                (
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                )
            }
            {status === 'Cancelado' && 
                (
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                )
            }
            <span className="font-medium text-muted-foreground">{status}</span>
        </div>
    )
}