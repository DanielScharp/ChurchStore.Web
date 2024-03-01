import { TestTube } from "lucide-react"

export interface ProductProps {
    teste: {
        produtoId: number
        ProdutoNome: string
        ProdutoValor: number
        Qauntidade: number 
    }
}


export function Product({ teste }: ProductProps) {
    return (
        <div className="w-[100px] bg-emerald-600">
            <h1>{teste.ProdutoNome}</h1>
            <div className="">
                {teste.ProdutoValor.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })}
            </div>
        </div>
    )
}