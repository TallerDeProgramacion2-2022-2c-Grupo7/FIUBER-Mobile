import auth from '@react-native-firebase/auth';
import axios from 'axios';

const ENDPOINT = 'https://fiuber-metrics-matias-huenul.cloud.okteto.net/';

export const createEvent = async (eventType: string) => {
  const uid = auth().currentUser.uid;
  const token = auth().currentUser.getIdToken();
  const { data } = await axios.post(`${ENDPOINT}/${eventType}?uid=${uid}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return data.result;
};
