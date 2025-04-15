// src/App.tsx
import ListaClientes from "./components/Clientes/listaClientes.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ClienteDetalhes from "./pages/ClienteDetalhes"; 

function App() {
  return (
    <div>
      <ListaClientes/>
    </div>
  );
}

export default App;
