import { useCallback, useEffect } from 'react';
import { InteractionManager } from 'react-native';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../interfaces/redux';
import { setStatus } from '../redux/slices/trip';
import { getTripStatus } from '../services/trips';
import { delay } from '../utils';

export default (tripId: string | null, token: string | null) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!tripId || !token) {
        return undefined;
      }
      const status = await getTripStatus(tripId, token);
      console.log('Trip status: ', tripId, status);
      if (status) {
        dispatch(setStatus(status));
      }
    }, 5000);
    return () => {
      console.log('Canceling update trip status');
      clearInterval(interval);
    };
  }, [token, tripId]);
};
