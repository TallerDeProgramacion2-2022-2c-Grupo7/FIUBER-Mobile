/* eslint-disable no-spaced-func */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Modalize } from 'react-native-modalize';
import { useSelector } from 'react-redux';

import Modal from '../../../../components/Modal';
import useTripStatus from '../../../../hooks/useTripStatus';
import { ReduxState } from '../../../../interfaces/redux';
import { TripStatus } from '../../../../interfaces/trip';
import TripAccepted from './steps/TripAccepted';
import TripFinished from './steps/TripFinished';
import TripInCourse from './steps/TripInCourse';
import WaitingDriverAceptance from './steps/WaitingDriverAceptance';
import WaitingForTrip from './steps/WaitingForTrip';

export type IModalComponentArgs = {
  modalRef: React.RefObject<Modalize>;
  setOnClose: (cb: () => void) => void;
  setOnClosed: (cb: () => void) => void;
  setAllwaysOpen: (height: number | undefined) => void;
  setDriverMode: (driverMode: boolean) => void;
};

export type IModalComponent = React.FC<IModalComponentArgs>;

interface TripModalArgs {
  driverMode: boolean;
  setDriverMode: (driverMode: boolean) => void;
}

const TripModal = ({ setDriverMode }: TripModalArgs) => {
  const modalRef = useRef<Modalize>(null);
  const { status } = useSelector((state: ReduxState) => state.trip);
  const [alwaysOpen, setAllwaysOpen] = useState<number | undefined>(undefined);
  const [componentOnClose, setComponentOnClose] = useState<
    (() => void) | undefined
  >(undefined);
  const [componentOnClosed, setComponentOnClosed] = useState<
    (() => void) | undefined
  >(undefined);
  const [isOpen, setIsOpen] = useState(false);

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

  useTripStatus();

  useEffect(() => {
    if (!isOpen) {
      modalRef.current?.open();
    }
  }, [modalRef.current, ModalComponent]);

  const modalOnOpended = useCallback(() => {
    setIsOpen(true);
  }, []);

  const modalOnClose = useCallback(() => {
    componentOnClose?.();
  }, [componentOnClose]);

  const modalOnClosed = useCallback(() => {
    componentOnClosed?.();
    setIsOpen(false);
  }, [componentOnClosed]);

  return (
    <Modal
      modalRef={modalRef}
      adjustToContentHeight={!alwaysOpen}
      alwaysOpen={alwaysOpen}
      onOpened={modalOnOpended}
      onClose={modalOnClose}
      onClosed={modalOnClosed}
      onBackButtonPress={() => {
        return true;
      }}>
      {ModalComponent && (
        <ModalComponent
          modalRef={modalRef}
          setAllwaysOpen={setAllwaysOpen}
          setOnClose={setComponentOnClose}
          setOnClosed={setComponentOnClosed}
          setDriverMode={setDriverMode}
        />
      )}
    </Modal>
  );
};

export default TripModal;
