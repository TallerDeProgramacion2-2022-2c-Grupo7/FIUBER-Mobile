import axios from 'axios';

import { getFirebaseToken } from '../utils/firebase';

const ENDPOINT = 'https://fiuber-ratings-guidobergman.cloud.okteto.net';

export const getRating = async (userId: string) => {
  const token = await getFirebaseToken();
  try {
    const { data } = await axios.get(`${ENDPOINT}/${userId}/average`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (e) {
    if (e.response) {
      const { error } = e.response;
      console.error('GET RATING ERROR WITH RESPONSE: ', e);
      console.error('GET RATING ERROR WITH RESPONSE: ', e.data);
      return undefined;
    }
    console.error('GET RATING ERROR: ', e.message);
    return undefined;
  }
};

export const addRating = async (
  idTrip: string,
  idUserScored: string,
  value: number,
  idUserScorer: string
) => {
  const token = await getFirebaseToken();

  try {
    const { data } = await axios.post(
      `${ENDPOINT}/`,
      {
        id_trip: idTrip,
        id_user_scored: idUserScored,
        value: value,
        id_user_scorer: idUserScorer,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data.result;
  } catch (e) {
    if (e.response) {
      console.error('POST RATING ERROR WITH RESPONSE: ', e);
      console.error('POST RATING ERROR WITH RESPONSE: ', e.response);
      return undefined;
    }
    console.error('POST RATING ERROR: ', e.message);
    return undefined;
  }
};
