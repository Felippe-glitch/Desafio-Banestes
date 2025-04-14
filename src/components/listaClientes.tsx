import React, { useEffect, useState } from "react";
import { fetchClientes } from "../services/Clientes";
import { Cliente } from "../types";
import { Table, TableBody, TableCell, TableHead, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const ListaClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  useEffect(() => {
    async function carregarClientes() {
      const dados = await fetchClientes();
      setClientes(dados);
    }

    carregarClientes();
  }, []);

  const totalPaginas = Math.ceil(clientes.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;
  const clientesPaginados = clientes.slice(indiceInicial, indiceFinal);

  const irParaPaginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  const irParaProximaPagina = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  return (
    <div className="p-6 w-full max-w-4xl mx-auto">
      <form className="flex items-center gap-2 m-3">
        <Input name="nomeOUCPF" placeholder="Nome ou CPF" />
      </form>

      <div className="border rounded-lg p-4">
        {clientes.length === 0 ? (
          <p>Carregando clientes...</p>
        ) : (
          <>
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>CPF/CNPJ</th>
                  <th>RG</th>
                </tr>
              </thead>
              <tbody>
                {clientesPaginados.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.cpfCnpj}</td>
                    <td>{cliente.rg}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Paginação */}
            <div className="flex justify-between items-center mt-4">
              <Button onClick={irParaPaginaAnterior} disabled={paginaAtual === 1}>
                Anterior
              </Button>
              <span>
                Página {paginaAtual} de {totalPaginas}
              </span>
              <Button onClick={irParaProximaPagina} disabled={paginaAtual === totalPaginas}>
                Próxima
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListaClientes;
