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
    if (!isOpen && !!ModalComponent) {
      modalRef.current?.open();
    }
  }, [ModalComponent, modalRef.current]);

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
        />
      )}
    </Modal>
  );
};

export default TripModal;
