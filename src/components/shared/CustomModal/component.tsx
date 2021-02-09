import React, { PropsWithChildren } from 'react';
import { Dimensions, Modal, StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { $white } from '../../../utils/colors';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: width,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  },
  modal: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: $white,
    borderRadius: 12,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});

interface Props extends PropsWithChildren<{}> {
  modalVisible: boolean;
  onPressOverlay: () => void;
}

const CustomModal = (props: Props) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          console.log('hello');
        }}>
        <TouchableWithoutFeedback onPress={props.onPressOverlay}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>{props.children}</View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomModal;
