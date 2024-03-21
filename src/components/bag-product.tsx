import { ProductItemProps } from "@/pages/app/bag/bag";
import { api } from "@/lib/axios";
import { Trash2 } from "lucide-react";

export function BagProduct({ produto }: ProductItemProps) {
    function deleteOrderItem(){
        api.post(`Pedidos/itens/remover?clienteId=${produto.clienteId}&produtoId=${produto.produtoId}&pedidoId=${produto.pedidoId}`).then(
            response => {
                if(response){
                    alert(`${produto.produtoNome} foi removido do carrinho!`)
                    location.reload();
                }
                else {
                    alert("Erro!")
                }
            }
        ).catch(error => {
            console.error('Erro ao buscar produtos:', error);
        });
    }

    return (
        <div className="flex flex-col min-[424px]:flex-row font-sans bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden relative">
            <div className="flex-none h-32 min-[424px]:h-auto min-[424px]:w-24 min-[425px]:w-32 min-[520px]:w-44 sm:w-48 md:w-24 lg:w-44 relative">
                <img src={produto.imagemUrl} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                <div className="absolute top-2 right-2 p-2 rounded-md bg-red-700 cursor-pointer hover:bg-red-800 text-zinc-100">
                    <Trash2 onClick={deleteOrderItem} width={20} height={20} /> 
                </div>
            </div>
            <div className="flex-auto p-3 lg:p-6">
                <div className="flex flex-wrap">

                    <h1 className="flex-auto text-md sm:text-lg lg:text-xl font-semibold text-zinc-900 dark:text-zinc-300">
                        {produto.produtoNome}
                    </h1>
                    <div className=" text-md sm:text-lg font-semibold text-zinc-700 dark:text-zinc-300">
                        {produto.produtoValor.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        })}
                    </div>
                    
                </div>
                <div className="flex flex-row items-center justify-between text-sm sm:text-md mt-4">
                    <div className="px-3 md:px-2 lg:px-4 h-9 rounded-lg flex items-center justify-center text-zinc-100 bg-zinc-500 dark:bg-zinc-500">
                        Unidades {produto.quantidade}
                    </div>
                    <div className="text-md font-bold h-9 flex-none flex items-center justify-center p-2 rounded-md border  text-zinc-700 dark:text-zinc-300 border-zinc-500 dark:border-zinc-300">
                        Total {produto.total.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
