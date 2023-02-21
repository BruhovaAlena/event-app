import React, { useContext, useState } from 'react';
import {
  Heading,
  VStack,
  Container,
  Spinner,
  Flex,
  Grid,
  Input,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useQuery } from '@tanstack/react-query';
import { getAllEvents } from '../utils/event';
import { Event } from '../types/event';
import Card from '../components/Card';
import { getDateAsText } from '../utils/date';
import Pagination from '../components/Pagination';
import useDebounce from '../hooks/useDebounce';

const PAGE_SIZE = 4;

const Home = () => {
  const navigate = useNavigate();
  const { accessToken } = useContext(UserContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [searchInputValue, setSearchInputValue] = useState('');
  const debouncedValue = useDebounce<string>(searchInputValue, 500);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setPageCount(pageNumber * PAGE_SIZE - PAGE_SIZE);
  };

  const {
    status,
    error,
    data: eventsData,
  } = useQuery<{ events: Event[]; totalCount: number }>({
    queryKey: ['events', { accessToken, PAGE_SIZE, pageCount, debouncedValue }],
    queryFn: () =>
      getAllEvents({
        token: accessToken,
        numberOfEvents: PAGE_SIZE,
        skip: pageCount,
        searchTitle: debouncedValue,
      }),
  });

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      setPageCount(pageCount - PAGE_SIZE);
    }
  };

  const nextPage = () => {
    if (
      eventsData?.events &&
      currentPage !== Math.ceil(eventsData.totalCount / PAGE_SIZE)
    ) {
      setCurrentPage(currentPage + 1);
      setPageCount(pageCount + PAGE_SIZE);
    }
  };

  return (
    <Container maxW="container.lg">
      <VStack>
        <Heading size="2xl" mb={4} color="gray.700" mt={10}>
          EVENTS, MEETUPS & CONFERENCES
        </Heading>

        {status === 'loading' && <Spinner />}

        <Input
          placeholder="Vyhľadaj event"
          size="md"
          onChange={(ev) => setSearchInputValue(ev.target.value)}
          value={searchInputValue}
          width="200"
          alignSelf={'flex-start'}
        />
        {eventsData?.events && (
          <>
            <Flex
              borderRadius="20px"
              width="1000px"
              direction="column"
              backgroundColor="gray.300"
              alignItems="center"
              paddingY="10"
            >
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                {eventsData.events.map((event) => (
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
            <Pagination
              datasPerPage={PAGE_SIZE}
              totalDatas={eventsData.totalCount}
              paginate={paginate}
              previousPage={previousPage}
              nextPage={nextPage}
              currentPage={currentPage}
            />{' '}
          </>
        )}
      </VStack>
    </Container>
  );
};

export default Home;
