import * as Papa from "papaparse";
import { Conta } from "../types/index.ts";

const urlContas = "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas";

export async function fetchContas(): Promise<Conta[]> {
  try {
    const response = await fetch(urlContas);
    const csvText = await response.text();

    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

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