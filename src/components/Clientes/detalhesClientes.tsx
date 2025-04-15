import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Cliente, Conta, Agencia } from "../../types/index.ts";
import { fetchClientes } from "../../services/Clientes.ts";
import { fetchContas } from "../../services/Contas.ts";
import { fetchAgencias } from "../../services/Agencias.ts";

const DetalhesCliente: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [contas, setContas] = useState<Conta[]>([]);
  const [agencia, setAgencia] = useState<Agencia | null>(null);

  useEffect(() => {
    async function carregarDados() {
      const clientes = await fetchClientes();
      const clienteSelecionado = clientes.find(c => c.id === id);
      setCliente(clienteSelecionado ?? null);

      if (clienteSelecionado) {
        const contasTodas = await fetchContas();
        const contasCliente = contasTodas.filter(
          conta => conta.cpfCnpjCliente === clienteSelecionado.cpfCnpj
        );
        setContas(contasCliente);

        const agencias = await fetchAgencias();
        const agenciaRelacionada = agencias.find(
          ag => ag.codigo === clienteSelecionado.codigoAgencia
        );
        setAgencia(agenciaRelacionada ?? null);
      }
    }

    carregarDados();
  }, [id]);

  if (!cliente) return <p>Carregando detalhes do cliente...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Detalhes do Cliente</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div><strong>Nome:</strong> {cliente.nome}</div>
        <div><strong>Nome Social:</strong> {cliente.nomeSocial}</div>
        <div><strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}</div>
        <div><strong>E-mail:</strong> {cliente.email}</div>
        <div><strong>Agência:</strong> {agencia?.nome} ({cliente.codigoAgencia})</div>
        <div><strong>Endereço da Agência:</strong> {agencia?.endereco}</div>
      </div>

      <h3 className="text-xl font-semibold mb-2">Contas</h3>
      <table className="w-full text-left border mt-2">
        <thead>
          <tr className="border-b">
            <th className="p-2">Tipo</th>
            <th className="p-2">Saldo</th>
            <th className="p-2">Limite</th>
            <th className="p-2">Crédito Disponível</th>
          </tr>
        </thead>
        <tbody>
          {contas.map((conta) => (
            <tr key={conta.id} className="border-b">
              <td className="p-2">{conta.tipo}</td>
              <td className="p-2">R$ {conta.saldo.toFixed(2)}</td>
              <td className="p-2">R$ {conta.limiteCredito.toFixed(2)}</td>
              <td className="p-2">R$ {conta.creditoDisponivel.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetalhesCliente;