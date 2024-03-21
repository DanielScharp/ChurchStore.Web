import { api } from "@/lib/axios";

interface GetMenuResponse {
    produtoId: number;
    produtoNome: string;
    produtoValor: number;
    quantidade: number;
    imagemUrl: string;
}
function getTokenFromCookie() {
    // Lógica para obter o token do cookie
    const cookie = document.cookie;
    const tokenPrefix = 'token=';
    const tokenStartIndex = cookie.indexOf(tokenPrefix);
    if (tokenStartIndex === -1) return null;

    const tokenEndIndex = cookie.indexOf(';', tokenStartIndex);
    const token = tokenEndIndex !== -1 ?
        cookie.slice(tokenStartIndex + tokenPrefix.length, tokenEndIndex) :
        cookie.slice(tokenStartIndex + tokenPrefix.length);
    
    return token;
}


export async function getMenu() {
    const token = getTokenFromCookie(); // Função para recuperar o token do cookie
    const response = await api.get<GetMenuResponse[]>('/Produtos/Listar?publico=true', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data
}