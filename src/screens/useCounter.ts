import React, { useState } from 'react';

export const useCounter = () => {
  const [count, setCount] = useState(0);

  const minus = () => {
    setCount(count - 1);
  };
  const plus = () => {
    setCount(count + 1);
  };

  return {
    count,
    minus,
    plus,
  };
};
