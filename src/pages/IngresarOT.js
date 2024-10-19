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
  Heading,
  useToast,
  Grid,
} from '@chakra-ui/react';
import { separadorDeMiles } from '../utils/formatters';

const IngresarOT = () => {
  const [servicio, setServicio] = useState([]);
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [año, setAño] = useState('');
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
  
  const handlePrecioChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
    setPrecio(rawValue);
  };

  const handleSubmit = () => {
    // Validación de campos obligatorios
    if (!servicio.length || !marca || !modelo || !año || !estadoOT || !direccion || !comuna || !fecha || !precio || !plataforma || !nombreCliente || !telefonoCliente || !medioPago) {
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
    <Box p={6} maxWidth="1000px" mx="auto" bg="white" borderRadius="lg" boxShadow="lg">

      {/* Sección Servicio */}
      <Heading as="h3" size="lg" mb={4}>Servicio</Heading>
      
      <FormControl mb={4} isRequired>
        <FormLabel fontWeight={'bold'}>Servicios</FormLabel>
        <CheckboxGroup value={servicio} onChange={(val) => setServicio(val)}>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <Box>
            <Flex direction="column">
              <Checkbox value="GPS">GPS</Checkbox>
              <Checkbox value="INM">INM</Checkbox>
              <Checkbox value="Chip x6">Chip x6</Checkbox>
              <Checkbox value="Chip x12">Chip x12</Checkbox>
            </Flex>
            </Box>
            <Box>
            <Flex direction="column">
              <Checkbox value="Pack GPS+INM">Pack GPS+INM</Checkbox>
              <Checkbox value="Desinstalación">Desinstalación</Checkbox>
              <Checkbox value="Solo Chip x6">Solo Chip x6</Checkbox>
              <Checkbox value="Solo Chip x12">Solo Chip x12</Checkbox>
            </Flex>
            </Box>
          </Grid>
        </CheckboxGroup>
      </FormControl>

      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <Box>
          <Flex direction="column">
            <FormControl mb={4} isRequired>
              <FormLabel fontWeight={'bold'}>Marca</FormLabel>
              <Select placeholder="Selecciona la marca" value={marca} onChange={(e) => setMarca(e.target.value)}>
                {/* Opciones de marcas ordenadas alfabéticamente */}
                <option value="Alfa Romeo">Alfa Romeo</option>
                <option value="Aston Martin">Aston Martin</option>
                <option value="Audi">Audi</option>
                <option value="Baic">Baic</option>
                <option value="Bentley">Bentley</option>
                <option value="BMW">BMW</option>
                <option value="BYD">BYD</option>
                <option value="Changan">Changan</option>
                <option value="Chery">Chery</option>
                <option value="Chevrolet">Chevrolet</option>
                <option value="Citroën">Citroën</option>
                <option value="DFSK">DFSK</option>
                <option value="Dodge">Dodge</option>
                <option value="Dongfeng">Dongfeng</option>
                <option value="DS Automobiles">DS Automobiles</option>
                <option value="Exeed">Exeed</option>
                <option value="FAW">FAW</option>
                <option value="Ferrari">Ferrari</option>
                <option value="Fiat">Fiat</option>
                <option value="Ford">Ford</option>
                <option value="Foton">Foton</option>
                <option value="Geely">Geely</option>
                <option value="GWM (Great Wall Motors)">GWM (Great Wall Motors)</option>
                <option value="Haima">Haima</option>
                <option value="Haval">Haval</option>
                <option value="Hino">Hino</option>
                <option value="Hongqi">Hongqi</option>
                <option value="Hyundai">Hyundai</option>
                <option value="Isuzu">Isuzu</option>
                <option value="Iveco">Iveco</option>
                <option value="JAC">JAC</option>
                <option value="Jaguar">Jaguar</option>
                <option value="Jeep">Jeep</option>
                <option value="Jetour">Jetour</option>
                <option value="JMC">JMC</option>
                <option value="Kaiyi">Kaiyi</option>
                <option value="KIA">KIA</option>
                <option value="King Long">King Long</option>
                <option value="Lamborghini">Lamborghini</option>
                <option value="Land Rover">Land Rover</option>
                <option value="Lexus">Lexus</option>
                <option value="Lifan">Lifan</option>
                <option value="Mahindra">Mahindra</option>
                <option value="Maserati">Maserati</option>
                <option value="Maxus">Maxus</option>
                <option value="Mazda">Mazda</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="MG">MG</option>
                <option value="Mitsubishi">Mitsubishi</option>
                <option value="Nissan">Nissan</option>
                <option value="Ora">Ora</option>
                <option value="Peugeot">Peugeot</option>
                <option value="Porsche">Porsche</option>
                <option value="Ram">Ram</option>
                <option value="Renault">Renault</option>
                <option value="Rolls-Royce">Rolls-Royce</option>
                <option value="SsangYong">SsangYong</option>
                <option value="Subaru">Subaru</option>
                <option value="Suzuki">Suzuki</option>
                <option value="Tank">Tank</option>
                <option value="Tata">Tata</option>
                <option value="Toyota">Toyota</option>
                <option value="Volvo">Volvo</option>
                <option value="Zotye">Zotye</option>
              </Select>
            </FormControl>

            <FormControl mb={4} isRequired>
              <FormLabel fontWeight={'bold'}>Modelo</FormLabel>
              <Input value={modelo} onChange={(e) => setModelo(e.target.value)} placeholder="Ingresa el modelo del vehículo" />
            </FormControl>

            <FormControl mb={4} isRequired>
              <FormLabel fontWeight={'bold'}>Año</FormLabel>
              <Select placeholder="Selecciona el año" value={año} onChange={(e) => setAño(e.target.value)}>
                {[...Array(30)].map((_, i) => {
                  const year = (new Date().getFullYear() + 1) - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          </Flex>
        </Box>
        <Box>
        <Flex direction="column">
          <FormControl mb={4} isRequired>
            <FormLabel fontWeight={'bold'}>Estado OT</FormLabel>
            <Select placeholder="Selecciona el estado" value={estadoOT} onChange={(e) => setEstadoOT(e.target.value)}>
              <option value="Recibido">Recibido</option>
              <option value="Realizado">Realizado</option>
            </Select>
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel fontWeight={'bold'}>Fecha del Servicio</FormLabel>
            <Input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel fontWeight={'bold'}>Precio</FormLabel>
            <Input value={separadorDeMiles(precio)} onChange={handlePrecioChange} placeholder="Ingresa el precio" />
          </FormControl>
        </Flex>
        </Box>
      </Grid>

      {/* Sección Cliente */}
      <Heading as="h3" size="lg" mb={4} marginTop={10}>Cliente</Heading>

      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <Box>
          <Flex direction="column">
            <FormControl mb={4} isRequired>
              <FormLabel fontWeight={'bold'}>Nombre Cliente</FormLabel>
              <Input value={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)} placeholder="Ingresa el nombre del cliente" />
            </FormControl>

            <FormControl mb={4} isRequired>
              <FormLabel fontWeight={'bold'}>Dirección</FormLabel>
              <Input value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Ingresa la dirección" />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel fontWeight={'bold'}>Comuna</FormLabel>
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
          </Flex>
        </Box>
        <Box>
          <Flex direction="column">
            <FormControl mb={4} isRequired>
              <FormLabel fontWeight={'bold'}>Teléfono Cliente</FormLabel>
              <Input type="tel" value={telefonoCliente} onChange={(e) => setTelefonoCliente(e.target.value)} placeholder="Ej: +56912345678" />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel fontWeight={'bold'}>Correo Cliente (Opcional)</FormLabel>
              <Input type="email" value={correoCliente} onChange={(e) => setCorreoCliente(e.target.value)} placeholder="Ingresa el correo del cliente" />
            </FormControl>

            <FormControl mb={4} isRequired>
              <FormLabel fontWeight={'bold'}>Plataforma</FormLabel>
              <Select placeholder="Selecciona la plataforma" value={plataforma} onChange={(e) => setPlataforma(e.target.value)}>
                <option value="Marketplace de Facebook">Marketplace de Facebook</option>
                <option value="Página Web">Página Web</option>
                <option value="Recomendación">Recomendación</option>
                <option value="Cliente Antiguo">Cliente Antiguo</option>
                <option value="Conocido">Conocido</option>
              </Select>
            </FormControl>
          </Flex>
        </Box>
      </Grid>

      {/* Sección Pago */}
      <Heading as="h3" size="lg" mb={4} marginTop={10}>Pago</Heading>

      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <Box>
          <Flex direction="column">
            <FormControl mb={4} isRequired>
              <FormLabel fontWeight={'bold'}>Medio de Pago</FormLabel>
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
          </Flex>
        </Box>
        <Box>
          <Flex direction="column">
            <FormControl display="flex" alignItems="center" justifyContent="center" mb={4} marginTop={10}>
              <FormLabel fontWeight="bold" mb={0}>Transferido OK</FormLabel>
              <Switch isChecked={transferidoOK} onChange={(e) => setTransferidoOK(e.target.checked)} />
            </FormControl>
          </Flex>
        </Box>
      </Grid>

      {/* Sección Chip */}
      <Heading as="h3" size="lg" mb={4} marginTop={10}>Chip</Heading>

      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <Box>
          <Flex direction="column">
            <FormControl mb={4}>
              <FormLabel fontWeight={'bold'}>Tipo Chip (Opcional)</FormLabel>
              <Select placeholder="Selecciona el tipo de chip" value={tipoChip} onChange={(e) => setTipoChip(e.target.value)}>
                <option value="Chip x6">Chip x6</option>
                <option value="Chip x12">Chip x12</option>
              </Select>
            </FormControl>
          </Flex>
        </Box>
        <Box>
          <Flex direction="column">
            <FormControl mb={4}>
              <FormLabel fontWeight={'bold'}>Número de Chip (Opcional)</FormLabel>
              <Input value={numeroChip} onChange={(e) => setNumeroChip(e.target.value)} placeholder="Ingresa el número del chip" />
            </FormControl>
          </Flex>
        </Box>
      </Grid>
      
      <Button colorScheme="teal" width="full" mt={4} onClick={handleSubmit} height={70}>
        Registrar OT
      </Button>
    </Box>
  );
};

export default IngresarOT;
