import axios from 'axios';

import { getFirebaseToken } from '../utils/firebase';

const ENDPOINT = 'https://0dba-2800-22c0-4000-4e7-104c-314f-1d77-5f13.ngrok.io';

export const createWallet = async () => {
  const token = await getFirebaseToken();

  try {
    const { data } = await axios.post(`${ENDPOINT}/wallet`, undefined, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data.result.result;
  } catch (e) {
    if (e.response) {
      const { error } = e.response;
      console.error('create wallet error response', e);
      return undefined;
    }
    console.error('create wallet', e.message);
    return undefined;
  }
};

export const getWallet = async (userId: string) => {
  const token = await getFirebaseToken();

  try {
    const { data } = await axios.get(`${ENDPOINT}/wallet/${userId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data.result;
  } catch (e) {
    if (e.response) {
      const { error } = e.response;
      console.error('create wallet error response', e);
      return undefined;
    }
    console.error('create wallet', e.message);
    return undefined;
  }
};

export const getBalance = async (userId: string) => {
  const token = await getFirebaseToken();

  try {
    const { data } = await axios.get(`${ENDPOINT}/balance/${userId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data.result;
  } catch (e) {
    if (e.response) {
      const { error } = e.response;
      console.error('get balance error response', e);
      return undefined;
    }
    console.error('get balance', e.message);
    return undefined;
  }
};

export const getLocked = async (userId: string) => {
  const token = await getFirebaseToken();

  try {
    const { data } = await axios.get(`${ENDPOINT}/locked/${userId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data.result;
  } catch (e) {
    if (e.response) {
      const { error } = e.response;
      console.error('get locked error response', e);
      return undefined;
    }
    console.error('get locked', e.message);
    return undefined;
  }
};

export const unlockWalletFunds = async (userId: string, amount: number) => {
  const token = await getFirebaseToken();

  try {
    const { data } = await axios.post(
      `${ENDPOINT}/withdraw`,
      {
        receiverId: userId,
        amountInEthers: amount.toString(),
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    return data.result;
  } catch (e) {
    if (e.response) {
      const { error } = e.response;
      console.error('unlock wallet funds error response', e);
      return undefined;
    }
    console.error('unlock wallet funds', e.message);
    return undefined;
  }
};

export const getUnlockStatus = async (hash: string) => {
  const token = await getFirebaseToken();

  try {
    const { data } = await axios.get(`${ENDPOINT}/withdraw/${hash}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data.result.state;
  } catch (e) {
    if (e.response) {
      const { error } = e.response;
      console.error('get unlock status error response', e);
      return undefined;
    }
    console.error('get unlock status', e.message);
    return undefined;
  }
};
