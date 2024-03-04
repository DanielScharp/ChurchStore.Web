export interface ProductProps {
    produto: {
        produtoId: number;
        produtoNome: string;
        produtoValor: number;
        quantidade: number;
    }
}


export function Product({ produto }: ProductProps) {
    return (
        <div className="w-[100px] bg-emerald-600">
            <h1>{produto.produtoNome}</h1>
            <div>
            {produto.produtoValor.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })}
            </div>
        </div>
    )
}