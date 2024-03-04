import { Product } from "@/components/product";
import { api } from "@/services/api";
import { useEffect, useState } from "react";


interface Produto {
    produtoId: number;
    produtoNome: string;
    produtoValor: number;
    quantidade: number;
}

export function Buy() {

    const [produtos, setProdutos] = useState<Produto[]>([]);
    
    useEffect(() => {
        api.get('api/Pedidos/Produtos/Listar').then(
            response => {
                setProdutos(response.data);
            }
        ).catch(error => {
            console.error('Erro ao buscar produtos:', error);
        });
    }, []);

    return(
        <div className="flex justify-around">
            {
                produtos.map(produto => (
                    <Product key={produto.produtoId} produto={produto} />
                ))
            }
        </div>
    )
}