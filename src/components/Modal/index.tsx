/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import styles from './styles';

interface Props {
  children: React.ReactNode;
  modalRef: React.RefObject<Modalize>;
  onClose?: () => void;
  onClosed?: () => void;
  fullHeight?: boolean;
  adjustToContentHeight?: boolean;
  scrollViewProps?: any;
  modalStyle?: StyleProp<ViewStyle>;
  HeaderComponent?: React.ReactNode;
  FooterComponent?: React.ReactNode;
  FloatingComponent?: React.ReactNode;
  disableScrollIfPossible?: boolean;
  alwaysOpen?: number;
}

function Modal({
  children,
  modalRef,
  onClose,
  onClosed,
  fullHeight,
  adjustToContentHeight,
  scrollViewProps,
  modalStyle,
  HeaderComponent,
  FooterComponent,
  FloatingComponent,
  disableScrollIfPossible,
  alwaysOpen,
  ...props
}: Props) {
  const handleOnClose = () => onClose?.();

  const { bottom } = useSafeAreaInsets();
  return (
    <Modalize
      {...props}
      ref={modalRef}
      handlePosition="inside"
      modalStyle={[
        styles.modal,
        !adjustToContentHeight && styles.flex,
        modalStyle,
      ]}
      handleStyle={styles.handle}
      scrollViewProps={{
        bounces: true,
        keyboardShouldPersistTaps: 'always',
        keyboardDismissMode: 'none',
        showsVerticalScrollIndicator: true,
        overScrollMode: 'always',
        style: fullHeight && styles.scrollView,
        contentContainerStyle: [
          fullHeight && styles.scrollviewContent,
          !!bottom && styles.extraBottom,
        ],
        ...scrollViewProps,
      }}
      closeOnOverlayTap
      onOverlayPress={handleOnClose}
      onClose={handleOnClose}
      onClosed={onClosed}
      adjustToContentHeight={adjustToContentHeight}
      HeaderComponent={HeaderComponent}
      FooterComponent={FooterComponent}
      FloatingComponent={FloatingComponent}
      disableScrollIfPossible={disableScrollIfPossible}
      threshold={15}
      alwaysOpen={alwaysOpen}>
      {children}
    </Modalize>
  );
}

export default Modal;
