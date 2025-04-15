import { jsx as _jsx } from "react/jsx-runtime";
// src/App.tsx
import ListaClientes from "./components/Clientes/listaClientes.jsx";
// import ClienteDetalhes from "./pages/ClienteDetalhes"; 
function App() {
    return (_jsx("div", { children: _jsx(ListaClientes, {}) }));
}
export default App;
