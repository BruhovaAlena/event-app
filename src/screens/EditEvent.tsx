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
  Spinner,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { editEvent } from '../utils/event';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getEvent } from '../utils/event';
import { Event } from '../types/event';

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

const EditEvent = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { accessToken, userInfo } = useContext(UserContext);

  const {
    status,
    error,
    isFetching,
    isLoading,
    data: event,
  } = useQuery<Event>({
    queryKey: ['event', eventId],
    queryFn: () => getEvent({ eventId: eventId!, token: accessToken }),
    enabled: Boolean(eventId),
  });

  const datum = event?.date.split('T')[0];

  const formMethods = useForm<FormValues>({
    resolver: yupResolver(schema),
    // @ts-ignore
    defaultValues: {
      [FieldName.title]: event?.title,
      [FieldName.description]: event?.description,
      [FieldName.place]: event?.place,
      [FieldName.capacity]: event?.maxCapacity,
      [FieldName.date]: datum,
    },
  });

  console.log('event.date', event?.date);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = formMethods;

  const queryClient = useQueryClient();

  const putMutationOnClickEdit = useMutation({
    mutationFn: editEvent,
    onSuccess: (data) => {
      queryClient.setQueryData(['event', eventId], data);
      queryClient.invalidateQueries(['event'], { exact: true });
      navigate(`/eventDetails/${eventId}`);
    },
    onError: () => {
      alert('nepodarilo sa');
    },
  });

  const onClickEdit = async (e: any) => {
    await handleSubmit((formValues) => {
      if (eventId) {
        putMutationOnClickEdit.mutate({
          eventId: eventId,
          token: accessToken,
          date: String(formValues.date),
          description: formValues.description,
          maxCapacity: formValues.capacity,
          place: formValues.place,
          title: formValues.title,
        });
      }
    })(e);
  };

  if (isLoading) {
    return <Spinner />;
  }

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
        <Heading>Úprava eventu</Heading>

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

                <FormControl>
                  <FormLabel>Maximálna kapacita</FormLabel>
                  <Input type="number" {...register('capacity')} />
                  <FormErrorMessage>
                    {errors.capacity && errors.capacity.message}
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
                    onClick={onClickEdit}
                    isLoading={isSubmitting}
                  >
                    Uložiť zmeny
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

export default EditEvent;
