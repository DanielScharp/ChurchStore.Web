import { BagProduct } from "@/components/bag-product";
import { api } from "@/services/api";
import { useEffect, useState } from "react";

interface ProductItem {
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

export function Bag() {

    const [produtos, setProdutos] = useState<ProductItem[]>([]);
    const clienteId = 1;

    useEffect(() => {
        api.get(`api/Pedidos/itens/Listar?clienteId=${clienteId}`).then(
            response => {
                setProdutos(response.data);
            }
        ).catch(error => {
            console.error('Erro ao buscar produtos:', error);
        });
    }, []);

    return(
        <div className="grid grid-cols-2 gap-8">
            {
                produtos.map(produto => (
                    <BagProduct key={produto.itemId} produto={produto} />
                ))
            }
        </div>
    )
}