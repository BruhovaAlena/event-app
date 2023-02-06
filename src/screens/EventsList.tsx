import React, { useContext } from 'react';
import {
  Button,
  Heading,
  VStack,
  Container,
  Spinner,
  Flex,
  Grid,
} from '@chakra-ui/react';
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
  console.log('attendingEvents', attendingEvents);

  return (
    <Container maxW="container.lg">
      <VStack>
        <Container maxW="container.md" textAlign="center">
          <Heading size="2xl" mb={4} color="gray.700" mt={10}>
            EVEnt list
          </Heading>

          {status === 'loading' && <Spinner />}
          {userInfo?.isOrganizer && (
            <Button mt={8} width={200} colorScheme="gray" color="black">
              Pridať nový event
            </Button>
          )}
          <Flex
            borderRadius="20px"
            width="1000px"
            direction="column"
            backgroundColor="gray.300"
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
        </Container>
      </VStack>
    </Container>
  );
};

export default EventsList;
