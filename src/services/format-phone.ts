export function formatarTelefone(telefone:string) {
   // Remove todos os caracteres que não são dígitos
   const numerosApenas = telefone.replace(/\D/g, '');
    var telFormatado;
   // Verifica se o número tem 11 dígitos (incluindo o DDI 55)
   if (numerosApenas.length === 11) {
       // Formatação para números de celular com DDI
       telFormatado = `(${numerosApenas.slice(0, 2)}) ${numerosApenas.slice(2, 3)} ${numerosApenas.slice(3, 7)}-${numerosApenas.slice(7)}`;
   } else if (numerosApenas.length === 9) {

       // Formatação para números de celular sem DDI
       telFormatado = `${numerosApenas.slice(0, 1)} ${numerosApenas.slice(1, 6)}-${numerosApenas.slice(6)}`;
   } else {

       // Retorna o número original caso não seja possível formatar 
       telFormatado = telefone;
   }
   console.log(telFormatado)
   return telFormatado
}
