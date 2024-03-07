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

        var data = {

        }

        if(quantidade > 0){
            api.post('api/Pedidos/itens/adicionar')
        }
    }
    return (
        <div className="flex font-sans bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden">
        <div className="flex-none w-48 relative">
            <img src={produto.imagemUrl} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="flex-auto p-6">
            <div className="flex flex-wrap">
                <h1 className="flex-auto text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {produto.produtoNome}
                </h1>
                <div className="text-lg font-semibold text-slate-500">
                    {produto.produtoValor.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })}
                </div>
                <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                    Quantidade disponível {produto.quantidade}
                </div>
            </div>
            <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
                <div className="w-full flex gap-3 text-sm justify-between items-center">
                    <div className="flex gap-3">
                        <div onClick={SubtrairQuantidade} className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-100 bg-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                            -
                        </div>
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-100 bg-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                            {quantidade}
                        </div>
                        <div onClick={AdicionarQuantidade} className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-100 bg-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                            +
                        </div>
                    </div>
                    <div onClick={AdicionarNaSacola} className="h-9 px-6 font-semibold rounded-md flex items-center justify-center bg-black text-white">
                        Add to bag
                    </div>
                </div>
            </div>
            <div className="flex space-x-4 mb-6 text-sm font-medium">
                <div className="flex-auto flex space-x-4">
                
                </div>

            </div>
            <p className="text-sm text-slate-700">
                Free shipping on all continental US orders.
            </p>
        </div>
    </div>
    )
}