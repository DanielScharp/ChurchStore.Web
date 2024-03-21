import { AdminProduct } from "@/components/admin-product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";

interface Produto {
    produtoId: number;
    produtoNome: string;
    produtoValor: string;
    quantidade: number;
    imagemUrl: string;
    exibir: boolean;
}

export function AddProduct() {

    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [newProduct, setNewProduct] = useState<Produto>({ 
        produtoId: 0, 
        produtoNome: '', 
        produtoValor: '', 
        quantidade: 0, 
        imagemUrl: '',
        exibir: false
        
    });
    useEffect(() => {
        api.get('Produtos/Listar?publico=false').then(
            response => {
                setProdutos(response.data);
            }
        ).catch(error => {
            console.error('Erro ao buscar produtos:', error);
        });
    }, []);

    function addProduct(){
        const produto = { ...newProduct, produtoValor: parseFloat(newProduct.produtoValor.toString().replace(',', '.')) };

        api.post('Produtos/adicionar', produto).then(
            response => {
                setProdutos([...produtos, response.data]);
            }
        ).catch(error => {
            console.error('Erro ao buscar produtos:', error);
        });
    }

    return(
        <>
            <div  className="w-full sticky top-0 z-10 grid grid-cols-5 p-4 rounded-md gap-4 border-2 dark:border-zinc-950  bg-zinc-100 dark:bg-zinc-800 ">
                <Input 
                    id="productname" 
                    value={newProduct?.produtoNome}
                    onChange={(e) => setNewProduct({ ...newProduct, produtoNome: e.target.value })}
                    placeholder="Nome do produto" 
                    className="h-8 "
                />
                <Input 
                    id="quantity" 
                    onChange={(e) => setNewProduct({ ...newProduct, quantidade:parseInt(e.target.value) || 0 })}
                    placeholder="Quantidade disponível" 
                    className="h-8"
                />
                <Input 
                    id="value" 
                    value={newProduct?.produtoValor}
                    onChange={(e) => setNewProduct({ ...newProduct, produtoValor: e.target.value})}
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