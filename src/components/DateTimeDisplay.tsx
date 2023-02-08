import { HStack, Text } from '@chakra-ui/react';
import React from 'react';

type DateTimeDisplayProps = {
  value: number;
  typeOfValue: string;
};

const DateTimeDisplay = ({ typeOfValue, value }: DateTimeDisplayProps) => {
  return (
    <HStack>
      <Text fontWeight={600}>{value}</Text>
      <Text fontWeight={600}>{typeOfValue}</Text>
    </HStack>
  );
};

export default DateTimeDisplay;
