import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type UserContextProps = {
  userInfo: UserData;
  setUserInfo: React.Dispatch<React.SetStateAction<UserData>>;
  onSignInSuccess: (data: UserData) => void;
};
export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

type UserData = {
  id: string;
  email: string;
  name: string;
  surname: string;
  address: string;
  password: string;
  isOrganizer: boolean;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserData>({
    address: '',
    email: '',
    id: '',
    isOrganizer: false,
    name: '',
    password: '',
    surname: '',
  });
  console.log('userInfo', userInfo);
  const onSignInSuccess = (data: UserData) => {
    setUserInfo(data);
  };

  return (
    <UserContext.Provider
      value={{
        setUserInfo,
        userInfo,
        onSignInSuccess,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
