import auth from '@react-native-firebase/auth';

export const getFirebaseToken = () => {
  return auth().currentUser?.getIdToken();
};
