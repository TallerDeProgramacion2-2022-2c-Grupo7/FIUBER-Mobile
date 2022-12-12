/* eslint-disable no-spaced-func */
import React, { useCallback, useMemo, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { useDispatch, useSelector, useStore } from 'react-redux';

import Modal from '../../../../components/Modal';
import { AppDispatch, ReduxState } from '../../../../interfaces/redux';
import { TripStatus } from '../../../../interfaces/trip';
import { keepStatusUpdated } from '../../../../utils/intervals';
import TripAccepted from './steps/TripAccepted';
import TripFinished from './steps/TripFinished';
import TripInCourse from './steps/TripInCourse';
import WaitingDriverAceptance from './steps/WaitingDriverAceptance';
import WaitingForTrip from './steps/WaitingForTrip';

export type IModalComponentArgs = {
  modalRef: React.RefObject<Modalize>;
  setOnClosed: (cb: () => void) => void;
  setAllwaysOpen: (height: number | undefined) => void;
  setDriverMode: (driverMode: boolean) => void;
};

export type IModalComponent = React.FC<IModalComponentArgs>;

interface TripModalArgs {
  driverMode: boolean;
  setDriverMode: (driverMode: boolean) => void;
  modalRef: React.RefObject<Modalize>;
}

const TripModal = ({ setDriverMode, modalRef }: TripModalArgs) => {
  const { status, id } = useSelector((state: ReduxState) => state.trip);
  const [alwaysOpen, setAllwaysOpen] = useState<number | undefined>(undefined);
  const [componentOnClosed, setComponentOnClosed] = useState<
    (() => void) | undefined
  >(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [idInterval, setIdInterval] = useState<number | undefined>(undefined);
  const dispatch = useDispatch<AppDispatch>();
  const { getState } = useStore<ReduxState>();

  const ModalComponent = useMemo<IModalComponent | null>(() => {
    switch (status) {
      case TripStatus.WAITING_DRIVER:
        return WaitingDriverAceptance;
      case TripStatus.ACCEPTED:
        return TripAccepted;
      case TripStatus.STARTED:
        return TripInCourse;
      case TripStatus.FINISHED:
        return TripFinished;
      case TripStatus.WAITING_FOR_TRIP:
      default:
        return WaitingForTrip;
    }
  }, [status]);

  const modalOnOpended = () => {
    if (isOpen) {
      return;
    }
    const statusInterval = keepStatusUpdated(dispatch, getState);

    setIdInterval(statusInterval);

    setIsOpen(true);
  };

  const modalOnClosed = useCallback(() => {
    componentOnClosed?.();

    if (idInterval) {
      clearInterval(idInterval);
    }

    setIsOpen(false);
  }, [componentOnClosed]);

  return (
    <Modal
      modalRef={modalRef}
      adjustToContentHeight={!alwaysOpen}
      alwaysOpen={alwaysOpen}
      onOpened={modalOnOpended}
      onClosed={modalOnClosed}
      onBackButtonPress={() => {
        return true;
      }}>
      {ModalComponent && (
        <ModalComponent
          modalRef={modalRef}
          setAllwaysOpen={setAllwaysOpen}
          setOnClosed={setComponentOnClosed}
          setDriverMode={setDriverMode}
        />
      )}
    </Modal>
  );
};

export default TripModal;
