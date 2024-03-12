
export interface ProductProps {
    produto: {
        produtoId: number;
        produtoNome: string;
        produtoValor: number;
        quantidade: number;
        imagemUrl: string;
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
                        {produto.produtoValor.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        })}
                    </div>
                    <div className="w-full flex-none text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-2">
                        Quantidade disponível {produto.quantidade}
                    </div>
                </div>
            </div>
        </div>
    );
}