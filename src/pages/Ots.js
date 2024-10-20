import React, { useState, useEffect } from 'react';
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
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useToast,
  Text,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import IngresarOT from './IngresarOT'; // Importamos el formulario de IngresarOT.js
import { isToday, isThisWeek, isThisMonth, parse, subMonths, isAfter, format } from 'date-fns';

const Ots = () => {
  const [ordenes, setOrdenes] = useState([
    {
      id: 1,
      servicio: 'GPS',
      cliente: 'Juan Pérez',
      estadoOT: 'Recibido',
      transferidoOK: false,
      fecha: '2024-10-04',
      precio: 150000,  // Agregamos precio
      vehiculo: 'Toyota Corolla 2022',  // Concatenamos marca, modelo y año
      comuna: 'Santiago',  // Comuna
    },
    {
      id: 2,
      servicio: 'Chip x12',
      cliente: 'Ana González',
      estadoOT: 'Realizado',
      transferidoOK: true,
      fecha: '2024-10-20',
      precio: 200000,  // Agregamos precio
      vehiculo: 'Suzuki Swift 2021',  // Concatenamos marca, modelo y año
      comuna: 'Providencia',  // Comuna
    },
    // Más órdenes aquí
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null); // Para guardar la orden seleccionada
  const [filter, setFilter] = useState('Mes'); // Filtro por defecto: Este mes
  const { isOpen, onOpen, onClose } = useDisclosure(); // Para manejar la apertura/cierre del modal
  const toast = useToast();

  // Filtrar órdenes según la selección del usuario
  const filtrarOrdenes = () => {
    const hoy = new Date();
  
    switch (filter) {
      case 'Hoy':
        return ordenes.filter(orden => 
          isToday(parse(orden.fecha, 'yyyy-MM-dd', new Date())) // Usar parse para interpretar correctamente la fecha
        );
      case 'Semana':
        return ordenes.filter(orden => 
          isThisWeek(parse(orden.fecha, 'yyyy-MM-dd', new Date()), { weekStartsOn: 1 }) // Parsear la fecha y usar isThisWeek
        );
      case 'Mes':
        return ordenes.filter(orden => 
          isThisMonth(parse(orden.fecha, 'yyyy-MM-dd', new Date())) // Parsear la fecha y usar isThisMonth
        );
      case '6 Meses':
        return ordenes.filter(orden => 
          isAfter(parse(orden.fecha, 'yyyy-MM-dd', new Date()), subMonths(hoy, 6)) // Parsear la fecha y verificar con isAfter
        );
      default:
        return ordenes;
    }
  };

  const ordenesFiltradas = filtrarOrdenes(); // Ordenes filtradas según el filtro seleccionado
  const sumatoriaVentas = ordenesFiltradas.reduce((acc, orden) => acc + orden.precio, 0);

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

  const handleDelete = (id) => {
    const updatedOrdenes = ordenes.filter((orden) => orden.id !== id);
    setOrdenes(updatedOrdenes);
    toast({
      title: 'Orden eliminada',
      description: `La orden con ID ${id} ha sido eliminada.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleEdit = (orden) => {
    setSelectedOrder(orden); // Selecciona la orden a editar
    onOpen(); // Abre el modal
  };

  const handleSaveEdit = (updatedOrder) => {
    const updatedOrdenes = ordenes.map((orden) =>
      orden.id === updatedOrder.id ? updatedOrder : orden
    );
    setOrdenes(updatedOrdenes);
    onClose(); // Cierra el modal
    toast({
      title: 'Orden actualizada',
      description: `La orden con ID ${updatedOrder.id} ha sido actualizada.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box overflowX="auto" p={6} maxWidth="auto" mx="auto" bg="white" borderRadius="lg" boxShadow="lg">
      
      {/* Select para elegir el filtro de fechas */}
      <Select value={filter} onChange={(e) => setFilter(e.target.value)} mb={4} maxWidth={300}>
        <option value="Hoy">Hoy</option>
        <option value="Semana">Esta Semana</option>
        <option value="Mes">Este Mes</option>
        <option value="6 Meses">Últimos 6 Meses</option>
      </Select>

      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Box fontSize="lg" flexDirection={'row'}>
          <Text fontWeight="bold" >Total Ventas: </Text>
          <Text>${sumatoriaVentas.toLocaleString('es-ES')}</Text>
        </Box>
      </Box>


      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Servicio</Th>
            <Th>Fecha</Th>
            <Th>Cliente</Th>
            <Th>Vehículo</Th>
            <Th>Comuna</Th>
            <Th>Precio</Th>
            <Th>Estado OT</Th>
            <Th>Transferido OK</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ordenesFiltradas.map((orden) => (
            <Tr key={orden.id}>
              <Td>{orden.servicio}</Td>
              <Td>{format(parse(orden.fecha, 'yyyy-MM-dd', new Date()), 'dd-MM-yyyy')}</Td>
              <Td>{orden.cliente}</Td>
              <Td>{orden.vehiculo}</Td>
              <Td>{orden.comuna}</Td>
              <Td>${orden.precio.toLocaleString('es-ES')}</Td>
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
                <Button colorScheme="teal" size="sm" mr={2} onClick={() => handleEdit(orden)}>
                  Ver / Editar
                </Button>
                <IconButton
                  aria-label="Eliminar orden"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDelete(orden.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal para editar la orden */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Orden de Trabajo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedOrder && (
              <IngresarOT
                order={selectedOrder}
                onSave={handleSaveEdit}
                onClose={onClose}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Ots;
