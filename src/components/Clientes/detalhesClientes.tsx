import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Cliente, Conta, Agencia } from "../../types/index.ts";
import { fetchClientes } from "../../services/Clientes.ts";
import { fetchContas } from "../../services/Contas.ts";
import { fetchAgencias } from "../../services/Agencias.ts";
import { ArrowLeft } from "lucide-react";
import { formatarCpfCnpj, getTipoDocumento } from "@/utils/utilitarios.ts";

const DetalhesCliente: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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
    <div className="mt-2 p-6 md:p-10 max-w-4xl mx-auto bg-white rounded-xl shadow-sm">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 text-blue-600 hover:underline text-sm cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
        {cliente.nome}
        <span className="text-sm text-gray-500">(ID: {cliente.id})</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {/* Coluna da esquerda */}
        <div className="space-y-2">
          <div className="grid gap-1">
            <strong className="text-sm">Nome Social:</strong>
            <div className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 text-sm">
              {cliente.nomeSocial || "Não informado"}
            </div>
          </div>
          <div className="grid gap-1">
            <strong className="text-sm">RG:</strong>
            <div className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 text-sm">
              {cliente.rg || "Não informado"}
            </div>
          </div>
          <div className="grid gap-1">
            <strong className="text-sm">{getTipoDocumento(cliente.cpfCnpj)}:</strong>
            <div className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 text-sm">
              {formatarCpfCnpj(cliente.cpfCnpj)}
            </div>
          </div>
          <div className="grid gap-1">
            <strong className="text-sm">Data de Nascimento:</strong>
            <div className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 text-sm">
              {cliente.dataNascimento?.toLocaleDateString()}
            </div>
          </div>
          <div className="grid gap-1">
            <strong className="text-sm">Endereço:</strong>
            <div className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 text-sm">
              {cliente.endereco}
            </div>
          </div>
        </div>

        {/* Coluna da direita */}
        <div className="space-y-2">
          <div className="grid gap-1">
            <strong className="text-sm">Patrimônio:</strong>
            <div className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 text-sm">
              {formatCurrency(cliente.patrimonio)}
            </div>
          </div>
          <div className="grid gap-1">
            <strong className="text-sm">Renda Anual:</strong>
            <div className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 text-sm">
              {formatCurrency(cliente.rendaAnual)}
            </div>
          </div>
          <div className="grid gap-1">
            <strong className="text-sm">Estado Civil:</strong>
            <div className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 text-sm">
              {cliente.estadoCivil}
            </div>
          </div>
          <div className="grid gap-1">
            <strong className="text-sm">E-mail:</strong>
            <div className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 text-sm">
              {cliente.email}
            </div>
          </div>
        </div>
      </div>



      <h2 className="text-2xl font-semibold mb-4">Agência</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-8 text-sm">
        <div><strong>Nome:</strong> {agencia?.nome} ({cliente.codigoAgencia})</div>
        <div><strong>Endereço da Agência:</strong> {agencia?.endereco}</div>
      </div>

      <h3 className="text-xl font-semibold mb-2">Contas</h3>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-left border border-gray-800 rounded-lg overflow-hidden">
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
