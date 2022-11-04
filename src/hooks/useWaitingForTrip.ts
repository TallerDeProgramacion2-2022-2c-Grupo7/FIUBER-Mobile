import { useCallback, useEffect } from 'react';
import { InteractionManager } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, ReduxState } from '../interfaces/redux';
import { setTrip } from '../redux/slices/trip';
import { getAvailable } from '../services/trips';

export default (token: string | null) => {
  const dispatch = useDispatch<AppDispatch>();
  const { trip } = useSelector((state: ReduxState) => state);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (token && !trip.id) {
        const availableTrip = await getAvailable(token);
        if (availableTrip) {
          dispatch(setTrip(availableTrip));
        }
      }
    });

    return () => {
      console.log('Canceling waiting trip');
      clearInterval(interval);
    };
  }, [token, trip.id]);
};
