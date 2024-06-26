import { getOrders } from "@/api/get-orders";
import { Pagination } from "@/components/pagination";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { OrderTableFilters } from "./order-table-filters";
import { OrderTableRow } from "./order-table-row";

export function Orders() {
    const { data: pedidos} = useQuery({
        queryKey: ['pedidos'],
        queryFn: getOrders,
    })

    return (
        <>
            <Helmet title="Pedidos" />
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
                <div className="space-y-2.5">
                <OrderTableFilters />
                <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[64px]"></TableHead>
                                    <TableHead className="w-[140px]">Idetificador</TableHead>
                                    <TableHead className="w-[180px]">Realizado há</TableHead>
                                    <TableHead className="w-[140px]">Status</TableHead>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead className="w-[140px]">Total do pedido</TableHead>
                                    <TableHead className="w-[164px]"></TableHead>
                                    <TableHead className="w-[132px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pedidos && pedidos.length > 0 ? (
                                    pedidos.map(itemMenu => (
                                        <OrderTableRow key={itemMenu.pedidoId} order={itemMenu} />
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="text-center p-4">
                                            <p>Nenhum produto foi adicionado.</p>
                                        </td>
                                    </tr>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <Pagination pageIndex={0} totalCount={105} perPage={10} />
                </div>
            </div>
            
        </>
    )
}