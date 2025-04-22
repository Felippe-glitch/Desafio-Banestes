import * as Papa from "papaparse";
import { Agencia } from "../types/index.ts";

// URL da planilha pública do Google Sheets contendo os dados das agências (em formato CSV)
const urlAgencias = "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias";

/**
 * Busca e processa os dados de agências a partir da planilha pública
 * @returns Lista de objetos do tipo Agencia
 */
export async function fetchAgencias(): Promise<Agencia[]> {
  try {
    // Requisição para obter o conteúdo da planilha
    const response = await fetch(urlAgencias);

    if (!response.ok) {
      throw new Error(`Erro ao buscar agências: ${response.statusText}`);
    }

    // Converte a resposta para texto (CSV bruto)
    const csvText = await response.text();

    // Faz o parse do CSV para objetos JavaScript
    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    // Mapeia e retorna a lista de agências com os campos necessários
    return result.data.map((item: any) => ({
      id: item.id,
      codigo: parseInt(item.codigo, 10),
      nome: item.nome,
      endereco: item.endereco,
    }));
  } catch (error) {
    console.error("Erro ao carregar agências:", error);
    return [];
  }
}
