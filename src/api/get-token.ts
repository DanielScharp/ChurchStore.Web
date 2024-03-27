
export function getTokenFromCookie() {
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

export const token = getTokenFromCookie(); // Função para recuperar o token do cookie
