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
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import IngresarOT from './IngresarOT'; // Importamos el formulario de IngresarOT.js

const Ots = () => {
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

  const [selectedOrder, setSelectedOrder] = useState(null); // Para guardar la orden seleccionada
  const { isOpen, onOpen, onClose } = useDisclosure(); // Para manejar la apertura/cierre del modal
  const toast = useToast();

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
    <Box p={6} maxWidth="1000px" mx="auto" bg="white" borderRadius="lg" boxShadow="lg">
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
                <Button colorScheme="teal" size="sm" mr={2} onClick={() => handleEdit(orden)}>
                  Editar
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
                order={selectedOrder} // Pasamos la orden seleccionada
                onSave={handleSaveEdit} // Manejamos la actualización de la orden
                onClose={onClose} // Para cerrar el modal si se cancela
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
