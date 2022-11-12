import React, { useEffect } from 'react';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export default () => {
  const [locationPermission, setLocationPermission] = React.useState(false);
  useEffect(() => {
    const askPermissions = async () => {
      switch (await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)) {
        case RESULTS.UNAVAILABLE:
        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          console.error('Not coarse location available');
          return;
        case RESULTS.DENIED:
          switch (await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)) {
            case RESULTS.UNAVAILABLE:
            case RESULTS.BLOCKED:
            case RESULTS.LIMITED:
            case RESULTS.DENIED:
              console.error('Not coarse location available');
              return;
          }
      }
      switch (await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)) {
        case RESULTS.UNAVAILABLE:
        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          console.error('Not fine location available');
          break;
        case RESULTS.DENIED:
          switch (await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)) {
            case RESULTS.UNAVAILABLE:
            case RESULTS.BLOCKED:
            case RESULTS.LIMITED:
            case RESULTS.DENIED:
              console.error('Not fine location available');
              break;
          }
      }
      setLocationPermission(true);
    };

    askPermissions();
  }, []);
  return locationPermission;
};
