// --> DEFININDO E TIPANDO OS ATRIBUTOS DO OBJETO CLIENTE
export interface Cliente{
    id: string;
    cpF_cnpj: string;
    rg: string;
    dataNascimento: Date;
    nome: string;
    nomeSocial?: string;
    email: string;
    endereco: string;
    rendaAnual: number;
    patrimonio: number;
    estadoCivil: "Solteiro" | "Casado" | "Viúvo" | "Divorciado";
    codigoAgencia: number;
}