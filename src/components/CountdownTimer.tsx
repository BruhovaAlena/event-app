import { Box, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { useCountdown } from '../hooks/useCountdown';
import DateTimeDisplay from './DateTimeDisplay';

const ExpiredNotice = () => {
  return (
    <Box>
      <Text>Event sa už konal.</Text>
    </Box>
  );
};

type ShowCounerArgs = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const ShowCounter = ({ days, hours, minutes, seconds }: ShowCounerArgs) => {
  return (
    <Box>
      <Text>Do začiatku ostáva:</Text>
      <HStack>
        <DateTimeDisplay value={days} typeOfValue={'Dní'} />
        <Text>:</Text>
        <DateTimeDisplay value={hours} typeOfValue={'Hod.'} />
        <Text>:</Text>
        <DateTimeDisplay value={minutes} typeOfValue={'Min.'} />
        <Text>:</Text>
        <DateTimeDisplay value={seconds} typeOfValue={'Sek.'} />
      </HStack>
    </Box>
  );
};

type CountDownTimerProps = {
  targetDate: number;
};

const CountdownTimer = ({ targetDate }: CountDownTimerProps) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};
export default CountdownTimer;
