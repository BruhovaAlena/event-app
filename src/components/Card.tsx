import React from 'react';
// Chakra imports
import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Button,
  Icon,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Assets
import { MdTimer, MdVideoLibrary, MdCalendarToday } from 'react-icons/md';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';

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
  let iconBox = useColorModeValue('gray.100', 'whiteAlpha.200');
  let iconColor = useColorModeValue('brand.200', 'white');
  return (
    <Flex
      borderRadius="20px"
      bg={boxBg}
      h="345px"
      w={{ base: '315px', md: '345px' }}
      direction="column"
      shadow="1px 1px 3px rgba(0,0,0,0.3)"
    >
      <Box p="20px">
        {/* <Flex w="100%" mb="10px">
          <Image src="https://i.ibb.co/ZWxRPRq/Venus-Logo.png" me="auto" />
        </Flex> */}
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
          {/* <Flex>
            <Icon
              as={MdVideoLibrary}
              w="20px"
              h="20px"
              me="6px"
              color="red.500"
            />
            <Text color={mainText} fontSize="sm" my="auto" fontWeight="500">
              Viac o evente
            </Text>
          </Flex> */}
          <Flex>
            <Button
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
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
