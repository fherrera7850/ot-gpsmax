import React, { useState } from 'react';
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
import { format, isWithinInterval, parseISO } from 'date-fns';

const Combustible = () => {
  const [direcciones, setDirecciones] = useState([
    { id: 1, direccion: 'Calle 123, Santiago', distancia: '', fecha: '2024-10-10', gastoCombustible: 0 },
    { id: 2, direccion: 'Av. Libertador 456, Providencia', distancia: '', fecha: '2024-10-12', gastoCombustible: 0 },
    // Más direcciones...
  ]);
  const [valorDiesel, setValorDiesel] = useState('');
  const [rendimiento, setRendimiento] = useState('');
  const [gastoTotal, setGastoTotal] = useState(0);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [filtrado, setFiltrado] = useState(false); // Controlar si se ha filtrado

  const handleDistanciaChange = (id, value) => {
    const updatedDirecciones = direcciones.map((dir) =>
      dir.id === id ? { ...dir, distancia: value } : dir
    );
    setDirecciones(updatedDirecciones);
  };

  const calcularGastoCombustible = () => {
    const total = direcciones.reduce((total, dir) => {
      if (dir.distancia) {
        const kmIdaVuelta = parseFloat(dir.distancia) * 2;
        const litrosUsados = kmIdaVuelta / parseFloat(rendimiento);
        const costoServicio = litrosUsados * parseFloat(valorDiesel);
        
        // Actualizar el gasto de combustible por dirección
        dir.gastoCombustible = costoServicio;
        return total + costoServicio;
      }
      return total;
    }, 0);

    setGastoTotal(total);
    setDirecciones([...direcciones]); // Actualizar el estado de direcciones con los gastos por dirección
  };

  const filtrarDirecciones = () => {
    if (!fechaInicio || !fechaFin || !valorDiesel || !rendimiento) {
      alert('Por favor, completa todos los campos para filtrar');
      return;
    }
    
    const fechaInicioParsed = parseISO(fechaInicio);
    const fechaFinParsed = parseISO(fechaFin);

    const direccionesFiltradas = direcciones.filter((dir) =>
      isWithinInterval(parseISO(dir.fecha), { start: fechaInicioParsed, end: fechaFinParsed })
    );

    if (direccionesFiltradas.length === 0) {
      alert('No hay servicios en el rango de fechas seleccionado.');
    }

    setFiltrado(true); // Activar el filtrado
    setDirecciones(direccionesFiltradas); // Actualizar la lista con las direcciones filtradas
  };

  return (
    <Box p={6} maxWidth="800px" mx="auto" bg="white" borderRadius="lg" boxShadow="lg">
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Valor del Litro de Diésel (en pesos)</FormLabel>
          <Input
            type="number"
            value={valorDiesel}
            onChange={(e) => setValorDiesel(e.target.value)}
            placeholder="Ej: 1000"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Rendimiento del Vehículo (km por litro)</FormLabel>
          <Input
            type="number"
            value={rendimiento}
            onChange={(e) => setRendimiento(e.target.value)}
            placeholder="Ej: 10"
          />
        </FormControl>

        {/* Filtros de fecha */}
        <HStack spacing={4} width="full">
          <FormControl isRequired>
            <FormLabel>Fecha Inicio</FormLabel>
            <Input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Fecha Fin</FormLabel>
            <Input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </FormControl>

          <Button onClick={filtrarDirecciones} colorScheme="teal" alignSelf="flex-end">
            Filtrar
          </Button>
        </HStack>

        {/* Mostrar tabla de direcciones solo si ya se ha filtrado */}
        {filtrado && (
          <Table variant="striped" colorScheme="gray" mt={6}>
            <Thead>
              <Tr>
                <Th>Dirección</Th>
                <Th>Fecha</Th>
                <Th>Distancia (km)</Th>
                <Th>Gasto de Combustible</Th> {/* Nueva columna */}
              </Tr>
            </Thead>
            <Tbody>
              {direcciones.map((dir) => (
                <Tr key={dir.id}>
                  <Td>{dir.direccion}</Td>
                  <Td>{format(new Date(dir.fecha), 'dd-MM-yyyy')}</Td>
                  <Td>
                    <Input
                      type="number"
                      value={dir.distancia}
                      onChange={(e) => handleDistanciaChange(dir.id, e.target.value)}
                      placeholder="Distancia en km"
                    />
                  </Td>
                  <Td>
                    ${dir.gastoCombustible > 0 ? dir.gastoCombustible.toLocaleString('es-ES') : 'N/A'}
                  </Td> {/* Mostrar el gasto de combustible */}
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}

        {/* Botón para calcular el gasto en combustible */}
        {filtrado && (
          <Button colorScheme="teal" onClick={calcularGastoCombustible}>
            Calcular Gasto en Combustible
          </Button>
        )}

        {/* Mostrar el gasto total si se ha calculado */}
        {gastoTotal > 0 && (
          <Box mt={4}>
            <Text fontSize="xl" fontWeight="bold">
              Gasto total en combustible: ${gastoTotal.toLocaleString('es-ES')}
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default Combustible;
