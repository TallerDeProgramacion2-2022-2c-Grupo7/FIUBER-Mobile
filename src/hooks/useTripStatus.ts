import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

import { AppDispatch, ReduxState } from '../interfaces/redux';
import { setStatus } from '../redux/slices/trip';
import { getTripStatus } from '../services/trips';

export default () => {
  const dispatch = useDispatch<AppDispatch>();
  const { getState } = useStore<ReduxState>();
  useEffect(() => {
    const interval = setInterval(async () => {
      const { id } = getState().trip;
      if (!id) {
        return dispatch(setStatus(null));
      }
      const status = await getTripStatus(id);
      if (status) {
        dispatch(setStatus(status));
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
};
