import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { screenWidth, screenHeight } from '../../utils/device';
import { LargeButton, TextLink } from '../../components/common';
import ImageSlider from '../../components/common/ImageSlider';


import assets from '../../assets';

const texts = [
  "Discover new stationery & crafts to trade and buy.",
  "Meet friends to trade, ship or sell your stationery & crafts",
  "Swap stationery & crafts \n with ease"
];

const Onboarding = (props) => {
  
  const [curpos, setCurPos] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{texts[curpos]}</Text>
      </View>
      <View style={styles.slider}>
        <ImageSlider
          images={assets.images.onboarding_images}
          dotColor="#E55A86"
          imageLoadingColor="#E55A86"
          resizeMethod={'resize'}
          resizeMode={'stretch'}
          ImageComponentStyle={styles.imageComponent}
          paginationBoxStyle={styles.paginationBox}
          dotStyle={styles.dot}
          loop
          autoplay
          currentImageEmitter={index => setCurPos(index)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <LargeButton style={styles.button} title="SIGN UP" onPress={() => {console.log("button")}} />
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>Already have an account?</Text>
          <TextLink style={styles.bottomText} onPress={() => {console.log("link")}}>Login here!</TextLink>
        </View>
      </View>
      
    </View>
  );
};

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: 'white'
  },
  textContainer: {
    height: 100
  },
  text: {
    fontSize: 20,
    fontFamily: 'Futura-Medium',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  slider: {
    height: screenHeight - 270
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderColor: '#E55A86',
    borderWidth: 2,
    marginHorizontal: -3,
    padding: 0,
    margin: 0,
  },
  paginationBox: {
    position: "absolute",
    bottom: 0,
    padding: 0,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10
  },
  imageComponent: {
    borderRadius: 5, 
    width: screenWidth - 80,
    height: screenHeight - 320
  },
  buttonContainer: {
    marginTop: 50,
    height: 100
  },
  bottomContainer: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bottomText: {
    textAlign: 'center',
    marginLeft: 5,
    fontSize: 14
  }
};

export default Onboarding;
