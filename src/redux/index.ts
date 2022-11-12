import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import authReducer from './slices/auth';
import profileReducer from './slices/profile';
import tripReducer from './slices/trip';

// const authPersistConfig = {
//   key: 'auth',
//   storage: AsyncStorage,
// };

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  trip: tripReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
