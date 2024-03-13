import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { api } from '@/services/api';
import { Label } from '@radix-ui/react-label';
import { useState } from 'react';

export interface ProductProps {
    produto: {
        produtoId: number;
        produtoNome: string;
        produtoValor: string;
        quantidade: number;
        imagemUrl: string;
        exibir: boolean;
    }
}

export function EditProduct({ produto }: ProductProps) {

    const [produtoAlter, setProdutoAlter] = useState(produto);


    function alterar(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        
         // Convertendo o valor de vírgula para ponto antes de enviar para a API
        const produtoAlterParaAPI = { ...produtoAlter, produtoValor: parseFloat(produtoAlter.produtoValor.toString().replace(',', '.')) };
        api.post(`api/Produtos/alterar`, produtoAlterParaAPI).then(
            response => {
                location.reload();
            }
        ).catch(error => {
            console.error('Erro ao buscar produtos:', error);
        });
    }
return (
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Produto: {produtoAlter.produtoId}</DialogTitle>
            <DialogDescription>Detalhes do produto</DialogDescription>
        </DialogHeader>

        <form onSubmit={alterar} className="space-y-2 grid">
            <div>
                <Label htmlFor='nome'>Nome</Label>
                <Input 
                    id='nome'
                    type='text' 
                    value={produtoAlter.produtoNome} 
                    onChange={(e) => setProdutoAlter({ ...produtoAlter, produtoNome: e.target.value })} 
                />
            </div>
            <div className='grid grid-cols-3 gap-6'>
                <div>
                    <Label htmlFor='quantidade'>Quantidade</Label>
                    <Input 
                        id='quantidade'
                        type='number' 
                        value={produtoAlter.quantidade} 
                        onChange={(e) => setProdutoAlter({ ...produtoAlter, quantidade: parseInt(e.target.value) })} 
                    />
                </div>
                <div>
                    <Label htmlFor='quantidade'>Valor</Label>
                    <Input 
                        id='valor'
                        type='text' 
                        value={produtoAlter.produtoValor.toString().replace('.', ',')} 
                        onChange={(e) => setProdutoAlter({ ...produtoAlter, produtoValor: e.target.value })} 
                    />
                </div>
                
                <div className='flex flex-col'>
                    <Label htmlFor='exibir'>Exibir</Label>
                    <Checkbox 
                        className='w-10 h-10' 
                        checked={produtoAlter.exibir}
                        onCheckedChange={() => setProdutoAlter({ ...produtoAlter, exibir: !produtoAlter.exibir })}
                    />
                </div>
            </div>
            
            <div>
                <Label htmlFor='image'>ImagemURL</Label>
                <Input 
                    id='image'
                    type='text' 
                    value={produtoAlter.imagemUrl} 
                    onChange={(e) => setProdutoAlter({ ...produtoAlter, imagemUrl: e.target.value })} 
                />
            </div>
            <Button type='submit' className='w-full'>
                Salvar
            </Button>


        </form>
    </DialogContent>
)
}