import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
  signOut,
} from 'firebase/auth';
import FirebaseApp from '../firebase-config';
import { UserData, userLogin, userRegistration } from '../utils/user';

type UserContextProps = {
  userInfo: UserData | undefined;
  setUserInfo: React.Dispatch<React.SetStateAction<UserData | undefined>>;
  onSignInSuccess: (data: UserData) => void;
  registerUser: (data: RegisterUserArgs) => Promise<UserCredential>;
  login: (data: LoginUserArgs) => Promise<void>;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  accessToken: string;
  logout: (onSuccess: () => void) => Promise<void>;
};
export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

type RegisterUserArgs = {
  email: string;
  password: string;
  name: string;
  surname: string;
  address: string;
  isOrganizer: boolean;
  onSuccess: () => void;
};
type LoginUserArgs = {
  email: string;
  password: string;
  onSuccess: (userData: UserData) => void;
};
const auth = getAuth(FirebaseApp);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserData | undefined>(undefined);

  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState('');

  const registerUser = async ({
    email,
    password,
    address,
    isOrganizer,
    name,
    surname,
    onSuccess,
  }: RegisterUserArgs) => {
    const firebaseResponse = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await firebaseResponse.user.getIdToken();

    await userRegistration({
      token: token,
      userData: {
        name: name,
        surname: surname,
        address: address,
        email: email,
        isOrganizer: isOrganizer,
        password: password,
      },
      onSuccess: onSuccess,
    });
  };

  const login = async ({ email, password, onSuccess }: LoginUserArgs) => {
    try {
      const firebaseResponse = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await auth.currentUser?.getIdToken();

      if (token) {
        setAccessToken(token);
        await userLogin({
          onSuccess: onSuccess,
          token: token,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async (onSuccess: () => void) => {
    await signOut(auth);
    setAccessToken('');
    setUserInfo(undefined);
    onSuccess();
  };

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     // setUserInfo(us);
  //     const uid = user?.uid
  //     setLoading(false);
  //   });

  //   return unsubscribe;
  // }, []);

  const onSignInSuccess = (data: UserData) => {
    setUserInfo(data);
  };

  return (
    <UserContext.Provider
      value={{
        setUserInfo,
        userInfo: userInfo,
        onSignInSuccess,
        login,
        setAccessToken,
        accessToken,
        logout,
        // @ts-ignore
        registerUser,
      }}
    >
      {/* {!loading && children} */}
      {children}
    </UserContext.Provider>
  );
};
