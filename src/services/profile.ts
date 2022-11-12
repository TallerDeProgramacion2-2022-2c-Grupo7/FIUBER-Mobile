import firestore from '@react-native-firebase/firestore';

export const getPublicProfile = async (uid: string) => {
  const record = await firestore().doc(`publicProfiles/${uid}`).get();

  if (!record.exists) {
    throw new Error('Public profile not found');
  }

  return record.data();
};

export const getPrivateProfile = async (uid: string) => {
  const record = await firestore().doc(`publicProfiles/${uid}`).get();

  if (!record.exists) {
    throw new Error('Private profile not found');
  }

  return record.data();
};

export const getProfile = async (uid: string) => {
  const publicProfile = await getPublicProfile(uid);
  const privateProfile = await getPrivateProfile(uid);

  const profile = { ...publicProfile, ...privateProfile };

  return profile;
};
