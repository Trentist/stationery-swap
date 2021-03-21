import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import SmallButton from './SmallButton';
import LargeButton from './LargeButton';
import config from '../../config';
import PropTypes from 'prop-types';

const CustomModal = (props) => {

  const {show, backPress, onClose, okbtn, text, busy} = props;

  const onBackdropPress = () => {
    if (backPress && onClose) onClose();
  }

  return (
    <Modal isVisible={show} onBackdropPress={onBackdropPress} style={styles.modalContainer}>
      <View style={styles.modalBody}>
        {busy && 
          <ActivityIndicator size="large" color={config.themeColor} />
        }        
        <Text style={styles.text}>{text}</Text>
        {okbtn && 
          <SmallButton title="OK" style={styles.button} onPress={onClose} />
        }
      </View>
    </Modal>
  )
}

CustomModal.propTypes = {
  show: PropTypes.bool,
  backPress: PropTypes.bool,
  onClose: PropTypes.func,
  okbtn: PropTypes.bool,
  text: PropTypes.string,
  busy: PropTypes.bool
};

const styles = StyleSheet.create({
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 16
  },
  modalBody: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  button: {
    marginTop: 10,
    width: 120
  }
});

export default CustomModal;