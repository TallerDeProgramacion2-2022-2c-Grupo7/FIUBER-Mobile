import axios from 'axios';

import { getFirebaseToken } from '../utils/firebase';

export const getRating = async (userId: string) => {
  const token = await getFirebaseToken();

  // const { data } = await axios.get(`${ENDPOINT}/trips/available`, {
  //   headers: {
  //     Authorization: `${token}`,
  //   },
  // });
  // return data.result;

  return 5 * Math.random();
};

export const addRating = async (userId: string, rating: number) => {
  const token = await getFirebaseToken();

  // const { data } = await axios.get(`${ENDPOINT}/trips/available`, {
  //   headers: {
  //     Authorization: `${token}`,
  //   },
  // });
  // return data.result;

  return 5 * Math.random();
};
