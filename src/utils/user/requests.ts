import axios from 'axios';
import { FormValues } from '../../screens/Register';

type UserRegistration = {
  userData: FormValues;
  onSuccess: () => void;
};

export const userRegistration = async ({
  onSuccess,
  userData,
}: UserRegistration) => {
  try {
    const response = await axios({
      method: 'post',
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url: '/register',

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

export type User = {
  id: string;
  email: string;
  name: string;
  surname: string;
  address: string;
  password: string;
  isOrganizer: boolean;
};

type SignIn = {
  onSuccess: (user: User) => void;
  onFail?: () => void;
  email: string;
  password: string;
};

export const userLogin = async ({
  onFail,
  onSuccess,
  email,
  password,
}: SignIn) => {
  try {
    const response = await axios<User | null>({
      method: 'post',
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url: '/login',

      data: { email, password },
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

// export const getUserProfile = async ({
//   onSuccess,
//   token,
//   toast,
// }: GetUserProfile) => {
//   try {
//     const response = await axios({
//       method: 'get',
//       baseURL: API_BASE_URL,
//       url: '/profile',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (response.data) {
//       onSuccess?.(response.data as UserInfo);
//     }
//     return response.data as UserInfo;
//   } catch (error) {
//     toast.show('Niečo nieje v poriadku.', {
//       type: 'errorBottom',
//     });
//   }
// };
