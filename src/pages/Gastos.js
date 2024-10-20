import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, CloseIcon } from '@chakra-ui/icons';
import { format, isToday, isThisWeek, isThisMonth, isAfter, subMonths } from 'date-fns';
import { separadorDeMiles } from '../utils/formatters';

const RegistroGastos = () => {
  const [glosa, setGlosa] = useState('');
  const [categoria, setCategoria] = useState('');
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', cantidad: 1, valor: '' });
  const [costo, setCosto] = useState('');
  const [gastos, setGastos] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Para manejar la edición de gastos
  const [idGasto, setIdGasto] = useState(1); // ID incremental para cada gasto
  const [filter, setFilter] = useState('Mes'); // Filtro por defecto: Este Mes

  const categorias = ['productos', 'implementos', 'remuneracion', 'combustible', 'publicidad'];
  const opcionesProductos = ['GPS Coban 403', 'GPS Coban 405', 'GPS R12L'];

  const handleAgregarProducto = () => {
    setProductos([
      ...productos,
      { ...nuevoProducto, valor: parseInt(nuevoProducto.valor, 10) }
    ]);
    setNuevoProducto({ nombre: '', cantidad: 1, valor: '' });
  };
  
  
  

  const handleQuitarProducto = (index) => {
    const updatedProductos = productos.filter((_, i) => i !== index);
    setProductos(updatedProductos);
  };

  const handleCostoChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
    setCosto(rawValue);
  };

  const calcularCostoProductos = () => {
    return productos.reduce(
      (total, producto) => total + producto.cantidad * producto.valor,
      0
    );
  };
  

  const handleSubmit = () => {
    if (!glosa || !categoria || (categoria !== 'productos' && !costo)) {
      alert('Por favor, completa todos los campos obligatorios (Glosa, Categoría, Costo).');
      return;
    }
  
    const nuevoGasto = {
      id: editIndex !== null ? gastos[editIndex].id : idGasto, // ID para edición o creación
      fecha: new Date(), // Fecha del registro
      glosa,
      categoria,
      productos: categoria === 'productos' ? productos : [],
      costo: categoria === 'productos'
        ? calcularCostoProductos()
        : parseInt(costo.toString().replace(/\D/g, ''), 10), // Convertir a string antes de usar replace
    };
  
    if (editIndex !== null) {
      const updatedGastos = gastos.map((g, index) => (index === editIndex ? nuevoGasto : g));
      setGastos(updatedGastos);
      setEditIndex(null);
    } else {
      setGastos([...gastos, nuevoGasto]);
      setIdGasto(idGasto + 1); // Incrementar el ID para el siguiente gasto
    }
  
    // Resetear los campos
    setGlosa('');
    setCategoria('');
    setProductos([]);
    setNuevoProducto({ nombre: '', cantidad: 1, valor: '' });
    setCosto('');
  };
  
  const handleEdit = (index) => {
    const gasto = gastos[index];
    setGlosa(gasto.glosa);
    setCategoria(gasto.categoria);
    setProductos(gasto.productos);
    setCosto(gasto.costo);
    setEditIndex(index); // Establecer el índice para editar
  };

  const handleDelete = (index) => {
    const updatedGastos = gastos.filter((_, i) => i !== index);
    setGastos(updatedGastos);
  };

  const filtrarOrdenes = () => {
    const hoy = new Date();

    switch (filter) {
      case 'Hoy':
        return gastos.filter((gasto) => isToday(new Date(gasto.fecha)));
      case 'Semana':
        return gastos.filter((gasto) => isThisWeek(new Date(gasto.fecha), { weekStartsOn: 1 })); // Semanas desde el lunes
      case 'Mes':
        return gastos.filter((gasto) => isThisMonth(new Date(gasto.fecha)));
      case '6 Meses':
        return gastos.filter((gasto) => isAfter(new Date(gasto.fecha), subMonths(hoy, 6)));
      default:
        return gastos;
    }
  };

  const gastosFiltrados = filtrarOrdenes();

  // Calcular la sumatoria total de los costos
  const calcularTotal = () => {
    return gastosFiltrados.reduce((total, gasto) => total + gasto.costo, 0);
  };

  return (
    <>
    <Box p={6} maxWidth="800px" mx="auto" bg="white" borderRadius="lg" boxShadow="lg">
      <Box as="h2" fontSize="xl" mb={4} fontWeight={"bold"}>
        {editIndex !== null ? `Editando gasto Nº ${gastos[editIndex].id}` : 'Registrar Gasto'}
      </Box>

      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Glosa del Gasto</FormLabel>
          <Input
            value={glosa}
            onChange={(e) => setGlosa(e.target.value)}
            placeholder="Ingresa una descripción del gasto"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Categoría</FormLabel>
          <Select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            placeholder="Selecciona una categoría"
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </Select>
        </FormControl>

        {categoria === 'productos' && (
          <>
            <FormLabel>Productos Comprados</FormLabel>
            {productos.map((prod, index) => (
              <HStack key={index} spacing={4} align="center" justify="space-between" width="100%">
                <Box>{prod.nombre}</Box>
                <Box>Cantidad: {prod.cantidad}</Box>
                <Box>Valor: ${separadorDeMiles(prod.valor)}</Box>
                <IconButton
                  aria-label="Quitar producto"
                  icon={<CloseIcon />}
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleQuitarProducto(index)}
                />
              </HStack>
            ))}



            <HStack spacing={4} mt={4} align="center" justify="space-between" width="100%">
              <Select
                placeholder="Selecciona producto"
                value={nuevoProducto.nombre}
                onChange={(e) =>
                  setNuevoProducto((prev) => ({ ...prev, nombre: e.target.value }))
                }
              >
                {opcionesProductos.map((prod) => (
                  <option key={prod} value={prod}>
                    {prod}
                  </option>
                ))}
              </Select>
              <Input
                type="number"
                value={nuevoProducto.cantidad}
                min={1}
                onChange={(e) =>
                  setNuevoProducto((prev) => ({ ...prev, cantidad: parseInt(e.target.value, 10) }))
                }
                placeholder="Cantidad"
              />
              <Input
                value={separadorDeMiles(nuevoProducto.valor)}
                onChange={(e) =>
                  setNuevoProducto((prev) => ({
                    ...prev,
                    valor: e.target.value.replace(/\D/g, ''),
                  }))
                }
                placeholder="Valor"
              />


              <Button colorScheme="teal" onClick={handleAgregarProducto}>
                +
              </Button>
            </HStack>
          </>
        )}

        {categoria !== 'productos' && (
          <FormControl isRequired>
            <FormLabel>Costo</FormLabel>
            <Input value={separadorDeMiles(costo)} onChange={handleCostoChange} placeholder="Ingresa el costo" />
          </FormControl>
        )}

        <Button colorScheme="teal" width="full" onClick={handleSubmit}>
          {editIndex !== null ? 'Guardar Cambios' : 'Registrar Gasto'}
        </Button>
      </VStack>
      </Box>

      <Box p={6} maxWidth="1000px" mx="auto" bg="white" borderRadius="lg" boxShadow="lg">

      {/* Filtro de gastos */}
      <Box mt={6}>
        <FormControl>
          <FormLabel>Filtrar por:</FormLabel>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)} maxWidth={"200px"}>
            <option value="Hoy">Hoy</option>
            <option value="Semana">Esta Semana</option>
            <option value="Mes">Este Mes</option>
            <option value="6 Meses">Últimos 6 Meses</option>
          </Select>
        </FormControl>
      </Box>

      {/* Sumatoria total */}
      <Box mt={6}>
        <Text fontSize="xl" fontWeight="bold">
          Total de costos: ${separadorDeMiles(calcularTotal())}
        </Text>
      </Box>

      {/* Tabla para mostrar los gastos filtrados */}
      {gastosFiltrados.length > 0 && (
        <Box mt={6}>
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Fecha</Th>
                <Th>Glosa</Th>
                <Th>Categoría</Th>
                <Th>Costo</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {gastosFiltrados.map((gasto, index) => (
                <Tr key={gasto.id}>
                  <Td>{gasto.id}</Td>
                  <Td>{format(new Date(gasto.fecha), 'dd-MM-yyyy')}</Td>
                  <Td>{gasto.glosa}</Td>
                  <Td>{gasto.categoria.charAt(0).toUpperCase() + gasto.categoria.slice(1)}</Td>
                  <Td>${separadorDeMiles(gasto.costo)}</Td>
                  <Td>
                    <IconButton
                      aria-label="Editar gasto"
                      icon={<EditIcon />}
                      mr={2}
                      onClick={() => handleEdit(index)}
                    />
                    <IconButton
                      aria-label="Eliminar gasto"
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      onClick={() => handleDelete(index)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
    </>
  );
};

export default RegistroGastos;
