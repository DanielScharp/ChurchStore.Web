import { BagProduct } from "@/components/bag-product";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";

export interface ProductItemProps {
    produto: {
        pedidoId: number;
        produtoId: number;
        clienteId: number;
        produtoValor: number;
        quantidade: number;
        total: number;
        produtoNome: string;
        clienteNome: string;
        imagemUrl: string;
    }
}

export function Bag() {

    const [produtos, setProdutos] = useState<ProductItemProps['produto'][]>([]);
    const clienteId = 1;

    useEffect(() => {
        api.get(`Pedidos/itens/Listar?clienteId=${clienteId}`).then(
            response => {
                setProdutos(response.data);
            }
        ).catch(error => {
            console.error('Erro ao buscar produtos:', error);
        });
    }, []);

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {produtos.length === 0 ? (
                <p>O carrinho está vazio</p>
            ) : (
                produtos.map(item => (
                    <BagProduct key={item.produtoId} produto={item} />
                ))
            )}
        </div>
    )
}