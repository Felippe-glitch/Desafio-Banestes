import React, { useEffect, useState } from "react";
import { fetchClientes } from "../../services/Clientes";
import { Cliente } from "../../types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search } from 'lucide-react'

const ListaClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [termoBusca, setTermoBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  useEffect(() => {
    async function carregarClientes() {
      const dados = await fetchClientes();
      setClientes(dados);
    }

    carregarClientes();
  }, []);

  const clientesFiltrados = clientes.filter((cliente) => {
    const termo = termoBusca.toLowerCase();
    return (
      cliente.nome.toLowerCase().includes(termo) ||
      cliente.cpfCnpj.toLowerCase().includes(termo)
    );
  });

  const totalPaginas = Math.ceil(clientesFiltrados.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;
  const clientesPaginados = clientesFiltrados.slice(indiceInicial, indiceFinal);

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
      <form
        className="flex items-center gap-2 m-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            name="nomeOUCPF"
            placeholder="Nome ou CPF"
            value={termoBusca}
            onChange={(e) => {
              setTermoBusca(e.target.value);
              setPaginaAtual(1);
            }}
            className="pl-10"
          />
        </div>
      </form>

      <div className="border rounded-lg p-4">
        {clientes.length === 0 ? (
          <p>Carregando clientes...</p>
        ) : (
          <>
            <table className="w-full table-auto text-center" >
              <thead>
                <tr>
                  <th className="text-center">Nome</th>
                  <th className="text-center">Nome Social</th>
                  <th className="text-center">CPF OU CNPJ</th>
                  <th className="text-center">E-mail</th>
                  <th className="text-center">Código da Agência</th>
                </tr>
              </thead>
              <tbody>
                {clientesPaginados.map((cliente) => (
                  <tr key={cliente.id}>
                    <td className="text-center">{cliente.nome}</td>
                    <td className="text-center">{cliente.nomeSocial}</td>
                    <td className="text-center">{cliente.cpfCnpj}</td>
                    <td className="text-center">{cliente.email}</td>
                    <td className="text-center">{cliente.codigoAgencia}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
              <Button onClick={irParaPaginaAnterior} disabled={paginaAtual === 1} className="mousePointer">
                <span className="noneSelect">Próxima</span>
              </Button>
              <span className="noneSelect">
                Página {paginaAtual} de {totalPaginas}
              </span>
              <Button
                onClick={irParaProximaPagina}
                disabled={paginaAtual === totalPaginas}
                className="mousePointer"
              >
                <span className="noneSelect">Próxima</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListaClientes;
