import React, { useContext, useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  Icon,
  Button,
  Text,
  FormErrorMessage,
  FormControl,
  InputRightElement,
  FormLabel,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import { userLogin } from '../utils/user';
import { MdAlternateEmail } from 'react-icons/md';

enum FieldName {
  email = 'email',
  password = 'password',
}

type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object({
  [FieldName.email]: yup
    .string()
    .email('Email je neplatný.')
    .required('Zadaj svoj email, prosím.'),
  [FieldName.password]: yup
    .string()
    .required('Zadaj svoje heslo, prosím.')
    .min(5, 'Heslo musí mať minimálne 5 znakov.')
    .max(15, 'Heslo môže mať maximálne 15 znakov.'),
});

const Login = () => {
  const navigate = useNavigate();
  const { onSignInSuccess } = useContext(UserContext);

  const formMethods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      [FieldName.email]: 'solivar@gmail.com',
      [FieldName.password]: 'alenka',
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = formMethods;

  const onFailSignIn = () => {
    setError('password', { message: 'Nesprávny email alebo heslo' });
    setError('email', {});
  };

  const onClickLogin = async (e: any) => {
    await handleSubmit((formValues) => {
      // console.log('data', formValues);
      userLogin({
        onSuccess: (userData) => {
          onSignInSuccess(userData);
          navigate('/home');
        },
        email: formValues.email,
        password: formValues.password,
      });
    })(e);
  };

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Flex
      flexDirection="column"
      backgroundColor="white"
      width="100wh"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <FormProvider {...formMethods}>
        <form>
          <Box
            borderWidth="1px"
            rounded="lg"
            shadow="1px 1px 3px rgba(0,0,0,0.3)"
            maxWidth={800}
            p={6}
            m="10px auto"
            as="form"
          >
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
              Prihlásenie
            </Heading>

            <FormControl isInvalid={Boolean(errors.email)} mt="2%">
              <FormLabel htmlFor="email" fontWeight={'normal'}>
                Email
              </FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <Icon as={MdAlternateEmail} />
                </InputLeftElement>
                <Input
                  type="email"
                  placeholder="Email"
                  {...register('email')}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.password)}>
              <FormLabel htmlFor="password" fontWeight={'normal'} mt="2%">
                Heslo
              </FormLabel>
              <InputGroup size="md">
                <InputLeftElement>
                  <Icon as={FaLock} />
                </InputLeftElement>
                <Input
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  placeholder="Heslo"
                  {...register('password')}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button colorScheme="black" variant="link" mt={2}>
              Zabudol som heslo
            </Button>
            <Stack width="100%" alignContent="center" alignItems="center">
              <Button
                width={200}
                mt={10}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={onClickLogin}
                isLoading={isSubmitting}
              >
                Prihlásiť
              </Button>
            </Stack>
          </Box>
        </form>
      </FormProvider>
    </Flex>
  );
};

export default Login;
