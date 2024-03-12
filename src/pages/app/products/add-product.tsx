import { AdminProduct } from "@/components/admin-product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/services/api";
import { useEffect, useState } from "react";

interface Produto {
    produtoId: number;
    produtoNome: string;
    produtoValor: number;
    quantidade: number;
    imagemUrl: string;

}

export function AddProduct() {

    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [newProduct, setNewProduct] = useState<Produto>({ 
        produtoId: 0, 
        produtoNome: '', 
        produtoValor: 0, 
        quantidade: 0, 
        imagemUrl: '' 
    });
    useEffect(() => {
        api.get('api/Produtos/Listar').then(
            response => {
                setProdutos(response.data);
            }
        ).catch(error => {
            console.error('Erro ao buscar produtos:', error);
        });
    }, []);

    function addProduct(){
        api.post('api/Produtos/adicionar', newProduct).then(
            response => {
                setProdutos([...produtos, response.data]);
            }
        ).catch(error => {
            console.error('Erro ao buscar produtos:', error);
        });
    }

    return(
        <>
            <div  className="w-full grid grid-cols-5 p-4 rounded-md gap-4 bg-zinc-800">
                <Input 
                    id="productname" 
                    value={newProduct?.produtoNome}
                    onChange={(e) => setNewProduct({ ...newProduct, produtoNome: e.target.value })}
                    placeholder="Nome do produto" 
                    className="h-8 "
                />
                <Input 
                    id="quantity" 
                    value={newProduct?.quantidade}
                    onChange={(e) => setNewProduct({ ...newProduct, quantidade:parseInt(e.target.value) || 0 })}
                    placeholder="Quantidade disponível" 
                    className="h-8"
                />
                <Input 
                    id="value" 
                    value={newProduct?.produtoValor}
                    onChange={(e) => setNewProduct({ ...newProduct, produtoValor:parseInt(e.target.value) || 0 })}
                    placeholder="Valor" 
                    className="h-8"
                />
                <Input 
                    id="imageUrl" 
                    value={newProduct?.imagemUrl}
                    onChange={(e) => setNewProduct({ ...newProduct, imagemUrl: e.target.value })}
                    placeholder="Url da imagem" 
                    className="h-8"
                />
                <Button type="button" onClick={addProduct} variant="default" size="xs">
                    Adicionar Produto
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {
                    produtos.map(produto => (
                        <AdminProduct key={produto.produtoId} produto={produto} />
                    ))
                }
            </div>
        </>
    )
}