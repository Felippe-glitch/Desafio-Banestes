import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Cliente, Conta, Agencia } from "../../types/index.ts";
import { fetchClientes } from "../../services/Clientes.ts";
import { fetchContas } from "../../services/Contas.ts";
import { fetchAgencias } from "../../services/Agencias.ts";
import { ArrowLeft } from "lucide-react";
import { formatarCpfCnpj, getTipoDocumento } from "@/utils/utilitarios.ts";

const DetalhesCliente: React.FC = () => {
  // Obtém o ID do cliente a partir da URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Estados locais para armazenar os dados do cliente, suas contas e sua agência
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [contas, setContas] = useState<Conta[]>([]);
  const [agencia, setAgencia] = useState<Agencia | null>(null);

  // Efeito para carregar os dados assim que o componente for montado
  useEffect(() => {
    async function carregarDados() {
      // Busca os clientes e seleciona o que tem o ID atual
      const clientes = await fetchClientes();
      const clienteSelecionado = clientes.find(c => c.id === id);
      setCliente(clienteSelecionado ?? null);

      if (clienteSelecionado) {
        // Busca todas as contas e filtra as do cliente atual
        const contasTodas = await fetchContas();
        const contasCliente = contasTodas.filter(
          conta => conta.cpfCnpjCliente === clienteSelecionado.cpfCnpj
        );
        setContas(contasCliente);

        // Busca as agências e seleciona a correspondente ao cliente
        const agencias = await fetchAgencias();
        const agenciaRelacionada = agencias.find(
          ag => ag.codigo === clienteSelecionado.codigoAgencia
        );
        setAgencia(agenciaRelacionada ?? null);
      }
    }

    carregarDados();
  }, [id]);

   // Formata valores monetários para o padrão brasileiro — ou manda um "não informado"
  const formatoCorreto = (value: number | undefined | null) => {
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

        <div className="space-y-2">
          <div className="grid gap-1">
            <strong className="text-sm">Patrimônio:</strong>
            <div className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 text-sm">
              {formatoCorreto(cliente.patrimonio)}
            </div>
          </div>
          <div className="grid gap-1">
            <strong className="text-sm">Renda Anual:</strong>
            <div className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 text-sm">
              {formatoCorreto(cliente.rendaAnual)}
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
        <div className="grid gap-1">
          <strong className="text-sm">Nome:</strong>
          <div className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 text-sm">
            {agencia?.nome} ({cliente.codigoAgencia})
          </div>
        </div>
        <div className="grid gap-1">
          <strong className="text-sm">Endereço:</strong>
          <div className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 text-sm">
          {agencia?.endereco}
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-2">Contas</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-center border border-gray-800 rounded-lg overflow-hidden text-sm border-spacing-x-4">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="px-2 py-2 w-1/4">Tipo</th>
              <th className="px-2 py-2 w-1/4">Saldo</th>
              <th className="px-2 py-2 w-1/4">Limite</th>
              <th className="px-2 py-2 w-1/4">Crédito Disponível</th>
            </tr>
          </thead>
          <tbody>
            {contas.map((conta) => (
              <tr key={conta.id} className="border-t">
                <td className="px-2 py-2 whitespace-nowrap">{capitalize(conta.tipo)}</td>
                <td className="px-2 py-2 whitespace-nowrap">{formatoCorreto(conta.saldo)}</td>
                <td className="px-2 py-2 whitespace-nowrap">{formatoCorreto(conta.limiteCredito)}</td>
                <td className="px-2 py-2 whitespace-nowrap">{formatoCorreto(conta.creditoDisponivel)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetalhesCliente;
