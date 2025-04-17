export function formatarCpfCnpj(valor: string): string {
    const somenteNumeros = valor.replace(/\D/g, '');
  
    if (somenteNumeros.length === 11) {
      return somenteNumeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else if (somenteNumeros.length === 14) {
      return somenteNumeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    } else {
      return valor;
    }
}

export function getTipoDocumento(valor: string): "CPF" | "CNPJ" {
  const somenteNumeros = valor.replace(/\D/g, '');
  return somenteNumeros.length === 11 ? "CPF" : "CNPJ";
}