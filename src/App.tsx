import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListaClientes from "./components/Clientes/listaClientes.tsx";
import DetalhesCliente from "./components/Clientes/detalhesClientes.tsx";
import logo from './components/images/logo_banestes_fundo_azul.jpg';

function App() {
  return (
    <BrowserRouter>
      <header className="header">
        <img src={logo} alt="Logo do Banestes" className="logo" />
      </header>
      <Routes>
        <Route path="/" element={<ListaClientes />} />
        <Route path="/clientes/:id" element={<DetalhesCliente />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
