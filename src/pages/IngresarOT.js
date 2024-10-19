import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  CheckboxGroup,
  Checkbox,
  Flex,
  Switch,
  Textarea,
  useToast,
} from '@chakra-ui/react';

const IngresarOT = () => {
  const [servicio, setServicio] = useState([]);
  const [vehiculo, setVehiculo] = useState('');
  const [estadoOT, setEstadoOT] = useState('');
  const [direccion, setDireccion] = useState('');
  const [comuna, setComuna] = useState('');
  const [fecha, setFecha] = useState('');
  const [precio, setPrecio] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [nombreCliente, setNombreCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');
  const [correoCliente, setCorreoCliente] = useState('');
  const [medioPago, setMedioPago] = useState('');
  const [transferidoOK, setTransferidoOK] = useState(false);
  const [tipoChip, setTipoChip] = useState('');
  const [numeroChip, setNumeroChip] = useState('');

  const toast = useToast();

  const handleSubmit = () => {
    // Validación de campos obligatorios
    if (!servicio.length || !vehiculo || !estadoOT || !direccion || !comuna || !fecha || !precio || !plataforma || !nombreCliente || !telefonoCliente || !medioPago) {
      toast({
        title: 'Error',
        description: 'Por favor, completa todos los campos obligatorios.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Envío exitoso si pasa la validación
    toast({
      title: 'Éxito',
      description: 'Orden de trabajo registrada correctamente.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    // Aquí puedes manejar la lógica de guardar la OT
  };

  return (
    <Box p={6} maxWidth="700px" mx="auto" bg="white" borderRadius="lg" boxShadow="lg">
      <FormControl mb={4} isRequired>
        <FormLabel>Servicios</FormLabel>
        <CheckboxGroup
          value={servicio}
          onChange={(val) => setServicio(val)}
        >
          <Flex direction="column">
            <Checkbox value="GPS">GPS</Checkbox>
            <Checkbox value="INM">INM</Checkbox>
            <Checkbox value="Chip x6">Chip x6</Checkbox>
            <Checkbox value="Chip x12">Chip x12</Checkbox>
            <Checkbox value="Pack GPS+INM">Pack GPS+INM</Checkbox>
            <Checkbox value="Desinstalación">Desinstalación</Checkbox>
            <Checkbox value="Solo Chip x6">Solo Chip x6</Checkbox>
            <Checkbox value="Solo Chip x12">Solo Chip x12</Checkbox>
          </Flex>
        </CheckboxGroup>
      </FormControl>

      <FormControl mb={4} isRequired>
        <FormLabel>Vehículo (Modelo y Año)</FormLabel>
        <Input value={vehiculo} onChange={(e) => setVehiculo(e.target.value)} placeholder="Ej: Toyota Corolla 2020" />
      </FormControl>

      <FormControl mb={4} isRequired>
        <FormLabel>Estado OT</FormLabel>
        <Select placeholder="Selecciona el estado" value={estadoOT} onChange={(e) => setEstadoOT(e.target.value)}>
          <option value="Recibido">Recibido</option>
          <option value="Realizado">Realizado</option>
        </Select>
      </FormControl>

      <FormControl mb={4} isRequired>
        <FormLabel>Dirección</FormLabel>
        <Textarea value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Ingresa la dirección" />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Comuna</FormLabel>
        <Select placeholder="Selecciona la comuna" value={comuna} onChange={(e) => setComuna(e.target.value)}>
          <option value="Alhué">Alhué</option>
          <option value="Buin">Buin</option>
          <option value="Calera de Tango">Calera de Tango</option>
          <option value="Cerrillos">Cerrillos</option>
          <option value="Cerro Navia">Cerro Navia</option>
          <option value="Colina">Colina</option>
          <option value="Conchalí">Conchalí</option>
          <option value="Curacaví">Curacaví</option>
          <option value="El Bosque">El Bosque</option>
          <option value="El Monte">El Monte</option>
          <option value="Estación Central">Estación Central</option>
          <option value="Huechuraba">Huechuraba</option>
          <option value="Independencia">Independencia</option>
          <option value="Isla de Maipo">Isla de Maipo</option>
          <option value="La Cisterna">La Cisterna</option>
          <option value="La Florida">La Florida</option>
          <option value="La Granja">La Granja</option>
          <option value="La Pintana">La Pintana</option>
          <option value="La Reina">La Reina</option>
          <option value="Lampa">Lampa</option>
          <option value="Las Condes">Las Condes</option>
          <option value="Lo Barnechea">Lo Barnechea</option>
          <option value="Lo Espejo">Lo Espejo</option>
          <option value="Lo Prado">Lo Prado</option>
          <option value="Macul">Macul</option>
          <option value="Maipú">Maipú</option>
          <option value="María Pinto">María Pinto</option>
          <option value="Melipilla">Melipilla</option>
          <option value="Ñuñoa">Ñuñoa</option>
          <option value="Padre Hurtado">Padre Hurtado</option>
          <option value="Paine">Paine</option>
          <option value="Pedro Aguirre Cerda">Pedro Aguirre Cerda</option>
          <option value="Peñaflor">Peñaflor</option>
          <option value="Peñalolén">Peñalolén</option>
          <option value="Pirque">Pirque</option>
          <option value="Providencia">Providencia</option>
          <option value="Pudahuel">Pudahuel</option>
          <option value="Puente Alto">Puente Alto</option>
          <option value="Quilicura">Quilicura</option>
          <option value="Quinta Normal">Quinta Normal</option>
          <option value="Recoleta">Recoleta</option>
          <option value="Renca">Renca</option>
          <option value="San Bernardo">San Bernardo</option>
          <option value="San Joaquín">San Joaquín</option>
          <option value="San José de Maipo">San José de Maipo</option>
          <option value="San Miguel">San Miguel</option>
          <option value="San Pedro">San Pedro</option>
          <option value="San Ramón">San Ramón</option>
          <option value="Santiago">Santiago</option>
          <option value="Talagante">Talagante</option>
          <option value="Tiltil">Tiltil</option>
          <option value="Vitacura">Vitacura</option>
        </Select>
      </FormControl>


      <FormControl mb={4} isRequired>
        <FormLabel>Fecha del Servicio</FormLabel>
        <Input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
      </FormControl>

      <FormControl mb={4} isRequired>
        <FormLabel>Precio</FormLabel>
        <Input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Ej: 50000" />
      </FormControl>

      <FormControl mb={4} isRequired>
        <FormLabel>Plataforma</FormLabel>
        <Select placeholder="Selecciona la plataforma" value={plataforma} onChange={(e) => setPlataforma(e.target.value)}>
          <option value="Marketplace de Facebook">Marketplace de Facebook</option>
          <option value="Página Web">Página Web</option>
          <option value="Recomendación">Recomendación</option>
          <option value="Cliente Antiguo">Cliente Antiguo</option>
          <option value="Conocido">Conocido</option>
        </Select>
      </FormControl>

      <FormControl mb={4} isRequired>
        <FormLabel>Nombre Cliente</FormLabel>
        <Input value={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)} placeholder="Ingresa el nombre del cliente" />
      </FormControl>

      <FormControl mb={4} isRequired>
        <FormLabel>Teléfono Cliente</FormLabel>
        <Input type="tel" value={telefonoCliente} onChange={(e) => setTelefonoCliente(e.target.value)} placeholder="Ej: +56912345678" />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Correo Cliente (Opcional)</FormLabel>
        <Input type="email" value={correoCliente} onChange={(e) => setCorreoCliente(e.target.value)} placeholder="Ingresa el correo del cliente" />
      </FormControl>

      <FormControl mb={4} isRequired>
        <FormLabel>Medio de Pago</FormLabel>
        <Select placeholder="Selecciona el medio de pago" value={medioPago} onChange={(e) => setMedioPago(e.target.value)}>
          <option value="Efectivo">Efectivo</option>
          <option value="Transferencia Cuenta Rut Felipe">Transferencia Cuenta Rut Felipe</option>
          <option value="Transferencia Cuenta Rut Alfredo">Transferencia Cuenta Rut Alfredo</option>
          <option value="Efectivo Alfredo">Efectivo Alfredo</option>
          <option value="Efectivo Felipe">Efectivo Felipe</option>
          <option value="Transferencia Suyai">Transferencia Suyai</option>
          <option value="Compraqui Suyai">Compraqui Suyai</option>
          <option value="Sumup Suyai">Sumup Suyai</option>
          <option value="MACH">MACH</option>
        </Select>
      </FormControl>

      <FormControl display="flex" alignItems="center" mb={4}>
        <FormLabel>Transferido OK</FormLabel>
        <Switch isChecked={transferidoOK} onChange={(e) => setTransferidoOK(e.target.checked)} />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Tipo Chip (Opcional)</FormLabel>
        <Select placeholder="Selecciona el tipo de chip" value={tipoChip} onChange={(e) => setTipoChip(e.target.value)}>
          <option value="Chip x6">Chip x6</option>
          <option value="Chip x12">Chip x12</option>
        </Select>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Número de Chip (Opcional)</FormLabel>
        <Input value={numeroChip} onChange={(e) => setNumeroChip(e.target.value)} placeholder="Ingresa el número del chip" />
      </FormControl>

      <Button colorScheme="teal" width="full" mt={4} onClick={handleSubmit}>
        Registrar OT
      </Button>
    </Box>
  );
};

export default IngresarOT;
