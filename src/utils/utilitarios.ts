// Formata uma string de CPF ou CNPJ adicionando os separadores corretos
export function formatarCpfCnpj(valor: string): string {
    const somenteNumeros = valor.replace(/\D/g, ''); // Remove tudo que não for número
  
    // Formato CPF: 000.000.000-00
    if (somenteNumeros.length === 11) {
      return somenteNumeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } 
    // Formato CNPJ: 00.000.000/0000-00
    else if (somenteNumeros.length === 14) {
      return somenteNumeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    } 
    // Retorna o valor original se não for um CPF ou CNPJ válido
    else {
      return valor;
    }
}

// Retorna "CPF" ou "CNPJ" com base no número de dígitos
export function getTipoDocumento(valor: string): "CPF" | "CNPJ" {
  const somenteNumeros = valor.replace(/\D/g, '');
  return somenteNumeros.length === 11 ? "CPF" : "CNPJ";
}