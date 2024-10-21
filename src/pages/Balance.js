import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
} from '@chakra-ui/react';
import { separadorDeMiles } from '../utils/formatters';

const Balance = () => {
  // Productos sobrantes en stock
  const [productosSobrantes, setProductosSobrantes] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', cantidad: '', precioUnitario: '' });

  // Servicios instalados por producto (5 servicios predeterminados)
  const [serviciosInstalados, setServiciosInstalados] = useState([
    { producto: 'GPS Coban 403', cantidad: 2, precio: 150000 },
    { producto: 'GPS Coban 405', cantidad: 1, precio: 200000 },
    { producto: 'GPS R12L', cantidad: 2, precio: 180000 },
  ]);

  // Datos financieros
  const [totalVentas, setTotalVentas] = useState(0); // Sumatoria total de ventas en pesos
  const [totalGastos, setTotalGastos] = useState(300000); // Total de gastos predefinido
  const [gastoCombustible, setGastoCombustible] = useState(50000); // Gasto total de combustible predefinido

  useEffect(() => {
    // Calcular total de ventas al iniciar (basado en los servicios instalados)
    const total = serviciosInstalados.reduce((sum, servicio) => sum + servicio.cantidad * servicio.precio, 0);
    setTotalVentas(total);
  }, [serviciosInstalados]);

  // Calcular la valoración total de los productos sobrantes
  const calcularValoracionTotal = () => {
    return productosSobrantes.reduce((total, producto) => total + producto.cantidad * producto.precioUnitario, 0);
  };

  const handleAgregarProductoSobrante = () => {
    setProductosSobrantes([
      ...productosSobrantes,
      { ...nuevoProducto, cantidad: parseInt(nuevoProducto.cantidad, 10), precioUnitario: parseFloat(nuevoProducto.precioUnitario) }
    ]);
    setNuevoProducto({ nombre: '', cantidad: '', precioUnitario: '' });
  };

  const calcularBalance = () => {
    const totalValoracionSobrantes = calcularValoracionTotal();
    const balance = totalVentas - totalGastos;
    const balanceContable = totalVentas - totalGastos + totalValoracionSobrantes;

    return { balance, balanceContable, totalValoracionSobrantes };
  };

  const { balance, balanceContable, totalValoracionSobrantes } = calcularBalance();

  return (
    <Box p={6} maxWidth="1200px" mx="auto" bg="white" borderRadius="lg" boxShadow="lg">
      <VStack spacing={6}>
        {/* Sección de Productos Sobrantes */}
        <Box width="full">
          <Text fontSize="xl" fontWeight="bold" mb={4}>Productos Sobrantes en Stock</Text>
          <HStack spacing={4} mb={4}>
            <Input
              placeholder="Producto"
              value={nuevoProducto.nombre}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Cantidad"
              value={nuevoProducto.cantidad}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, cantidad: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Precio Unitario"
              value={separadorDeMiles(nuevoProducto.precioUnitario)}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, precioUnitario: e.target.value.replace(/\D/g, '') })}
            />
            <Button colorScheme="teal" onClick={handleAgregarProductoSobrante} minWidth={"auto"}>Agregar</Button>
          </HStack>

          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Producto</Th>
                <Th>Cantidad</Th>
                <Th>Precio Unitario</Th>
                <Th>Valoración Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {productosSobrantes.map((producto, index) => (
                <Tr key={index}>
                  <Td>{producto.nombre}</Td>
                  <Td>{producto.cantidad}</Td>
                  <Td>${producto.precioUnitario.toLocaleString('es-ES')}</Td>
                  <Td>${(producto.cantidad * producto.precioUnitario).toLocaleString('es-ES')}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* Sección de Servicios Instalados */}
        <Box width="full">
          <Text fontSize="xl" fontWeight="bold" mb={4}>Cantidad de Servicios Instalados por Producto</Text>
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Producto</Th>
                <Th>Cantidad Instalados</Th>
                <Th>Precio Unitario</Th>
                <Th>Venta Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {serviciosInstalados.map((servicio, index) => (
                <Tr key={index}>
                  <Td>{servicio.producto}</Td>
                  <Td>{servicio.cantidad}</Td>
                  <Td>${servicio.precio.toLocaleString('es-ES')}</Td>
                  <Td>${(servicio.cantidad * servicio.precio).toLocaleString('es-ES')}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* Sección de Balance y Resumen */}
        <Box width="full" mt={6}>
          <Text fontSize="xl" fontWeight="bold" mb={4}>Resumen del Balance</Text>
          <VStack spacing={4} align="start">
            <Text>Total de Ventas: ${totalVentas.toLocaleString('es-ES')}</Text>
            <Text>Total de Gastos: ${totalGastos.toLocaleString('es-ES')}</Text>
            <Text>Gasto Total de Combustible: ${gastoCombustible.toLocaleString('es-ES')}</Text>
            <Text>Gasto Menos Sobrantes: ${(totalGastos - totalValoracionSobrantes).toLocaleString('es-ES')}</Text>
            <Text>Balance (Ventas - Gastos): ${balance.toLocaleString('es-ES')}</Text>
            <Text>Balance Contable (Ventas - Gastos - Sobrantes): ${balanceContable.toLocaleString('es-ES')}</Text>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Balance;
