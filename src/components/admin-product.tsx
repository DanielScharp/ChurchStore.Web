import { EditProduct } from "@/pages/app/products/edit-product";
import { PencilLine } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";

export interface ProductProps {
    produto: {
        produtoId: number;
        produtoNome: string;
        produtoValor: string;
        quantidade: number;
        imagemUrl: string;
        exibir: boolean;
    }
}

export function AdminProduct({ produto }: ProductProps) {

    return(
        <div className="flex font-sans bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden">
            <div className="flex-none w-48 relative">
                <img src={produto.imagemUrl} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="flex-auto p-6">
                <div className="flex flex-wrap">
                    <h1 className="flex-auto text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                        {produto.produtoNome}
                    </h1>
                    <div className="text-lg font-semibold text-zinc-500 dark:text-zinc-400 ">
                        {parseFloat(produto.produtoValor).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        })}
                    </div>
                    <div className="w-5/6 flex items-center text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-2">
                        Quantidade disponível {produto.quantidade}
                    </div>
                    <div className="w-1/6 flex justify-end text-zinc-500 dark:text-zinc-400 mt-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="xs" >
                                    <PencilLine className="h-3 w-3" />
                                    <span className="sr-only">Detalhes do pedido</span>
                                </Button>
                            </DialogTrigger>
                            <EditProduct produto={produto} />
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
}