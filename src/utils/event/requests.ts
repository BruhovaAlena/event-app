import axios from 'axios';

type CreateEvent = {
  onAddSuccess: () => void;
  title: string;
  description: string;
  date: string;
  userId: string;
  place: string;
  token: string;
  maxCapacity: number;
};

export const createEvent = async ({
  onAddSuccess,
  title,
  description,
  date,
  userId,
  place,
  token,
  maxCapacity,
}: CreateEvent) => {
  try {
    await axios({
      method: 'post',
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url: '/events/createEvent',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        title,
        description,
        date,
        userId,
        place,
        maxCapacity,
      },
    });

    onAddSuccess();
  } catch (error) {
    console.log('error', error);
  }
};

type GetEvents = {
  token: string;
  skip?: number;
  numberOfEvents?: number;
  searchTitle?: string;
};

export const getAllEvents = async ({
  token,
  numberOfEvents,
  skip,
  searchTitle,
}: GetEvents) => {
  const response = await axios({
    method: 'get',
    baseURL: process.env.REACT_APP_API_BASE_URL,
    url: `/events`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      skip,
      numberOfEvents,
      searchTitle,
    },
  });
  return response.data;
};

type GetEvent = {
  eventId: string;
  token: string;
};
export const getEvent = async ({ eventId, token }: GetEvent) => {
  const response = await axios({
    method: 'get',
    baseURL: process.env.REACT_APP_API_BASE_URL,
    url: `/events/${eventId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

type GetAttendingEventIdsByUserId = {
  userId: string;
  token: string;
};
export const getAttendingEventIdsByUserId = async ({
  userId,
  token,
}: GetAttendingEventIdsByUserId) => {
  const response = await axios({
    method: 'get',
    baseURL: process.env.REACT_APP_API_BASE_URL,
    url: `/events/my-events-ids`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { userId },
  });

  return response.data;
};

type GetAttendingEventByUserId = {
  userId: string;
  token: string;
};
export const getAttendingEventByUserId = async ({
  userId,
  token,
}: GetAttendingEventByUserId) => {
  const response = await axios({
    method: 'get',
    baseURL: process.env.REACT_APP_API_BASE_URL,
    url: `/events/my-events`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { userId },
  });

  return response.data;
};

type LogToEvent = {
  eventId: string;
  token: string;
};

export const logToEvent = async ({ eventId, token }: LogToEvent) => {
  await axios({
    method: 'post',
    baseURL: process.env.REACT_APP_API_BASE_URL,
    url: '/events/login',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      eventId,
    },
  });
};

type LogoutFromEvent = {
  eventId: string;
  token: string;
};

export const logoutFromEvent = async ({ eventId, token }: LogoutFromEvent) => {
  await axios({
    method: 'delete',
    baseURL: process.env.REACT_APP_API_BASE_URL,
    url: `/events/logout`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      eventId,
    },
  });
};

type EditEvent = {
  eventId: string;
  token: string;
  date: string;
  description: string;
  maxCapacity: number;
  place: string;
  title: string;
};

export const editEvent = async ({
  eventId,
  token,
  date,
  description,
  maxCapacity,
  place,
  title,
}: EditEvent) => {
  await axios({
    method: 'put',
    baseURL: process.env.REACT_APP_API_BASE_URL,
    url: `/events/editEvent/${eventId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      date,
      description,
      maxCapacity,
      place,
      title,
    },
  });
};

type DeleteEvent = {
  eventId: string;
  token: string;
};

export const deleteEvent = async ({ eventId, token }: DeleteEvent) => {
  await axios({
    method: 'delete',
    baseURL: process.env.REACT_APP_API_BASE_URL,
    url: `/events/deleteEvent`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      eventId,
    },
  });
};
