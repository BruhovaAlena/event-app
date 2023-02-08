import { useEffect, useState } from 'react';

export const useCountdown = (targetDateInMs: number) => {
  const countDownDate = new Date(targetDateInMs).getTime();
  const nowInMs = new Date().getTime();
  const differenceBetweenTargetAndNowInMs = countDownDate - nowInMs;

  const [countDown, setCountDown] = useState(differenceBetweenTargetAndNowInMs);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(differenceBetweenTargetAndNowInMs);
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate, differenceBetweenTargetAndNowInMs]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};
