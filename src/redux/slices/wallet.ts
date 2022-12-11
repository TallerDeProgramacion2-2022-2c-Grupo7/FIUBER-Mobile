import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ReduxState, WalletState } from '../../interfaces/redux';
import {
  createWallet,
  getBalance,
  getLocked,
  getWallet,
} from '../../services/wallet';

const INITIAL_STATE: WalletState = {
  init: false,
  balance: undefined,
  locked: undefined,
  publicKey: '',
};

export const initWallet = createAsyncThunk<WalletState, any>(
  'wallet/init',
  async ({ uid }) => {
    let wallet = await getWallet(uid);

    if (!wallet) {
      wallet = await createWallet();
    }

    const strBalance = await getBalance(wallet.uid);
    const strLocked = await getLocked(wallet.uid);

    const balance = parseFloat(strBalance);
    const locked = parseFloat(strLocked);

    return { balance, locked, publicKey: wallet.publicKey, init: true };
  }
);

export const updateBalance = createAsyncThunk<number, void>(
  'wallet/updateBalance',
  async (_, { getState }) => {
    const {
      auth: { user },
      wallet,
    } = getState() as ReduxState;

    if (!user || !wallet.init) {
      throw new Error('User not logged in');
    }

    const strBalance = await getBalance(user.uid);

    const balance = parseFloat(strBalance);

    return balance;
  }
);

export const updateLocked = createAsyncThunk<number, void>(
  'wallet/updateLockedBalance',
  async (_, { getState }) => {
    const {
      auth: { user },
      wallet,
    } = getState() as ReduxState;

    if (!user || !wallet.init) {
      throw new Error('User not logged in');
    }

    const strLocked = await getLocked(user.uid);

    const locked = parseFloat(strLocked);

    return locked;
  }
);

const walletSlice = createSlice({
  name: 'wallet',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initWallet.fulfilled, (state, action) => {
      state.init = true;
      state.balance = action.payload.balance;
      state.publicKey = action.payload.publicKey;
    });
    builder.addCase(updateBalance.fulfilled, (state, action) => {
      state.balance = action.payload;
    });
    builder.addCase(updateLocked.fulfilled, (state, action) => {
      state.locked = action.payload;
    });
  },
});

export default walletSlice.reducer;
