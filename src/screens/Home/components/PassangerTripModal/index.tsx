/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { useSelector } from 'react-redux';

import Modal from '../../../../components/Modal';
import useTripStatus from '../../../../hooks/useTripStatus';
import useUserToken from '../../../../hooks/useUserToken';
import { ReduxState } from '../../../../interfaces/redux';
import { TripStatus } from '../../../../interfaces/trip';
import DriverAccept from './steps/DriverAccept';
import TripFinished from './steps/TripFinished';
import TripInCourse from './steps/TripInCourse';
import WaitingForDriver from './steps/WaitingForDriver';
import WaitingUserAceptance from './steps/WaitingUserAceptance';

export type IModalComponentArgs = {
  modalRef: React.RefObject<Modalize>;
  setOnClose: (cb: () => void) => void;
  setAllwaysOpen: (height: number | undefined) => void;
};

export type IModalComponent = React.FC<IModalComponentArgs>;

const TripModal = () => {
  const modalRef = useRef<Modalize>(null);
  const { status, id } = useSelector((state: ReduxState) => state.trip);
  const [alwaysOpen, setAllwaysOpen] = useState<number | undefined>(undefined);
  const [onClose, setOnClose] = useState<() => void>(() => {});

  const ModalComponent = useMemo<IModalComponent | null>(() => {
    switch (status) {
      case TripStatus.WAITING_USER:
        return WaitingUserAceptance;
      case TripStatus.WAITING_DRIVER:
      case TripStatus.SERCHING_DRIVER:
        return WaitingForDriver;
      case TripStatus.ACCEPTED:
        return DriverAccept;
      case TripStatus.STARTED:
        return TripInCourse;
      case TripStatus.FINISHED:
        return TripFinished;
      default:
        return null;
    }
  }, [status]);

  useEffect(() => {
    if (ModalComponent !== null) {
      modalRef.current?.open();
    }
  }, [ModalComponent, modalRef.current]);

  const token = useUserToken();

  useTripStatus(id, token);

  const modalOnClose = () => {
    onClose();
  };

  return (
    <Modal
      modalRef={modalRef}
      adjustToContentHeight={!alwaysOpen}
      alwaysOpen={alwaysOpen}
      onClose={modalOnClose}>
      {ModalComponent && (
        <ModalComponent
          modalRef={modalRef}
          setAllwaysOpen={setAllwaysOpen}
          setOnClose={setOnClose}
        />
      )}
    </Modal>
  );
};

export default TripModal;
