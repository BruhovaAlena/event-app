import React, { useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  Link,
  Avatar,
  FormControl,
  Icon,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';

const Login = () => {
  return (
    <Flex
      flexDirection="column"
      backgroundColor="beige"
      width="100wh"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Stack flexDirection="column" alignItems="center" justifyContent="center">
        <Heading>Vitaj!</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <Stack
            backgroundColor="whiteAlpha.900"
            padding="1rem"
            borderRadius="10px"
          >
            <InputGroup>
              <InputLeftElement>
                <Icon as={FaUserAlt} />
              </InputLeftElement>
              <Input type="email" placeholder="Email" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement>
                <Icon as={FaLock} />
              </InputLeftElement>
              <Input type="password" placeholder="Heslo" />
            </InputGroup>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
