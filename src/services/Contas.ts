import * as Papa from "papaparse";
import { Conta } from "../types/index.ts";

// URL da planilha pública do Google Sheets contendo os dados das contas (em formato CSV)
const urlContas = "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas";

/**
 * Busca e processa os dados de contas a partir da planilha pública
 * @returns Lista de objetos do tipo Conta
 */
export async function fetchContas(): Promise<Conta[]> {
  try {
    const response = await fetch(urlContas);

    if (!response.ok) {
      throw new Error(`Erro ao buscar contas: ${response.statusText}`);
    }

    // Converte o conteúdo CSV para texto
    const csvText = await response.text();

    // Faz o parse do CSV em JSON
    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    // Mapeia os dados e faz as conversões necessárias
    return result.data.map((item: any) => ({
      id: item.id,
      cpfCnpjCliente: item.cpfCnpjCliente,
      tipo: item.tipo.toLowerCase() === "poupanca" ? "poupanca" : "corrente",
      saldo: parseFloat(item.saldo),
      limiteCredito: parseFloat(item.limiteCredito),
      creditoDisponivel: parseFloat(item.creditoDisponivel),
    }));
  } catch (error) {
    console.error("Erro ao carregar contas:", error);
    return [];
  }
}