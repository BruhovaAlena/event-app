import axios from 'axios';

export type User = {
  email: string;
  name: string;
  surname: string;
  address: string;
  password: string;
  isOrganizer: boolean;
};

type UserRegistration = {
  userData: User;
  onSuccess: () => void;
  token: string;
};

export const userRegistration = async ({
  onSuccess,
  userData,
  token,
}: UserRegistration) => {
  try {
    const response = await axios({
      method: 'post',
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url: '/user/register',
      headers: {
        Authorization: `Bearer ${token}`,
      },

      data: {
        name: userData.name,
        surname: userData.surname,
        address: userData.address,
        email: userData.email,
        password: userData.password,
        isOrganizer: userData.isOrganizer,
      },
    });

    onSuccess();
  } catch (error) {
    console.log('error', error);
  }
};

export type UserData = {
  id: string;
  email: string;
  name: string;
  surname: string;
  address: string;
  password: string;
  isOrganizer: boolean;
};

type SignIn = {
  onSuccess: (user: UserData) => void;
  onFail?: () => void;
  token: string;
};

export const userLogin = async ({ onFail, onSuccess, token }: SignIn) => {
  try {
    const response = await axios<UserData | null>({
      method: 'post',
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url: '/user/login',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = response.data;

    if (user?.id) {
      await onSuccess(user);
    }
  } catch (error) {
    console.log('error prihlasenie', error);
    onFail?.();
  }
};
