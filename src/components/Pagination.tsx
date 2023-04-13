import React from 'react';
import { Button, Stack, Text } from '@chakra-ui/react';
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';

type PaginationProps = {
  datasPerPage: number;
  totalDatas: number;
  paginate: (value: number) => void;
  nextPage?: () => void;
  previousPage?: () => void;
  currentPage: number;
};

const Pagination = ({
  datasPerPage,
  totalDatas,
  paginate,
  previousPage,
  nextPage,
  currentPage,
}: PaginationProps) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalDatas / datasPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Stack direction="row" spacing={4}>
      <Button
        leftIcon={<IoArrowBackOutline />}
        colorScheme="blue"
        variant="outline"
        onClick={previousPage}
      ></Button>
      {pageNumbers.map((number) => {
        const isPreviousPage = currentPage - 1 === number;
        const isCurrentPage = currentPage === number;
        const isNextPage = currentPage + 1 === number;
        const isFirstPage = number === pageNumbers[0];
        const isLastPage = number === pageNumbers[pageNumbers.length - 1];
        const isDots = currentPage - 2 === number || currentPage + 2 === number;

        if (
          isPreviousPage ||
          isCurrentPage ||
          isNextPage ||
          isFirstPage ||
          isLastPage
        ) {
          return (
            <Button
              key={number}
              onClick={() => paginate(number)}
              backgroundColor={number === currentPage ? 'darkblue' : 'white'}
              color={number === currentPage ? 'white' : 'darkblue'}
              _hover={{ backgroundColor: 'blue.700' }}
            >
              {number}
            </Button>
          );
        }
        if (isDots) {
          return <Text>...</Text>;
        }

        return null;
      })}
      /
      <Button
        rightIcon={<IoArrowForwardOutline />}
        colorScheme="blue"
        variant="outline"
        onClick={nextPage}
      ></Button>
    </Stack>
  );
};

export default Pagination;
