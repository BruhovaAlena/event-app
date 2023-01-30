import axios from 'axios';

type CreateEvent = {
  onAddSuccess: () => void;
  title: string;
  description: string;
  date: string;
  userId: string;
  place: string;
};

export const createEvent = async ({
  onAddSuccess,
  title,
  description,
  date,
  userId,
  place,
}: CreateEvent) => {
  try {
    await axios({
      method: 'post',
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url: '/events',
      data: {
        title,
        description,
        date,
        userId,
        place,
      },
    });

    onAddSuccess();
  } catch (error) {
    console.log('error', error);
  }
};

export const getAllEvents = async () => {
  const response = await axios({
    method: 'get',
    baseURL: process.env.REACT_APP_API_BASE_URL,
    url: 'events',
  });
  return response.data;
};

type GetEvent = {
  eventId: string;
};
export const getEvent = async ({ eventId }: GetEvent) => {
  const response = await axios({
    method: 'get',
    baseURL: process.env.REACT_APP_API_BASE_URL,
    url: `/events/${eventId}`,
  });
  // console.log('response.data', response.data);
  return response.data;
};

type GetAttendingEventIdsByUserId = {
  userId: string;
};
export const getAttendingEventIdsByUserId = async ({
  userId,
}: GetAttendingEventIdsByUserId) => {
  const response = await axios({
    method: 'get',
    baseURL: process.env.REACT_APP_API_BASE_URL,
    url: `/events/my-events-ids`,
    data: { userId },
  });
  console.log('response.data', response.data);
  return response.data;
};

type GetAttendingEventByUserId = {
  userId: string;
};
export const getAttendingEventByUserId = async ({
  userId,
}: GetAttendingEventByUserId) => {
  const response = await axios({
    method: 'get',
    baseURL: process.env.REACT_APP_API_BASE_URL,
    url: `/events/my-events`,
    data: { userId },
  });
  console.log('response.data', response.data);
  return response.data;
};

type LogToEvent = {
  eventId: string;
  userId: string;
};

export const logToEvent = async ({ userId, eventId }: LogToEvent) => {
  await axios({
    method: 'post',
    baseURL: process.env.REACT_APP_API_BASE_URL,
    url: '/events/login',
    data: {
      eventId,
      userId,
    },
  });
};

type LogoutFromEvent = {
  userId: string;
  eventId: string;
};

export const logoutFromEvent = async ({ eventId, userId }: LogoutFromEvent) => {
  await axios({
    method: 'delete',
    baseURL: process.env.REACT_APP_API_BASE_URL,
    url: `/events/logout`,
    data: {
      userId,
      eventId,
    },
  });
};
