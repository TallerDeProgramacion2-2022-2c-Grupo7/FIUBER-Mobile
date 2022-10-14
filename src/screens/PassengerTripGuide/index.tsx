import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Text from '../../components/Text';
import { View, ActivityIndicator,  StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { LatLng } from 'react-native-maps';

import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../interfaces/navigation';
import { ReduxState } from '../../interfaces/redux';
import { Container } from '../../layouts';
import Map from '../Home/components/map';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, ROUTES.PASSENGER_TRIP_GUIDE>;

function PassengerTripGuide({navigation}: Props) {

 const { params } =
    useRoute<RouteProp<RootStackParamList, ROUTES.PASSENGER_TRIP_GUIDE>>();
 const { destination } = params;

 const [tripState, setTripState] = useState("Finding Driver")


    const updateTripState = () => {
      switch(tripState){   
        case "Finding Driver": return "Driver found";
        case "Driver found": return "Ongoing trip";
        case "Ongoing trip": return "Finished trip";
    }
   }
 useEffect(() => {
    const timer = setInterval(() => {   
        setTripState(updateTripState());
     }, 3000);              

    return () => clearInterval(timer);
 });



 if (tripState == "Finding Driver"){
  return (
    <Container  style={styles.container}>
        <Text style={[styles.title, styles.componentMargin]}>{"Finding driver..."}</Text>
        <ActivityIndicator style={StyleSheet.absoluteFill} color="white" size="large" />
    </Container>
  );
}

  return (
    <Container>
        <Text style={[styles.title, styles.top]}>{tripState}</Text>
        <Map destination={destination} />
    </Container>
  );

}

export default PassengerTripGuide;
