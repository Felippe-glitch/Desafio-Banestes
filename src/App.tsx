import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListaClientes from "./components/Clientes/listaClientes.tsx";
import DetalhesCliente from "./components/Clientes/detalhesClientes.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListaClientes />} />
        <Route path="/clientes/:id" element={<DetalhesCliente />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
