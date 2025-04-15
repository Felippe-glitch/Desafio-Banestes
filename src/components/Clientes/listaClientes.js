import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { fetchClientes } from "../../services/Clientes";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search } from 'lucide-react';
const ListaClientes = () => {
    const [clientes, setClientes] = useState([]);
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
        return (cliente.nome.toLowerCase().includes(termo) ||
            cliente.cpfCnpj.toLowerCase().includes(termo) ||
            (cliente.nomeSocial || "").toLowerCase().includes(termo));
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
    return (_jsxs("div", { className: "p-6 w-full max-w-7xl mx-auto", children: [_jsx("form", { className: "flex items-center gap-2 m-3", onSubmit: (e) => e.preventDefault(), children: _jsxs("div", { className: "relative w-full max-w-sm", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" }), _jsx(Input, { name: "nomeOUCPF", placeholder: "Nome ou CPF", value: termoBusca, onChange: (e) => {
                                setTermoBusca(e.target.value);
                                setPaginaAtual(1);
                            }, className: "pl-10" })] }) }), _jsx("div", { className: "border rounded-lg p-4", children: clientes.length === 0 ? (_jsx("p", { children: "Carregando clientes..." })) : (_jsxs(_Fragment, { children: [_jsxs("table", { className: "w-full table-auto border-collapse", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-100 text-gray-700", children: [_jsx("th", { className: "px-4 py-2 text-center", children: "Nome" }), _jsx("th", { className: "px-4 py-2 text-center", children: "Nome Social" }), _jsx("th", { className: "px-4 py-2 text-center", children: "CPF OU CNPJ" }), _jsx("th", { className: "px-4 py-2 text-center", children: "E-mail" }), _jsx("th", { className: "px-4 py-2 text-center", children: "C\u00F3digo da Ag\u00EAncia" })] }) }), _jsx("tbody", { children: clientesPaginados.map((cliente, index) => (_jsxs("tr", { className: "odd:bg-gray-50 hover:bg-gray-100", children: [_jsx("td", { className: "px-4 py-4", children: cliente.nome }), _jsx("td", { className: "px-4 py-4", children: cliente.nomeSocial }), _jsx("td", { className: "px-4 py-4 text-center", children: cliente.cpfCnpj }), _jsx("td", { className: "px-4 py-4 text-center", children: cliente.email }), _jsx("td", { className: "px-4 py-4 text-center", children: cliente.codigoAgencia }), _jsx("td", { className: "px-4 py-4 text-blue-600 hover:underline cursor-pointer", children: _jsx("a", { href: "#", children: "Ver detalhes" }) })] }, cliente.id))) })] }), _jsxs("div", { className: "flex justify-between items-center mt-6 px-2", children: [_jsx(Button, { onClick: irParaPaginaAnterior, disabled: paginaAtual === 1, className: "cursor-pointer", children: _jsx("span", { className: "noneSelect", children: "Anterior" }) }), _jsx("span", { className: "text-sm text-gray-600", children: _jsxs("span", { className: "noneSelect", children: ["P\u00E1gina ", paginaAtual, " de ", totalPaginas] }) }), _jsx(Button, { onClick: irParaProximaPagina, disabled: paginaAtual === totalPaginas, className: "cursor-pointer", children: _jsx("span", { className: "noneSelect", children: "Pr\u00F3xima" }) })] })] })) })] }));
};
export default ListaClientes;
