import {
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Button,
  HStack,
  Spinner,
} from '@chakra-ui/react';
import {
  IoHomeOutline,
  IoPeopleCircleOutline,
  IoCalendarNumberOutline,
  IoTimeOutline,
} from 'react-icons/io5';
import { ReactElement, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteEvent,
  getAttendingEventIdsByUserId,
  getEvent,
  logoutFromEvent,
  logToEvent,
} from '../utils/event';
import { Event } from '../types/event';
import { useNavigate, useParams } from 'react-router-dom';
import { getDateAsText, getTimeAsText } from '../utils/date';
import { UserContext } from '../context/UserContext';
import CountdownTimer from '../components/CountdownTimer';

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'} marginBottom={5}>
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

  const postMutationClickLogin = useMutation({
    mutationFn: logToEvent,
    onSuccess: (data) => {
      queryClient.setQueryData(['event', eventId], data);
      queryClient.invalidateQueries(['event']);
      alert('Prihlásenie sa úspešne podarilo.');
    },
    onError: () => {
      alert('Prihlásenie sa nepodarilo.');
    },
  });
  const deleteMutationClickLogout = useMutation({
    mutationFn: logoutFromEvent,
    onSuccess: (data) => {
      queryClient.setQueryData(['events', eventId], data);
      queryClient.invalidateQueries(['events'], { exact: true });
      alert('Odhlásenie sa podarilo.');
    },
    onError: () => {
      alert('Odhlásenie sa nepodarilo.');
    },
  });

  const deleteMutationClickDeleteEvent = useMutation({
    mutationFn: deleteEvent,
    onSuccess: (data) => {
      queryClient.setQueryData(['events', eventId], data);
      queryClient.invalidateQueries(['events'], { exact: true });
      navigate('/home');
      alert('Event vymazaný.');
    },
    onError: () => {
      alert('Vymazanie sa nepodarilo.');
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
  const onClickDeleteEvent = () => {
    if (eventId) {
      deleteMutationClickDeleteEvent.mutate({
        eventId: eventId,
        token: accessToken,
      });
    }
  };

  const isAttendingEvent = eventId
    ? attendingEventsId?.includes(eventId)
    : false;

  const capacity = `${
    event?.numberOfAttendees ? String(event?.numberOfAttendees) : 0
  } / ${String(event?.maxCapacity)}`;

  const eventDateInMsFromNow = event ? new Date(event?.date).getTime() : null;

  return (
    <Flex bgColor="whiteAlpha.900" justifyContent="center" height="100vh">
      {status === 'loading' && <Spinner />}
      <Flex
        borderRadius="20px"
        width="full"
        paddingY="10"
        backgroundColor={'whiteAlpha.800'}
        marginTop="10"
        mx={{ base: '10px', md: '80px' }}
        height="fit-content"
        borderColor="blue.400"
        borderWidth="1px"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
      >
        <Flex
          paddingLeft="10"
          paddingRight="10"
          flexDir={{ base: 'column', lg: 'row' }}
          gap="10px"
        >
          <Stack spacing={4} width={{ lg: '50%', base: '100%' }}>
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
                      <Icon
                        as={IoHomeOutline}
                        color={'yellow.500'}
                        w={5}
                        h={5}
                      />
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
                        as={IoTimeOutline}
                        color={'purple.900'}
                        w={5}
                        h={5}
                      />
                    }
                    iconBg="purple.100"
                    text={getTimeAsText(new Date(event.date))}
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
                <Text>
                  Kapacita bola naplnená. Na event sa už nedá prihlásiť.
                </Text>
              ) : isAttendingEvent ? (
                <Button
                  rounded={'full'}
                  bg={'darkblue'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.400',
                  }}
                  onClick={onClickLogout}
                >
                  Odhlásiť sa
                </Button>
              ) : (
                <Button
                  rounded={'full'}
                  bg={'darkblue'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.400',
                  }}
                  onClick={onClickLoginToEvent}
                >
                  Prihlásiť sa
                </Button>
              )}
            </Stack>
          </Stack>
          <Flex flexDirection={'column'} width={{ lg: '50%', base: '100%' }}>
            {eventDateInMsFromNow && (
              <CountdownTimer targetDate={eventDateInMsFromNow} />
            )}
            <Image
              rounded={'md'}
              alt={'feature image'}
              src={
                'https://images.unsplash.com/photo-1558008258-3256797b43f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80'
              }
              objectFit={'cover'}
            />
            {userInfo?.isOrganizer && userInfo.id === event?.userId && (
              <HStack marginTop="10">
                <Button
                  variant="link"
                  color={'darkblue'}
                  onClick={() => navigate(`/editEvent/${eventId}`)}
                >
                  Upraviť event
                </Button>
                <Button
                  variant="link"
                  color={'darkblue'}
                  onClick={onClickDeleteEvent}
                >
                  Vymazať event
                </Button>
              </HStack>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
