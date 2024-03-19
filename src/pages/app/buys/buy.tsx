import { Product } from "@/components/product";
import { api } from "@/services/api";
import { useEffect, useState } from "react";

export interface ProductProps {
    produto: {
        produtoId: number;
        produtoNome: string;
        produtoValor: number;
        quantidade: number;
        imagemUrl: string;
    }
}

export function Buy() {

    const [produtos, setProdutos] = useState<ProductProps['produto'][]>([]);
    
    useEffect(() => {
        api.get('api/Produtos/Listar?publico=true').then(
            response => {
                setProdutos(response.data);
            }
        ).catch(error => {
            console.error('Erro ao buscar produtos:', error);
        });
    }, []);

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {
                produtos.map(produto => (
                    <Product key={produto.produtoId} produto={produto} />
                ))
            }
        </div>
    )
}