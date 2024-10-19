import React from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';

const Sidebar = () => {
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

          <DrawerFooter>
            <Text>Footer Opcional</Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
