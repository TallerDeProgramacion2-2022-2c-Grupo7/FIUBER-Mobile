import axios from 'axios';

import { getFirebaseToken } from '../utils/firebase';

const ENDPOINT = 'https://fiuber-ratings-guidobergman.cloud.okteto.net/';

export const getRating = async (userId: string) => {
  const token = await getFirebaseToken();

   const { data } = await axios.get(`${ENDPOINT}/${userId}/average`, {
     headers: {
       Authorization: `${token}`,
     },
   });
   return data.result;
};

export const addRating = async ( idTrip: string, idUserScored: string, value: number, idUserScorer: string) => {
  const token = await getFirebaseToken();

    const { data } = await axios.post(
      `${ENDPOINT}/`,
      {  id_trip: idTrip ,
         id_user_scored: idUserScored, 
         value: vaulue,
         idUserScorer: string 
     },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

     return data.result;
};
