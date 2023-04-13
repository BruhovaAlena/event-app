import React, { useContext, useState } from 'react';
import { Heading, Spinner, Flex, Input, Select } from '@chakra-ui/react';
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

  const { status, data: eventsData } = useQuery<{
    events: Event[];
    totalCount: number;
  }>({
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
      <Flex flexDir={{ base: 'column', lg: 'row' }} gap="10px">
        <Input
          textColor="darkblue"
          placeholder="Vyhľadaj event"
          size="md"
          onChange={(ev) => setSearchInputValue(ev.target.value)}
          value={searchInputValue}
          alignSelf={'flex-start'}
          focusBorderColor="darkblue"
          _placeholder={{ color: 'black' }}
        />

        <Select
          focusBorderColor="darkblue"
          textColor={'black'}
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
          focusBorderColor="darkblue"
          textColor={'black'}
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
      </Flex>
      {eventsData?.events && (
        <>
          <Flex
            flexDir={{ base: 'column', md: 'row' }}
            gap="10px"
            flexWrap={{ md: 'wrap' }}
            justifyContent={'center'}
            alignItems="center"
            w="full"
            paddingY="10"
          >
            {eventsData.events.map((event) => (
              <Card
                key={event.id}
                description={event.description}
                title={event.title}
                date={getDateAsText(new Date(event.date))}
                onClickMore={() => navigate(`/eventDetails/${event.id}`)}
              />
            ))}
          </Flex>
          <Pagination
            datasPerPage={PAGE_SIZE}
            totalDatas={eventsData.totalCount}
            paginate={paginate}
            previousPage={previousPage}
            nextPage={nextPage}
            currentPage={currentPage}
          />
        </>
      )}
    </Flex>
  );
};

export default Home;
