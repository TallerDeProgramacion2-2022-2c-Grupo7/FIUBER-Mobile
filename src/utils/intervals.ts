import { setStatus } from '../redux/slices/trip';
import { getTripStatus } from '../services/trips';

export const keepStatusUpdated = (dispatch: any, getState: any) => {
  return setInterval(async () => {
    const { id } = getState().trip;
    if (!id) {
      return;
    }
    const status = await getTripStatus(id);
    if (status) {
      return dispatch(setStatus(status));
    }
  }, 1000);
};
