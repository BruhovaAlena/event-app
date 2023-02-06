// import React, { useState } from 'react';
// import { Flex, Heading, Button, Stack, Text } from '@chakra-ui/react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { getEvent } from '../utils/event';
// import { Event } from '../types/event';

// const EventDetails = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   console.log('id', id);
//   const {
//     status,
//     error,
//     data: event,
//   } = useQuery<Event>({
//     queryKey: ['events', id],
//     queryFn: () => getEvent({ id: id! }),
//     enabled: Boolean(id),
//   });

//   return (
//     <Flex
//       flexDirection="column"
//       backgroundColor="purple.100"
//       width="100wh"
//       height="100vh"
//       alignItems="center"
//       justifyContent="center"
//     >
//       <Stack flexDirection="column" alignItems="center" justifyContent="center">
//         <Heading>{event?.title}</Heading>
//         <Heading>{id}</Heading>

//         <Text textAlign={'justify'}>{event?.description}</Text>
//         <Text textAlign={'justify'}>{}</Text>
//       </Stack>
//       <Button
//         mt={8}
//         width={200}
//         colorScheme="gray"
//         color="black"
//         onClick={() => console.log('ahoj')}
//       >
//         Prihlásiť sa
//       </Button>
//     </Flex>
//   );
// };

// export default EventDetails;

import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import {
  IoAnalyticsSharp,
  IoLogoBitcoin,
  IoSearchSharp,
  IoHomeOutline,
  IoManOutline,
  IoPeopleCircleOutline,
  IoCalendarNumberOutline,
} from 'react-icons/io5';
import { ReactElement, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAttendingEventIdsByUserId,
  getEvent,
  logoutFromEvent,
  logToEvent,
} from '../utils/event';
import { Event } from '../types/event';
import { useNavigate, useParams } from 'react-router-dom';
import { getDateAsText } from '../utils/date';
import { UserContext } from '../context/UserContext';

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function EventDetails() {
  const navigate = useNavigate();
  const { accessToken, userInfo } = useContext(UserContext);
  const { eventId } = useParams();
  const queryClient = useQueryClient();

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

  const { data: attendingEventsId } = useQuery<string[]>({
    enabled: Boolean(userInfo?.id),
    queryKey: ['attendingEventsId'],
    queryFn: () =>
      getAttendingEventIdsByUserId({
        userId: userInfo!.id,
        token: accessToken,
      }),
  });
  console.log('isLoading', isLoading);
  console.log('isFetching', isFetching);

  const postMutationClickLogin = useMutation({
    mutationFn: logToEvent,
    onSuccess: (data) => {
      queryClient.setQueryData(['event', eventId], data);
      queryClient.invalidateQueries(['event']);
      alert('prihlasenie sa podarilo');
    },
    onError: () => {
      alert('prihlasenie sa nepodarilo');
    },
  });
  const deleteMutationClickLogout = useMutation({
    mutationFn: logoutFromEvent,
    onSuccess: (data) => {
      queryClient.setQueryData(['events', eventId], data);
      queryClient.invalidateQueries(['events'], { exact: true });
      alert('odhlasenie sa podarilo');
    },
    onError: () => {
      alert('odhlasenie sa nepodarilo');
    },
  });

  const onClickLoginToEvent = () => {
    if (eventId) {
      postMutationClickLogin.mutate({
        eventId: eventId,
        token: accessToken,
      });
    }
  };
  const onClickLogout = () => {
    if (eventId) {
      deleteMutationClickLogout.mutate({
        eventId: eventId,
        token: accessToken,
      });
    }
  };

  const isAttendingEvent = eventId
    ? attendingEventsId?.includes(eventId)
    : false;

  console.log('isAttendingEvent', isAttendingEvent);

  const capacity = `${
    event?.numberOfAttendees ? String(event?.numberOfAttendees) : 0
  } / ${String(event?.maxCapacity)}`;

  return (
    <Container maxW={'5xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          {/* <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}
          >
            Our Story
          </Text> */}
          <Text>
            {status}
            {isLoading}
            {isFetching}
          </Text>
          <Heading>{event?.title}</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            {event?.description}
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            }
          >
            {event && (
              <>
                <Feature
                  icon={
                    <Icon as={IoHomeOutline} color={'yellow.500'} w={5} h={5} />
                  }
                  iconBg="yellow.100"
                  text={event?.place}
                />
                <Feature
                  icon={
                    <Icon
                      as={IoCalendarNumberOutline}
                      color={'green.900'}
                      w={5}
                      h={5}
                    />
                  }
                  iconBg="green.100"
                  text={getDateAsText(new Date(event.date))}
                />
                <Feature
                  icon={
                    <Icon
                      as={IoPeopleCircleOutline}
                      color={'red.900'}
                      w={5}
                      h={5}
                    />
                  }
                  iconBg="red.100"
                  text={capacity}
                />
              </>
            )}
            {event?.maxCapacity === event?.numberOfAttendees ? (
              <Button
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={onClickLogout}
              >
                neda sa prihlasit
              </Button>
            ) : isAttendingEvent ? (
              <Button
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={onClickLogout}
              >
                Odhlásiť sa
              </Button>
            ) : (
              <Button
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={onClickLoginToEvent}
              >
                Prihlásiť sa
              </Button>
            )}
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={
              'https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
            objectFit={'cover'}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
