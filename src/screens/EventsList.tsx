import React, { useContext } from 'react';
import { Button, Heading, Spinner, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useQuery } from '@tanstack/react-query';
import { getAttendingEventByUserId } from '../utils/event';
import { Event } from '../types/event';
import Card from '../components/Card';
import { getDateAsText } from '../utils/date';

const EventsList = () => {
  const navigate = useNavigate();
  const { userInfo, accessToken } = useContext(UserContext);

  const { data: attendingEvents, status } = useQuery<Event[]>({
    enabled: Boolean(userInfo?.id),
    queryKey: ['attendingEvents', userInfo!.id],
    queryFn: () =>
      getAttendingEventByUserId({
        userId: userInfo!.id,
        token: accessToken,
      }),
  });

  return (
    <Flex
      flexDir="column"
      alignItems="center"
      bgColor="whiteAlpha.900"
      height="100vh"
    >
      <Heading
        mt="40px"
        mb="30px"
        color="blue.400"
        size={{ base: 'xl', md: '2xl' }}
        textAlign={'center'}
      >
        EVENTS, MEETUPS & CONFERENCES
      </Heading>
      {status === 'loading' && <Spinner />}
      {userInfo?.isOrganizer && (
        <Button
          rounded={'full'}
          mt={8}
          width={200}
          colorScheme="gray"
          color="black"
          onClick={() => navigate('/createEvent')}
          _hover={{
            bg: 'blue.400',
          }}
        >
          Pridať nový event
        </Button>
      )}

      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        gap="10px"
        flexWrap={{ md: 'wrap' }}
        justifyContent={'center'}
        alignItems="center"
        w="full"
        paddingY="10"
      >
        {attendingEvents?.map((event) => (
          <Card
            key={event.id}
            description={event.description}
            title={event.title}
            date={getDateAsText(new Date(event.date))}
            onClickMore={() => navigate(`/eventDetails/${event.id}`)}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default EventsList;
