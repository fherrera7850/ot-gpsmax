import React from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  IconButton,
  Box,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';

const Sidebar = ({ onLogout }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        icon={<HamburgerIcon />}
        onClick={onOpen}
        colorScheme="teal"
        aria-label="Open Menu"
        size="lg"
        m={4}
      />

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menú Principal</DrawerHeader>

          <DrawerBody>
            <VStack align="start" spacing={4}>
              <Button as={Link} to="/ingresar-ot" variant="ghost" width="full" onClick={onClose}>
                Ingresar OT
              </Button>
              <Button as={Link} to="/ots" variant="ghost" width="full" onClick={onClose}>
                Ordenes de Trabajo
              </Button>
              <Button as={Link} to="/chips" variant="ghost" width="full" onClick={onClose}>
                Chips
              </Button>
              <Button as={Link} to="/gastos" variant="ghost" width="full" onClick={onClose}>
                Gastos
              </Button>
              <Button as={Link} to="/combustible" variant="ghost" width="full" onClick={onClose}>
                Combustible
              </Button>
              <Button as={Link} to="/balance" variant="ghost" width="full" onClick={onClose}>
                Balance
              </Button>
            </VStack>
          </DrawerBody>

          {/* Reemplazamos el DrawerFooter con el botón de cerrar sesión */}
          <Box textAlign={'center'} bottom={4} right={4}>
            <Button
              colorScheme="red"
              width="50%" 
              onClick={() => {
                onLogout(); // Llamamos la función onLogout para cerrar sesión
                onClose();  // Cerramos el drawer
              }}
              marginBottom={10}
            >
              Cerrar Sesión
            </Button>
          </Box>
          
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
