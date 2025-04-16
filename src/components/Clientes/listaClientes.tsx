import React, { useEffect, useState } from "react";
import { fetchClientes } from "../../services/Clientes.ts";
import { Cliente } from "../../types/index.ts";
import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const ListaClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [termoBusca, setTermoBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  useEffect(() => {
    async function carregarClientes() {
      const dados = await fetchClientes();
      const dadosOrdenados = dados.sort((a, b) => a.nome.localeCompare(b.nome));
      setClientes(dadosOrdenados);
    }

    carregarClientes();
  }, []);

  const clientesFiltrados = clientes.filter((cliente) => {
    const termo = termoBusca.toLowerCase();
    return (
      cliente.nome.toLowerCase().includes(termo) ||
      cliente.cpfCnpj.toLowerCase().includes(termo) ||
      (cliente.nomeSocial || "").toLowerCase().includes(termo)
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
    <div className="p-6 w-full max-w-7xl mx-auto">
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
            <div className="hidden md:block">
              <table className="w-full border-collapse text-sm hidden md:table">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="px-4 py-2 text-left">Nome</th>
                    <th className="px-4 py-2 text-left">Nome Social</th>
                    <th className="px-4 py-2 text-left">CPF/CNPJ</th>
                    <th className="px-4 py-2 text-left">E-mail</th>
                    <th className="px-4 py-2 text-left">Agência</th>
                  </tr>
                </thead>
                <tbody>
                  {clientesPaginados.map((cliente) => (
                    <tr key={cliente.id} className="odd:bg-gray-50 hover:bg-gray-100">
                      <td className="px-4 py-3">{cliente.nome}</td>
                      <td className="px-4 py-3">{cliente.nomeSocial}</td>
                      <td className="px-4 py-3">{cliente.cpfCnpj}</td>
                      <td className="px-4 py-3">{cliente.email}</td>
                      <td className="px-4 py-3">{cliente.codigoAgencia}</td>
                      <td className="px-4 py-3 text-blue-600 hover:underline">
                        <Link to={`/clientes/${cliente.id}`}>Ver detalhes</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* TABELA MOBILE */}
            <div className="block md:hidden">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="px-2 py-2 text-left">Nome</th>
                    <th className="px-2 py-2 text-left">Nome Social</th>
                    <th className="px-2 py-2 text-left">CPF/CNPJ</th>
                  </tr>
                </thead>
                <tbody>
                  {clientesPaginados.map((cliente) => (
                    <tr
                      key={cliente.id}
                      onClick={() => (window.location.href = `/clientes/${cliente.id}`)}
                      className="odd:bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      <td className="px-2 py-3 break-words">{cliente.nome}</td>
                      <td className="px-2 py-3 break-words">{cliente.nomeSocial}</td>
                      <td className="px-2 py-3 text-center">{cliente.cpfCnpj}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


            <div className="flex justify-between items-center mt-6 px-2">
              <Button onClick={irParaPaginaAnterior} disabled={paginaAtual === 1} className="cursor-pointer">
                <span className="noneSelect">Anterior</span>
              </Button>

              <span className="text-sm text-gray-600">
                <span className="noneSelect">Página {paginaAtual} de {totalPaginas}</span>
              </span>

              <Button onClick={irParaProximaPagina} disabled={paginaAtual === totalPaginas} className="cursor-pointer">
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
