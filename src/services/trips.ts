import axios from 'axios';

import { Trip, TripCordinates, TripPoints } from '../interfaces/trip';
import { getFirebaseToken } from '../utils/firebase';

const ENDPOINT = 'https://fiuber-trips-aleacevedo.cloud.okteto.net/api';

export const calculateCost = async (trip: TripCordinates) => {
  const token = await getFirebaseToken();

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

export const createTrip = async (trip: TripPoints): Promise<Trip> => {
  const token = await getFirebaseToken();

  const { data } = await axios.post(`${ENDPOINT}/trips`, trip, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return data.result;
};

export const getAvailable = async () => {
  const token = await getFirebaseToken();

  const { data } = await axios.get(`${ENDPOINT}/trips/available`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return data.result;
};

export const accept = async (id: string) => {
  const token = await getFirebaseToken();

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

export const reject = async (id: string) => {
  const token = await getFirebaseToken();

  const { data } = await axios.post(
    `${ENDPOINT}/trips/${id}/reject`,
    {},
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  return data.result;
};

export const getDriver = async (id: string) => {
  const token = await getFirebaseToken();

  const { data } = await axios.get(`${ENDPOINT}/trips/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return data.result?.driverId;
};

export const getTripStatus = async (id: string) => {
  const token = await getFirebaseToken();

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

export const getTrip = async (id: string) => {
  const token = await getFirebaseToken();

  try {
    const { data } = await axios.get(`${ENDPOINT}/trips/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data.result;
  } catch (e) {
    console.error(e.message);
    return undefined;
  }
};

export const start = async (id: string) => {
  const token = await getFirebaseToken();

  const { data } = await axios.post(
    `${ENDPOINT}/trips/${id}/start`,
    {},
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  return data.result;
};

export const finishTrip = async (id: string) => {
  const token = await getFirebaseToken();

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
