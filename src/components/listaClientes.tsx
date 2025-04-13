// src/components/ListaClientes.tsx
import React, { useEffect, useState } from "react";
import { fetchClientes } from "../services/Clientes";
import { Cliente } from "../types";
import { Table, TableBody, TableCell, TableHead, TableRow} from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";


const ListaClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    async function carregarClientes() {
      const dados = await fetchClientes();
      setClientes(dados);
    }

    carregarClientes();
  }, []);

  return (
    <div className="p-6 w-full max-w-4xl mx-auto">
      <div className="border rounded">
        {clientes.length === 0 ? (
          <p>Carregando clientes...</p>
        ) : (
          <table className="w-full max-w-4xl mx-auto table-auto">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>CPF/CNPJ</th>
                  <th>RG</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.cpfCnpj}</td>
                  <td>{cliente.rg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ListaClientes;
