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

  const formatCurrency = (value: number | undefined | null) => {
    if (typeof value !== "number" || isNaN(value)) return "Não informado";
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const capitalize = (text: string) => {
    if (!text) return "";
    if (text.toLowerCase() === "poupanca") return "Poupança";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };
  if (!cliente) return <p>Carregando detalhes do cliente...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6">{cliente.nome}</h1>

      <div className="grid md:grid-cols-2 gap-4 mb-8 text-sm">
        <div><strong>Nome Social:</strong> {cliente.nomeSocial || "Não informado"}</div>
        <div><strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}</div>
        <div><strong>E-mail:</strong> {cliente.email}</div>
        <div><strong>RG:</strong> {cliente.rg}</div>
        <div><strong>Data de Nascimento:</strong> {cliente.dataNascimento?.toLocaleDateString()}</div>
        <div><strong>Renda Anual:</strong> {formatCurrency(cliente.rendaAnual)}</div>
        <div><strong>Patrimônio:</strong> {formatCurrency(cliente.patrimonio)}</div>
        <div><strong>Estado Civil:</strong> {cliente.estadoCivil}</div>
        <div><strong>Agência:</strong> {agencia?.nome} ({cliente.codigoAgencia})</div>
        <div><strong>Endereço da Agência:</strong> {agencia?.endereco}</div>
      </div>

      <h3 className="text-xl font-semibold mb-2">Contas</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-3">Tipo</th>
              <th className="p-3">Saldo</th>
              <th className="p-3">Limite</th>
              <th className="p-3">Crédito Disponível</th>
            </tr>
          </thead>
          <tbody>
            {contas.map((conta) => (
              <tr key={conta.id} className="border-t">
                <td className="p-3">{capitalize(conta.tipo)}</td>
                <td className="p-3">{formatCurrency(conta.saldo)}</td>
                <td className="p-3">{formatCurrency(conta.limiteCredito)}</td>
                <td className="p-3">{formatCurrency(conta.creditoDisponivel)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetalhesCliente;
