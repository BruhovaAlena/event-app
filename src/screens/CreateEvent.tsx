import React, { useContext } from 'react';
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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../utils/event';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

enum FieldName {
  title = 'title',
  description = 'description',
  date = 'date',
  place = 'place',
  capacity = 'capacity',
}

type FormValues = {
  title: string;
  description: string;
  date: Date;
  place: string;
  capacity: number;
};

const schema = yup.object({
  [FieldName.title]: yup.string().required('Zadaj názov, prosím.'),
  [FieldName.description]: yup.string().required('Zadaj popis, prosím.'),
  [FieldName.date]: yup.date().required('Zadaj dátum konania, prosím.'),
  [FieldName.place]: yup.string().required('Zadaj miesto konania, prosím.'),
  [FieldName.capacity]: yup
    .number()
    .required('Zadaj maximálnu kapacitu, prosím.'),
});

const CreateEvent = () => {
  const navigate = useNavigate();
  const { accessToken, userInfo } = useContext(UserContext);

  const formMethods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      [FieldName.title]: '',
      [FieldName.description]: '',
      [FieldName.place]: '',
      [FieldName.capacity]: undefined,
      [FieldName.date]: undefined,
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = formMethods;

  const onClickAddEvent = async (e: any) => {
    await handleSubmit((formValues) => {
      if (userInfo?.id) {
        createEvent({
          place: formValues.place,
          date: String(formValues.date),
          description: formValues.description,
          title: formValues.title,
          userId: userInfo.id,
          maxCapacity: formValues.capacity,
          token: accessToken,
          onAddSuccess: () => navigate('/home'),
        });
      }
    })(e);
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      alignItems="center"
      height="100vh"
      bgColor="gray.300"
    >
      <Stack flexDirection="column" alignItems="center" justifyContent="center">
        <Heading mt="40px" color={'white'}>
          Zadaj info o evente
        </Heading>

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
                backgroundColor="whiteAlpha.800"
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
                  <Controller
                    name="place"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <GooglePlacesAutocomplete
                        apiOptions={{ language: 'sk', region: 'sk' }}
                        selectProps={{
                          placeValue: value,
                          onChange: (newValue: {
                            label: string;
                            value: any;
                          }) => {
                            onChange(newValue.label);
                          },
                        }}
                      />
                    )}
                  />

                  <FormErrorMessage>
                    {errors.place && errors.place.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel>Maximálna kapacita</FormLabel>
                  <Input type="number" {...register('capacity')} />
                  <FormErrorMessage>
                    {errors.capacity && errors.capacity.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={Boolean(errors.description)}>
                  <FormLabel>Dátum a čas konania</FormLabel>
                  <Input
                    type="datetime-local"
                    size="md"
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
                    bg={'darkblue'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.700',
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
