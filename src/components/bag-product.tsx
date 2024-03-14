import { Button } from "./ui/button";

export interface ProductItemProps {
    produto: {
        itemId: number;
        pedidoId: number;
        clienteId: number;
        produtoValor: number;
        quantidade: number;
        total: number;
        produtoNome: string;
        clienteNome: string;
        imagemUrl: string;
    }
}

export function BagProduct({ produto }: ProductItemProps) {
    return (
        <div className="flex font-sans bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden">
            <div className="flex-none w-48 relative">
                <img src={produto.imagemUrl} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="flex-auto p-6">
                <div className="flex flex-wrap">
                    <h1 className="flex-auto text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                        {produto.produtoNome}
                    </h1>
                    <div className="text-lg font-semibold text-zinc-700 dark:text-zinc-500">
                        {produto.produtoValor.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        })}
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4 mb-6 pb-6 border-b border-zinc-500">
                    <div className="px-4 h-9 rounded-lg flex items-center justify-center text-zinc-100 bg-zinc-500 dark:bg-zinc-700">
                        Unidades: {produto.quantidade}
                    </div>
                    <div className="text-md font-bold h-9 flex-none flex items-center justify-center p-2 rounded-md border text-zinc-700 dark:text-zinc-500 border-zinc-500 dark:border-zinc-700">
                        Total: {produto.total.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        })}
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <Button variant={"destructive"} className="h-9 text-sm">
                        Canelar Pedido
                    </Button>
                </div>
            </div>
        </div>
    );
}
