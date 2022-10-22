import React, { useEffect, useMemo, useRef } from 'react';
import { Modalize } from 'react-native-modalize';
import { useSelector } from 'react-redux';

import Modal from '../../../../components/Modal';
import { ReduxState } from '../../../../interfaces/redux';
import { TripStatus } from '../../../../interfaces/trip';
import { setDestination } from '../../../../redux/slices/trip';
import { calculateCost, createTrip } from '../../../../services/trips';
import WaitingUserAceptance from './steps/WaitingUserAceptance';

type IModalComponent = React.FC<{ modalRef: React.RefObject<Modalize> }>;

const TripModal = () => {
  const modalRef = useRef<Modalize>(null);
  const { status } = useSelector((state: ReduxState) => state.trip);

  const ModalComponent = useMemo<IModalComponent | null>(() => {
    switch (status) {
      case TripStatus.WAITING_USER:
        return WaitingUserAceptance;
      default:
        return null;
    }
  }, [status]);

  useEffect(() => {
    if (ModalComponent !== null) {
      modalRef.current?.open();
    }
  }, [ModalComponent]);

  return (
    <Modal modalRef={modalRef} adjustToContentHeight>
      {ModalComponent && <ModalComponent modalRef={modalRef} />}
    </Modal>
  );
};

export default TripModal;
