import { api } from "@/lib/axios";
import { token } from "./get-token";

interface GetMenuResponse {
    produtoId: number;
    produtoNome: string;
    produtoValor: number;
    quantidade: number;
    imagemUrl: string;
}


export async function getMenu() {
    const response = await api.get<GetMenuResponse[]>('/Produtos/Listar?publico=true', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data
}