import React, { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Switch,
  Select,
  Button,
} from '@chakra-ui/react';

const Ots = () => {
  // Datos de ejemplo, puedes reemplazarlos con datos reales
  const [ordenes, setOrdenes] = useState([
    {
      id: 1,
      servicio: 'GPS',
      cliente: 'Juan Pérez',
      estadoOT: 'Recibido',
      transferidoOK: false,
    },
    {
      id: 2,
      servicio: 'Chip x12',
      cliente: 'Ana González',
      estadoOT: 'Realizado',
      transferidoOK: true,
    },
    // Más órdenes aquí
  ]);

  const handleTransferidoChange = (id, value) => {
    const updatedOrdenes = ordenes.map((orden) =>
      orden.id === id ? { ...orden, transferidoOK: value } : orden
    );
    setOrdenes(updatedOrdenes);
  };

  const handleEstadoChange = (id, value) => {
    const updatedOrdenes = ordenes.map((orden) =>
      orden.id === id ? { ...orden, estadoOT: value } : orden
    );
    setOrdenes(updatedOrdenes);
  };

  return (
    <Box p={6} maxWidth="800px" mx="auto" bg="white" borderRadius="lg" boxShadow="lg">
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Servicio</Th>
            <Th>Cliente</Th>
            <Th>Estado OT</Th>
            <Th>Transferido OK</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ordenes.map((orden) => (
            <Tr key={orden.id}>
              <Td>{orden.servicio}</Td>
              <Td>{orden.cliente}</Td>
              <Td>
                <Select
                  value={orden.estadoOT}
                  onChange={(e) => handleEstadoChange(orden.id, e.target.value)}
                >
                  <option value="Recibido">Recibido</option>
                  <option value="Realizado">Realizado</option>
                </Select>
              </Td>
              <Td>
                <Switch
                  isChecked={orden.transferidoOK}
                  onChange={(e) => handleTransferidoChange(orden.id, e.target.checked)}
                />
              </Td>
              <Td>
                <Button colorScheme="teal" size="sm">
                  Editar
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Ots;
