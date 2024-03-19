import { ProductProps } from "@/pages/app/buys/buy";
import { api } from "@/services/api";
import { useState } from "react";

export function Product({ produto }: ProductProps) {

    const [quantidade, setQuantidade] = useState(0);

    function SubtrairQuantidade(){
        if(quantidade > 0)
            setQuantidade(quantidade - 1)
    }
    function AdicionarQuantidade(){
        if(quantidade < produto.quantidade)
            setQuantidade(quantidade + 1)
    }

    function AdicionarNaSacola(){
        if(quantidade > 0){
            api.post(`api/Pedidos/itens/adicionar?clienteId=1&produtoId=${produto.produtoId}&quantidade=${quantidade}`).then(
                response => {
                    alert(`${produto.produtoNome} foi adicionado no carrinho!`)
                    setQuantidade(0)
                    produto.quantidade = response.data;
                }
            ).catch(error => {
                console.error('Erro ao buscar produtos:', error);
            });
        }

    }
    return (
        <div className="flex flex-col min-[374px]:flex-row font-sans bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden">
            <div className="flex-none h-24 min-[374px]:h-auto min-[374px]:w-24 min-[425px]:w-32 min-[520px]:w-44 sm:w-48 md:w-24 lg:w-44 relative">
                <img src={produto.imagemUrl} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="flex-auto p-3 lg:p-6">
                <div className="flex flex-wrap">
                    <h1 className="flex-auto text-md sm:text-lg lg:text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                        {produto.produtoNome}
                    </h1>
                    <div className="text-md sm:text-lg lg:text-xl font-semibold text-zinc-700 dark:text-zinc-400 ">
                        {produto.produtoValor.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        })}
                    </div>
                    <div className="w-full flex-none text-sm lg:text-base font-medium text-zinc-700 dark:text-zinc-400 mt-2">
                        Quantidade disponível {produto.quantidade}
                    </div>
                </div>
                <div className="flex items-baseline mt-2">
                    <div className="w-full flex flex-row gap-2 text-sm justify-between items-start">
                        <div className="flex gap-2">
                            <div onClick={SubtrairQuantidade} className="w-8 lg:w-9 h-8 lg:h-9  rounded-lg flex items-center justify-center text-zinc-100 bg-zinc-500 dark:bg-zinc-700 cursor-pointer">
                                -
                            </div>
                            <div className="w-8 lg:w-9 h-8 lg:h-9 rounded-lg flex items-center justify-center text-zinc-100  bg-zinc-500 dark:bg-zinc-700 ">
                                {quantidade}
                            </div>
                            <div onClick={AdicionarQuantidade} className="w-8 lg:w-9 h-8 lg:h-9 rounded-lg flex items-center justify-center text-zinc-100  bg-zinc-500 dark:bg-zinc-700 cursor-pointer">
                                +
                            </div>
                        </div>
                        <div onClick={AdicionarNaSacola} className="h-8 lg:h-9 px-3 lg:px-6 lg:text-base font-semibold rounded-md flex items-center justify-center  bg-zinc-500 text-white dark:bg-zinc-700 cursor-pointer">
                            Reservar
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}