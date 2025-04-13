// src/components/ListaClientes.tsx
import React, { useEffect, useState } from "react";
import { fetchClientes } from "../services/Clientes";
import { Cliente } from "../types";

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
    <div>
      <h1>Lista de Clientes</h1>
      {clientes.length === 0 ? (
        <p>Carregando clientes...</p>
      ) : (
        <table border={1}>
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
  );
};

export default ListaClientes;
