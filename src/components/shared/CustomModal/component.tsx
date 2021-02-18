import { $black, $white } from '../../../utils/colors';
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { PropsWithChildren } from 'react';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
  },
  modal: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: $white,
    borderRadius: 12,
    zIndex: 100,
    elevation: 3,
    shadowColor: $black,
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
});

interface Props extends PropsWithChildren<{}> {
  modalVisible: boolean;
  onPressOverlay: () => void;
}

const CustomModal = (props: Props) => {
  return (
    <Modal animationType="slide" transparent visible={props.modalVisible}>
      <TouchableWithoutFeedback onPress={props.onPressOverlay}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>{props.children}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModal;
