import React, { useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  Stack,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  HStack,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../utils/event';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useCounter } from './useCounter';

enum FieldName {
  title = 'title',
  description = 'description',
  date = 'date',
  place = 'place',
}

type FormValues = {
  title: string;
  description: string;
  date: Date;
  place: string;
};

const schema = yup.object({
  [FieldName.title]: yup.string().required('Zadaj názov, prosím.'),
  [FieldName.description]: yup.string().required('Zadaj popis, prosím.'),
  [FieldName.date]: yup.date().required('Zadaj dátum konania, prosím.'),
  [FieldName.place]: yup.string().required('Zadaj miesto konania, prosím.'),
});

const CreateEvent = () => {
  const navigate = useNavigate();

  const formMethods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      [FieldName.title]: '',
      [FieldName.description]: '',
      [FieldName.place]: '',
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = formMethods;

  const onClickAddEvent = async (e: any) => {
    await handleSubmit((formValues) => {
      // console.log('data', formValues);

      createEvent({
        place: formValues.place,
        date: String(formValues.date),
        description: formValues.description,
        title: formValues.title,
        userId: 'ecba0ad8-8ace-4b8a-be62-6299602c8e2d',

        onAddSuccess: () => navigate('/home'),
      });
    })(e);
  };

  return (
    <Flex
      flexDirection="column"
      backgroundColor="white"
      width="100wh"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Stack flexDirection="column" alignItems="center" justifyContent="center">
        <Heading>Zadaj info o evente</Heading>

        <Box minW={{ base: '90%', md: '468px' }}>
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
                <FormControl isInvalid={Boolean(errors.title)}>
                  <FormLabel>Názov udalosti</FormLabel>
                  <Input type="text" {...register('title')} />
                  <FormErrorMessage>
                    {errors.title && errors.title.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel>Popis udalosti</FormLabel>
                  <Input type="text" {...register('description')} />
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel>Miesto konania</FormLabel>
                  <Input type="text" {...register('place')} />
                  <FormErrorMessage>
                    {errors.place && errors.place.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={Boolean(errors.description)}>
                  <FormLabel>Dátum konania</FormLabel>
                  <Input
                    type="date"
                    size="md"
                    placeholder="Dátum konania"
                    {...register('date')}
                  />
                  <FormErrorMessage>
                    {errors.date && errors.date.message}
                  </FormErrorMessage>
                </FormControl>

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
                    onClick={onClickAddEvent}
                    isLoading={isSubmitting}
                  >
                    Vytvoriť event
                  </Button>
                </Stack>
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Stack>
    </Flex>
  );
};

export default CreateEvent;
