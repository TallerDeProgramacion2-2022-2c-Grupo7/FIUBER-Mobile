import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import axios from "react-native-axios";

export const sendPhoneVerification = async (phone: string, code: string) => {
  try {
    console.log("sendPhoneVerification", phone, code);
    const user = auth().currentUser;

    if (!user) {
    return;
    }

    const idTokenResult = await user.getIdTokenResult();

    const headers = {
    'Authorization': `Bearer ${idTokenResult.token}`
    }

    const data = {
    to_number: phone,
    verification_code: code
    }

    axios.post('https://fiuber-notification-pin-martinstd96.cloud.okteto.net/send_pin/', data, { headers: headers }).
    then((response) => {
      console.log(response["data"]);
    }).catch((error) => {
      console.log(error);
    });
  } catch(error) {
    console.log(error)
  }
  
};

export const checkPhoneVerification = async (uid?: string, code?: string) => {
  if (!uid || !code) return false;
  const profileCol = await firestore().doc(`privateProfiles/${uid}`).get();
  const { phoneVerificationCode } = profileCol.data() || {};
  console.log(code, phoneVerificationCode);

  return phoneVerificationCode === code;
};
