import React, { useEffect, useMemo, useRef } from 'react';
import { Modalize } from 'react-native-modalize';
import { useSelector } from 'react-redux';

import Modal from '../../../../components/Modal';
import useTripStatus from '../../../../hooks/useTripStatus';
import useUserToken from '../../../../hooks/useUserToken';
import { ReduxState } from '../../../../interfaces/redux';
import { TripStatus } from '../../../../interfaces/trip';
import WaitingDriverAceptance from './steps/WaitingDriverAceptance';
import WaitingForTrip from './steps/WaitingForTrip';

type IModalComponent = React.FC<{ modalRef: React.RefObject<Modalize> }>;

const TripModal = () => {
  const modalRef = useRef<Modalize>(null);
  const { status, id } = useSelector((state: ReduxState) => state.trip);

  const ModalComponent = useMemo<IModalComponent | null>(() => {
    switch (status) {
      case TripStatus.WAITING_DRIVER:
        return WaitingDriverAceptance;
      default:
        return WaitingForTrip;
    }
  }, [status]);

  const token = useUserToken();

  useTripStatus(id, token);

  useEffect(() => {
    if (ModalComponent !== null) {
      modalRef.current?.open();
    }
  }, [ModalComponent, modalRef.current]);

  return (
    <Modal modalRef={modalRef} adjustToContentHeight>
      {ModalComponent && <ModalComponent modalRef={modalRef} />}
    </Modal>
  );
};

export default TripModal;
