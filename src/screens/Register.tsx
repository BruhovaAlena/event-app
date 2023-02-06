import React, { useContext, useEffect, useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  Icon,
  FormControl,
  FormErrorMessage,
  Checkbox,
  FormLabel,
  FormHelperText,
  InputRightElement,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock, FaAddressCard } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { userRegistration } from '../utils/user';
import { UserContext } from '../context/UserContext';

enum FieldName {
  email = 'email',
  password = 'password',
  name = 'name',
  surname = 'surname',
  address = 'address',
  isOrganizer = 'isOrganizer',
}

export type FormValues = {
  email: string;
  password: string;
  name: string;
  surname: string;
  address: string;
  isOrganizer: boolean;
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
  [FieldName.name]: yup.string().required('Zadaj svoje meno, prosím.'),
  [FieldName.surname]: yup.string().required('Zadaj svoje priezvisko, prosím.'),
  [FieldName.address]: yup.string().required('Zadaj svoju adresu, prosím.'),
  [FieldName.isOrganizer]: yup.boolean(),
});

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const formMethods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      [FieldName.email]: '',
      [FieldName.password]: '',
      [FieldName.name]: '',
      [FieldName.surname]: '',
      [FieldName.address]: '',
      [FieldName.isOrganizer]: false,
    },
  });
  // console.log(process.env.REACT_APP_API_BASE_URL);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = formMethods;

  const [selected, setSelected] = useState(false);

  const onClickRegister = async (e: any) => {
    await handleSubmit(async (formValues) => {
      await registerUser({
        ...formValues,
        onSuccess: () => navigate('/noheader/login'),
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
      <>
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
              <Heading
                w="100%"
                textAlign={'center'}
                fontWeight="normal"
                mb="2%"
              >
                Registrácia
              </Heading>
              <Flex>
                <FormControl isInvalid={Boolean(errors.name)} mr="5%">
                  <FormLabel htmlFor="first-name" fontWeight={'normal'}>
                    Meno
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <Icon as={FaUserAlt} />
                    </InputLeftElement>
                    <Input
                      type="text"
                      placeholder="Meno"
                      {...register('name')}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={Boolean(errors.surname)}>
                  <FormLabel htmlFor="last-name" fontWeight={'normal'}>
                    Priezvisko
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <Icon as={FaUserAlt} />
                    </InputLeftElement>
                    <Input
                      type="text"
                      placeholder="Priezvisko"
                      {...register('surname')}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.surname && errors.surname.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>

              <FormControl isInvalid={Boolean(errors.address)} mt="2%">
                <FormLabel htmlFor="email" fontWeight={'normal'}>
                  Adresa
                </FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Icon as={FaAddressCard} />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Adresa"
                    {...register('address')}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.address && errors.address.message}
                </FormErrorMessage>
              </FormControl>

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

              <Checkbox
                mt={5}
                colorScheme="purple"
                iconColor="purple.100"
                {...register('isOrganizer')}
                isChecked={selected}
                onChange={(e) => {
                  setSelected(e.target.checked);
                }}
              >
                Organizátor
              </Checkbox>
              <Stack width="100%" alignContent="center" alignItems="center">
                <Button
                  mt={10}
                  rounded={'full'}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={onClickRegister}
                  isLoading={isSubmitting}
                >
                  Vytvoriť účet
                </Button>
              </Stack>
            </Box>
          </form>
        </FormProvider>
      </>
    </Flex>
  );
};

export default Register;
