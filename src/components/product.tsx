import { api } from "@/services/api";
import { useState } from "react";

export interface ProductProps {
    produto: {
        produtoId: number;
        produtoNome: string;
        produtoValor: number;
        quantidade: number;
        imagemUrl: string;
    }
}

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
                    {produto.produtoValor.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })}
                </div>
                <div className="w-full flex-none text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-2">
                    Quantidade disponível {produto.quantidade}
                </div>
            </div>
            <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-zinc-200">
                <div className="w-full flex gap-3 text-sm justify-between items-center">
                    <div className="flex gap-3">
                        <div onClick={SubtrairQuantidade} className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-100 bg-zinc-500 dark:bg-zinc-700 cursor-pointer">
                            -
                        </div>
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-100  bg-zinc-500 dark:bg-zinc-700 ">
                            {quantidade}
                        </div>
                        <div onClick={AdicionarQuantidade} className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-100  bg-zinc-500 dark:bg-zinc-700 cursor-pointer">
                            +
                        </div>
                    </div>
                    <div onClick={AdicionarNaSacola} className="h-9 px-6 font-semibold rounded-md flex items-center justify-center  bg-zinc-500 text-white dark:bg-zinc-700 cursor-pointer">
                        Adicionar ao carrinho
                    </div>
                </div>
            </div>
            <p className="text-sm text-zinc-700">
                Imagem ilustrativa.
            </p>
        </div>
    </div>
    )
}