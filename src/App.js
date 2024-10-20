import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // El drawer
import IngresarOT from './pages/IngresarOT'; // Página Ingresar OT
import Ots from './pages/Ots'; // Página Ots
import Chips from './pages/Chips'; // Página Chips
import Gastos from './pages/Gastos'; // Página Gastos
import Combustible from './pages/Combustible'; // Página Combustible
import Balance from './pages/Balance'; // Página Balance
import Login from './pages/Login'; // Página Login
import { Box } from '@chakra-ui/react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para manejar la autenticación

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Función para establecer el estado de autenticación
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Al cerrar sesión, cambiamos el estado a no autenticado
  };

  return (
    <Router>
      {isAuthenticated && <Sidebar onLogout={handleLogout} />}
      <Box p={4}>
        <Routes>
          {/* Ruta de inicio de sesión */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/ots" /> // Si ya está autenticado, redirigir al dashboard
              ) : (
                <Login onLoginSuccess={handleLoginSuccess} /> // Pasar función de éxito de login
              )
            }
          />

          {/* Rutas protegidas */}
          <Route
            path="/ingresar-ot"
            element={
              isAuthenticated ? (
                <IngresarOT />
              ) : (
                <Navigate to="/login" /> // Redirigir al login si no está autenticado
              )
            }
          />
          <Route
            path="/ots"
            element={
              isAuthenticated ? (
                <Ots />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/chips"
            element={
              isAuthenticated ? (
                <Chips />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/gastos"
            element={
              isAuthenticated ? (
                <Gastos />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/combustible"
            element={
              isAuthenticated ? (
                <Combustible />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/balance"
            element={
              isAuthenticated ? (
                <Balance />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Redirigir a la página de login si la ruta no coincide */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
