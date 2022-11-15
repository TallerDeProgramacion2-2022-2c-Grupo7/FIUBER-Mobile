import { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';

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
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);
};
