import React, { useState, useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Heading, Text } from '@chakra-ui/react';
import { format, differenceInDays } from 'date-fns';
import { color } from 'framer-motion';

const Chips = () => {
  const [chips, setChips] = useState([
    {
      id: 1,
      nombreCliente: 'Juan Pérez',
      telefonoCliente: '+56912345678',
      correoCliente: 'juan.perez@example.com',
      numeroCliente: '12345',
      numeroChip: '123456',
      tipoChip: 'Chip x6',
      fechaServicio: '2024-02-15',
    },
    {
      id: 2,
      nombreCliente: 'Ana González',
      telefonoCliente: '+56998765432',
      correoCliente: 'ana.gonzalez@example.com',
      numeroCliente: '67890',
      numeroChip: '789012',
      tipoChip: 'Chip x12',
      fechaServicio: '2023-11-01',
    },
  ]);

  // Función para calcular la fecha de vencimiento de un chip
  const calcularFechaVencimiento = (tipoChip, fechaServicio) => {
    const meses = tipoChip === 'Chip x6' ? 6 : 12;
    const fecha = new Date(fechaServicio);
    fecha.setMonth(fecha.getMonth() + meses);
    return fecha;
  };

  // Calcular la cantidad de días restantes hasta la fecha de vencimiento
  const calcularDiasRestantes = (fechaVencimiento) => {
    const hoy = new Date();
    return differenceInDays(fechaVencimiento, hoy);
  };

  // Función para aplicar color según los días restantes
  const getColor = (diasRestantes) => {
    if (diasRestantes <= 5) return 'red.500';
    if (diasRestantes <= 10) return 'yellow.500';
    if (diasRestantes <= 15) return 'green.500';
    return 'black'; // Default para más de 15 días
  };

  // Ordenar los chips por fecha de vencimiento (del más próximo al más lejano)
  const chipsOrdenados = chips.sort((a, b) => {
    const vencimientoA = calcularFechaVencimiento(a.tipoChip, a.fechaServicio);
    const vencimientoB = calcularFechaVencimiento(b.tipoChip, b.fechaServicio);
    return vencimientoA - vencimientoB;
  });

  return (
    <Box overflowX="auto" p={6} maxWidth="auto" mx="auto" bg="white" borderRadius="lg" boxShadow="lg">
      <Heading as="h2" size="lg" mb={4}>
        Listado de Chips
      </Heading>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Número del Chip</Th>
            <Th>Días Restantes</Th>
            <Th>Fecha de Vencimiento</Th>
            <Th>Nombre Cliente</Th>
            <Th>Teléfono Cliente</Th>
            <Th>Correo Cliente</Th>
          </Tr>
        </Thead>
        <Tbody>
          {chipsOrdenados.map((chip) => {
            const fechaVencimiento = calcularFechaVencimiento(chip.tipoChip, chip.fechaServicio);
            const diasRestantes = calcularDiasRestantes(fechaVencimiento);

            return (
              <Tr key={chip.id}>
                <Td>{chip.numeroChip}</Td>
                <Td>
                  <Text color={getColor(diasRestantes)}>
                    {diasRestantes} días
                  </Text>
                </Td>
                <Td>{format(fechaVencimiento, 'dd/MM/yyyy')}</Td>
                <Td>{chip.nombreCliente}</Td>
                <Td>
                  <a href={`tel:${chip.telefonoCliente}`} style={{ color: '#0000EE' }}>
                    {chip.telefonoCliente}
                  </a>
                </Td>
                <Td>
                  <a href={`mailto:${chip.correoCliente}`} style={{ color: '#0000EE' }}>
                    {chip.correoCliente || 'N/A'}
                  </a>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Chips;
