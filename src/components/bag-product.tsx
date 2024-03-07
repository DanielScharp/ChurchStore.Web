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
                        Quantidade
                    </div>
                </div>
                <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-100 bg-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                        {produto.quantidade}
                    </div>
                    <div className="text-lg font-semibold text-slate-500">
                        {produto.produtoValor.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        })}
                    </div>
                </div>
                <div className="flex space-x-4 mb-6 text-sm font-medium">
                    <div className="flex-auto flex space-x-4">
                        <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
                            Buy now
                        </button>
                        <button className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button">
                            Add to bag
                        </button>
                    </div>
                    <button className="flex-none flex items-center justify-center p-2 rounded-md text-slate-300 border border-slate-200" type="button" aria-label="Like">
                        {produto.total.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        })}
                    </button>
                </div>
                <p className="text-sm text-slate-700">
                    Free shipping on all continental US orders.
                </p>
            </div>
        </div>
    );
}
