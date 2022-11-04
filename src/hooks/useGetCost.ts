import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../interfaces/redux';
import { MapPoint } from '../interfaces/trip';
import { obtainCalculatedCost } from '../redux/slices/trip';

export default (
  from: MapPoint | null,
  to: MapPoint | null,
  token: string | null
) => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(() => {
    if (!from || !to || !token) {
      return;
    }
    dispatch(
      obtainCalculatedCost({
        from: from.coordinates,
        to: to.coordinates,
        token,
      })
    );
  }, [from, to, token]);
};
