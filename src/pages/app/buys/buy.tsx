import { Product } from "@/components/product";
import { api } from "@/services/api";
import { useEffect, useState } from "react";

export function Buy() {

        
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        api.get('api/Pedidos/Produtos/Listar').then(
            response => {
                setProdutos(response.data);
            }
        ).catch(error => {
            // Tratar o erro, se necessário
            console.error('Erro ao buscar produtos:', error);
        });
    }, []);


    return(
        <div>
            {
                produtos.map(produto => (
                    <Product key={produto} teste={produto} />
                ))
            }
        </div>
    )
}