import axios from 'axios';

import { Trip, TripCordinates } from '../interfaces/trip';

const ENDPOINT = 'https://fiuber-trips-aleacevedo.cloud.okteto.net/api';

export const calculateCost = async (trip: TripCordinates, token: string) => {
  const { data } = await axios.post(`${ENDPOINT}/costs/calculate`, trip, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return data.result;
};

export const createTrip = async (trip: TripCordinates, token: string) => {
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
  console.log('data', data);
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
    console.log('data', data);
    return data.result?.status;
  } catch (e) {
    console.log('TOKEN ERROR', token);
    console.error(e.message);
    return undefined;
  }
};
