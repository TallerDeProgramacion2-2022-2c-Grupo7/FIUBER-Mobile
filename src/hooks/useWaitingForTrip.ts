import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { WAIT_FOR_TRIP } from '../constants/trip';
import { AppDispatch, ReduxState } from '../interfaces/redux';
import { setTrip } from '../redux/slices/trip';
import { getAvailable } from '../services/trips';

export default () => {
  const dispatch = useDispatch<AppDispatch>();
  const { trip } = useSelector((state: ReduxState) => state);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!trip.id) {
        const availableTrip = await getAvailable();
        if (availableTrip) {
          dispatch(setTrip(availableTrip));
        }
      }
    }, WAIT_FOR_TRIP);

    return () => {
      clearInterval(interval);
    };
  }, []);
};
