import auth from '@react-native-firebase/auth';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ReduxState } from '../interfaces/redux';

export default () => {
  const [userToken, setUserToken] = React.useState<string | null>(null);
  const { logedIn } = useSelector((state: ReduxState) => state.auth);
  useEffect(() => {
    const getUserToken = async () => {
      const token = await auth().currentUser?.getIdToken();
      if (token) {
        setUserToken(token);
      }
    };

    getUserToken();
  }, [logedIn]);
  return userToken;
};
