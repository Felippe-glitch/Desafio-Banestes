import Papa from "papaparse";
import { Cliente } from "../types/index";

const urlClientes = "https://docs.google.com/spreadsheets/d/...&sheet=clientes";

export async function fetchClientes(): Promise<Cliente[]> {
    try {
        const response = await fetch(urlClientes);

        if (!response.ok) {
            throw new Error(`Erro ao buscar clientes: ${response.statusText}`);
        }

        const csvText = await response.text();

        const result = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
        });

        if (!result.data || result.data.length === 0) {
            throw new Error("Nenhum dado de cliente encontrado no CSV");
        }

        const clientes: Cliente[] = (result.data as any[]).map((item) => ({
            ...item,
            dataNascimento: item.dataNascimento && !isNaN(Date.parse(item.dataNascimento)) 
                ? new Date(item.dataNascimento) 
                : null,
            rendaAnual: item.rendaAnual && !isNaN(Number(item.rendaAnual)) 
                ? Number(item.rendaAnual) 
                : 0,
            patrimonio: item.patrimonio && !isNaN(Number(item.patrimonio)) 
                ? Number(item.patrimonio) 
                : 0,
            codigoAgencia: item.codigoAgencia && !isNaN(Number(item.codigoAgencia)) 
                ? Number(item.codigoAgencia) 
                : 0,
        }));

        return clientes;
    } catch (error) {
        console.error("Erro ao buscar ou processar clientes:", error);
        return []; // Retorna lista vazia quando há erro
    }
}
