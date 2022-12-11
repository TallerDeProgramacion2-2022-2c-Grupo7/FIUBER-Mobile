import axios from 'axios';

const ENDPOINT = 'https://fiuber-metrics-matias-huenul.cloud.okteto.net';

export const createEvent = async (
  eventType: string,
  uid: string,
  token: string
) => {
  try {
    if (!uid || !token) {
      return;
    }
    const { data } = await axios.post(
      `${ENDPOINT}/${eventType}?uid=${uid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
