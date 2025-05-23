import * as Papa from "papaparse";
import { Cliente } from "../types/index.ts";

// URL do Google Sheets exportado como CSV
const urlClientes =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes";

// Função auxiliar para limpar valores: remove espaços e substitui vazios por "Não informado"
const limpaCampo = (valor: any): string =>
  typeof valor === "string" && valor.trim() !== ""
    ? valor.trim()
    : "Não informado";

/**
 * Busca e processa os dados de clientes a partir de uma planilha pública do Google Sheets
 * @returns Lista de objetos do tipo Cliente
 */
export async function fetchClientes(): Promise<Cliente[]> {
  try {
    const response = await fetch(urlClientes);

    if (!response.ok) {
      throw new Error(`ERRO AO BUSCAR CLIENTE: ${response.statusText}`);
    }

    const csvText = await response.text();

    // Converte o CSV para um array de objetos
    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    if (!Array.isArray(result.data) || result.data.length === 0) {
      throw new Error("Nenhum dado de cliente encontrado no banco de clientes");
    }

    // Mapeia e normaliza os dados dos clientes
    const clientes: Cliente[] = result.data.map((item: any) => {
      const normalizado = Object.fromEntries(
        Object.entries(item).map(([key, value]) => [
          key,
          limpaCampo(value),
        ])
      );

      return {
        id: normalizado.id,
        cpfCnpj: normalizado.cpfCnpj,
        rg: normalizado.rg,
        nome: normalizado.nome,
        nomeSocial: normalizado.nomeSocial,
        email: normalizado.email,
        telefone: normalizado.telefone,
        endereco: normalizado.endereco,
        estadoCivil:
          normalizado.estadoCivil !== "Não informado"
            ? (normalizado.estadoCivil as Cliente["estadoCivil"])
            : "Solteiro",
        dataNascimento:
          normalizado.dataNascimento !== "Não informado"
            ? new Date(normalizado.dataNascimento)
            : new Date("1900-01-01"),
        rendaAnual:
          normalizado.rendaAnual !== "Não informado"
            ? parseFloat(normalizado.rendaAnual)
            : 0,
        patrimonio:
          normalizado.patrimonio !== "Não informado"
            ? parseFloat(normalizado.patrimonio)
            : 0,
        codigoAgencia:
          normalizado.codigoAgencia !== "Não informado"
            ? parseInt(normalizado.codigoAgencia, 10)
            : 0,
      };
    });

    return clientes;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("ERRO PROCESSAR CLIENTE:", error.message);
    } else {
      console.error("ERRO DESCONHECIDO:", error);
    }
    return [];
  }
}
