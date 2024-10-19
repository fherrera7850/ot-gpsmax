import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // El drawer
import IngresarOT from './pages/IngresarOT'; // Página Ingresar OT
import Ots from './pages/Ots'; // Página Ots
import Chips from './pages/Chips'; // Página Chips
import Gastos from './pages/Gastos'; // Página Gastos
import Combustible from './pages/Combustible'; // Página Combustible
import Balance from './pages/Balance'; // Página Balance
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <Router>
      <Sidebar /> {/* El drawer estará visible en todas las rutas */}
      <Box ml="200px" p={4}>
        <Routes>
          <Route path="/" element={<Navigate to="/ots" />} />
          <Route path="/ingresar-ot" element={<IngresarOT />} />
          <Route path="/ots" element={<Ots />} />
          <Route path="/chips" element={<Chips />} />
          <Route path="/gastos" element={<Gastos />} />
          <Route path="/combustible" element={<Combustible />} />
          <Route path="/balance" element={<Balance />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
