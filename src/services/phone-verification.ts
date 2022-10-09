import firestore from '@react-native-firebase/firestore';

const TWILIO_ACCOUNT_SID = 'AC720ce4caafa69b31a9dc8c0dd758e98c';
const TWILIO_AUTH_TOKEN = '9f4f1d2c2cd80a1eef642e92a29f4e94';
const TWILIO_PHONE_NUMBER = '+14155238886';

export const sendPhoneVerification = async (phone: string, code: string) => {
  // Send request phone verification
};

export const checkPhoneVerification = async (uid?: string, code?: string) => {
  if (!uid || !code) return false;
  const profileCol = await firestore().doc(`privateProfiles/${uid}`).get();
  const { phoneVerificationCode } = profileCol.data() || {};

  return phoneVerificationCode === code;
};
