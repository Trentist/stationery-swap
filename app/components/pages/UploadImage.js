import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import assets from '../../assets';

const UploadImage = (props) => {

  const { image, style, onPress} = props;

  const onPressImage = () => {
    if (onPress)
      onPress();
  }

  return (
    <TouchableOpacity onPress={onPressImage} activeOpacity={0.7} style={[styles.container, style]}>
      {
        image?
          <Image
            style={styles.image}
            source={image}
          />
        :
          <Image
            style={styles.uploadIcon}
            source={assets.images.icons.uploadIcon}
          />
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 200,
    borderColor: '#707070',
    borderWidth: 1,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  uploadIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  }
});

export default UploadImage;
