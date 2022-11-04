import axios from 'axios';

import { Trip, TripCordinates, TripPoints } from '../interfaces/trip';

const ENDPOINT = 'https://c39d-2803-9800-9021-45b7-16a-fc9f-dfcf-b599.ngrok.io/api'; //'https://fiuber-trips-aleacevedo.cloud.okteto.net/api';

export const calculateCost = async (trip: TripCordinates, token: string) => {
  try {
    const { data } = await axios.post(`${ENDPOINT}/costs/calculate`, trip, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data.result;
  } catch (e) {
    if (e.response) {
      const { error } = e.response.data;
      console.error(error);
      return undefined;
    }
    console.error(e.message);
    return undefined;
  }
};

export const createTrip = async (
  trip: TripPoints,
  token: string
): Promise<Trip> => {
  const { data } = await axios.post(`${ENDPOINT}/trips`, trip, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return data.result;
};

export const getAvailable = async (token: string) => {
  const { data } = await axios.get(`${ENDPOINT}/trips/available`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return data.result;
};

export const accept = async (id: string, token: string) => {
  const { data } = await axios.post(
    `${ENDPOINT}/trips/${id}/accept`,
    {},
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  return data.result;
};

export const getDriver = async (id: string, token: string) => {
  const { data } = await axios.get(`${ENDPOINT}/trips/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return data.result?.driverId;
};

export const getTripStatus = async (id: string, token: string) => {
  try {
    const { data } = await axios.get(`${ENDPOINT}/trips/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data.result?.status;
  } catch (e) {
    console.error(e.message);
    return undefined;
  }
};

export const finishTrip = async (id: string, token: string) => {
  const { data } = await axios.post(
    `${ENDPOINT}/trips/${id}/finish`,
    {},
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  return data.result;
};
