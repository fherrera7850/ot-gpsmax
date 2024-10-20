// src/components/Login.js
import React, { useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Heading, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate(); // Hook de React Router para redirigir

  const handleLogin = () => {
    // Lógica de autenticación
    if (email === 'test@example.com' && password === 'password') {
      toast({
        title: 'Inicio de sesión exitoso.',
        description: 'Redirigiendo al dashboard...',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        onLoginSuccess(); // Establecer autenticación en App.js
        navigate('/ots'); // Redirige al dashboard (OTs)
      }, 2000);
    } else {
      toast({
        title: 'Error en el inicio de sesión.',
        description: 'Credenciales incorrectas.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minHeight="100vh"
      width="full"
      align="center"
      justifyContent="center"
      bg="gray.50"
    >
      <Box
        borderWidth={1}
        px={4}
        width="full"
        maxWidth="500px"
        borderRadius={8}
        textAlign="center"
        boxShadow="lg"
        bg="white"
        p={6}
      >
        <Heading as="h1" mb={6}>
          Administración de servicios Gpsmax
        </Heading>
        <FormControl>
          <FormLabel htmlFor="email">Correo Electrónico</FormLabel>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo"
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel htmlFor="password">Contraseña</FormLabel>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
          />
        </FormControl>
        <Button width="full" mt={6} colorScheme="teal" onClick={handleLogin}>
          Iniciar Sesión
        </Button>
      </Box>
    </Flex>
  );
};

export default Login;
