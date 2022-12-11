/* eslint-disable no-spaced-func */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Modalize } from 'react-native-modalize';
import { useDispatch, useSelector, useStore } from 'react-redux';

import Modal from '../../../../components/Modal';
import { AppDispatch, ReduxState } from '../../../../interfaces/redux';
import { TripStatus } from '../../../../interfaces/trip';
import { keepStatusUpdated } from '../../../../utils/intervals';
import DriverAccept from './steps/DriverAccept';
import TripFinished from './steps/TripFinished';
import TripInCourse from './steps/TripInCourse';
import WaitingForDriver from './steps/WaitingForDriver';
import WaitingUserAceptance from './steps/WaitingUserAceptance';

export type IModalComponentArgs = {
  modalRef: React.RefObject<Modalize>;
  setOnClosed: (cb: (() => void) | undefined) => void;
  setAllwaysOpen: (height: number | undefined) => void;
};

export type IModalComponent = React.FC<IModalComponentArgs>;

interface TripModalArgs {
  modalRef: React.RefObject<Modalize>;
}

const TripModal = ({ modalRef }: TripModalArgs) => {
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

  const modalOnOpended = useCallback(() => {
    const statusInterval = keepStatusUpdated(dispatch, getState);
    setIdInterval(statusInterval);
    setIsOpen(true);
  }, []);

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
        />
      )}
    </Modal>
  );
};

export default TripModal;
