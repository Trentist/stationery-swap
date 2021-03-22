import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import assets from '../../assets';
import { useNavigation } from '@react-navigation/native';

const Item = (props) => {
  const style = props.style;
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={()=>navigation.navigate('ItemPage')} style={[styles.container, style]} activeOpacity={0.7}>
      <Image
        style={styles.image}
        source={props.image}
      />
      {
         props.featured &&
          <Image
            style={styles.marked}
            source={props.marked?assets.images.icons.marked:assets.images.icons.unmarked}
            resizeMethod="scale"
            resizeMode="stretch"
          />
      }
      {
         props.title &&
          <Text style={styles.title}>{props.title}</Text>
      }
      {
         props.price &&
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{props.price}$</Text>
          </View>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: 180,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  marked: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 20,
    right: 15
  },
  priceContainer: {
    position: 'absolute',
    bottom: 15,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2
  },
  price: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00C569',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    marginHorizontal: 20,
    textAlign: 'center'
  }
});

export default Item;
