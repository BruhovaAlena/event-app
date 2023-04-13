import React from 'react';
import {
  Box,
  Flex,
  Button,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdCalendarToday } from 'react-icons/md';

type EventCardProps = {
  title: string;
  description: string;
  date: string;

  onClickMore: () => void;
};

const Card = ({ title, description, onClickMore, date }: EventCardProps) => {
  let boxBg = useColorModeValue('white !important', '#111c44 !important');
  let secondaryBg = useColorModeValue('gray.50', 'whiteAlpha.100');
  let mainText = useColorModeValue('gray.800', 'white');

  return (
    <Flex
      borderRadius="20px"
      bg={boxBg}
      h="345px"
      w={{ base: '315px', md: '345px' }}
      direction="column"
      shadow="1px 1px 3px rgba(0,0,0,0.3)"
      borderColor="blue.400"
      borderWidth="1px"
    >
      <Box p="20px">
        <Box>
          <Text fontWeight="600" color={mainText} w="100%" fontSize="2xl">
            {title}
          </Text>
        </Box>
      </Box>
      <Flex
        bg={secondaryBg}
        w="100%"
        p="20px"
        borderBottomLeftRadius="inherit"
        borderBottomRightRadius="inherit"
        height="100%"
        direction="column"
      >
        <Text
          fontSize="sm"
          color="gray.500"
          lineHeight="24px"
          pe="40px"
          fontWeight="500"
          mb="auto"
        >
          {description}
        </Text>
        <Flex justifyContent="space-between">
          <Flex me="25px" alignItems="center">
            <Icon
              as={MdCalendarToday}
              w="20px"
              h="20px"
              me="6px"
              color="blue.400"
            />
            <Text color={mainText} fontSize="sm" my="auto" fontWeight="500">
              {date}
            </Text>
          </Flex>

          <Flex>
            <Button
              rounded={'full'}
              bg={'darkblue'}
              color={'white'}
              _hover={{
                bg: 'blue.400',
              }}
              onClick={onClickMore}
            >
              Viac o evente
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Card;
