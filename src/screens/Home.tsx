import React, { useContext, useState } from 'react';
import {
  Heading,
  VStack,
  HStack,
  Spinner,
  Flex,
  Grid,
  Input,
  Select,
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

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('asc');

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setPageCount(pageNumber * PAGE_SIZE - PAGE_SIZE);
  };

  const {
    status,
    error,
    data: eventsData,
  } = useQuery<{ events: Event[]; totalCount: number }>({
    queryKey: [
      'events',
      {
        accessToken,
        PAGE_SIZE,
        pageCount,
        debouncedValue,
        selectedDate,
        selectedOrder,
      },
    ],
    queryFn: () =>
      getAllEvents({
        token: accessToken,
        numberOfEvents: PAGE_SIZE,
        skip: pageCount,
        searchTitle: debouncedValue,
        filterByDate: selectedDate,
        orderByDate: selectedOrder,
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
    <Flex
      background="url('https://images.unsplash.com/photo-1605707357299-9b4bf4dfb15a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')"
      height="150vh"
      bgSize="cover"
      justifyContent="center"
    >
      <VStack>
        <Heading size="2xl" mb={4} color="white" mt={10}>
          EVENTS, MEETUPS & CONFERENCES
        </Heading>

        {status === 'loading' && <Spinner />}
        <HStack>
          <Input
            textColor={'whiteAlpha.700'}
            placeholder="Vyhľadaj event"
            size="md"
            onChange={(ev) => setSearchInputValue(ev.target.value)}
            value={searchInputValue}
            alignSelf={'flex-start'}
          />

          <Select
            textColor={'whiteAlpha.700'}
            placeholder="Zobraz eventy"
            size="md"
            value={selectedDate}
            onChange={(ev) => setSelectedDate(ev.target.value)}
          >
            <option style={{ color: 'black' }} value="7days">
              Do 7 dní
            </option>
            <option style={{ color: 'black' }} value="30days">
              Do 30 dní
            </option>
            <option style={{ color: 'black' }} value="90days">
              Do 90 dní
            </option>
          </Select>
          <Select
            textColor={'whiteAlpha.700'}
            placeholder="Zoradenie eventov"
            size="md"
            value={selectedOrder}
            onChange={(ev) => setSelectedOrder(ev.target.value)}
          >
            <option style={{ color: 'black' }} value="asc">
              Vzostupne
            </option>
            <option style={{ color: 'black' }} value="desc">
              Zostupne
            </option>
          </Select>
        </HStack>

        {eventsData?.events && (
          <>
            <Flex
              borderRadius="20px"
              width="1000px"
              direction="column"
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
    </Flex>
  );
};

export default Home;
