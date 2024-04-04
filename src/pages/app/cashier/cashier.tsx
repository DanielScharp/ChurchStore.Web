import { getMenu } from "@/api/get-menu";
import { Product } from "@/components/product";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

export interface ProductProps {
    produto: {
        produtoId: number;
        produtoNome: string;
        produtoValor: number;
        quantidade: number;
        imagemUrl: string;
    }
}

export function Cashier() {
    const { data: menu, isLoading, isError } = useQuery({
        queryKey: ['menu'],
        queryFn: getMenu,
    })

    if (isLoading) return <Skeleton className="h-36 w-1/2 p-11" />;
    if (isError) return <div>Ocorreu um erro ao buscar os dados</div>;

    return(
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 m-8 mb-32">
                {menu && menu.length > 0 ? (
                    menu.map(itemMenu => (
                        <Product key={itemMenu.produtoId} produto={itemMenu} />
                    ))
                ) : (
                    <p>Nenhum produto foi adicionado.</p>
                )}
            </div>
            <div className="w-screen h-20 fixed bottom-0 bg-zinc-100 dark:bg-zinc-800">
                    teste
            </div>
        </div>
        
    )
}