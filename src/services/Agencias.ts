import * as Papa from "papaparse";
import { Agencia } from "../types/index.ts";

const urlAgencias = "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias";

export async function fetchAgencias(): Promise<Agencia[]> {
  try {
    const response = await fetch(urlAgencias);
    const csvText = await response.text();

    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

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
