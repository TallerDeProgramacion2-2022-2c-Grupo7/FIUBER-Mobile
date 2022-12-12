import messaging from '@react-native-firebase/messaging';

export const subscribeToAvailableTrips = () => {
  messaging()
    .subscribeToTopic('availableTrips')
    .then(() => console.log('Subscribed to topic availableTrips!'));
};

export const unsubscribeFromAvailableTrips = () => {
  messaging()
    .unsubscribeFromTopic('availableTrips')
    .then(() => console.log('Unsuscribed to topic availableTrips!'));
};
