import React, { useContext } from 'react';
import { Button, Heading, VStack, Spinner, Flex, Grid } from '@chakra-ui/react';
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

  const {
    data: attendingEvents,
    status,
    error,
  } = useQuery<Event[]>({
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
      background="url('https://images.unsplash.com/photo-1605707357299-9b4bf4dfb15a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')"
      height="150vh"
      bgSize="cover"
      justifyContent="center"
    >
      <VStack>
        <Heading size="2xl" mb={4} color="white" mt={10}>
          Zoznam eventov
        </Heading>

        {status === 'loading' && <Spinner />}
        {userInfo?.isOrganizer && (
          <Button
            mt={8}
            width={200}
            colorScheme="gray"
            color="black"
            onClick={() => navigate('/createEvent')}
          >
            Pridať nový event
          </Button>
        )}
        <Flex
          borderRadius="20px"
          width="1000px"
          direction="column"
          alignItems="center"
          paddingY="10"
        >
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {attendingEvents?.map((event) => (
              <Card
                key={event.id}
                description={event.description}
                title={event.title}
                date={getDateAsText(new Date(event.date))}
                onClickMore={() => navigate(`/eventDetails/${event.id}`)}
              />
            ))}
          </Grid>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default EventsList;
