import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Input } from 'react-native-elements';
import { ImageButton } from '../../components/common';
import Item from '../../components/pages/Item';
import assets from '../../assets';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d71',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d77',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d79',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d78',
    title: 'Third Item',
  },
];


const Category = (props) => {
  const renderItem = ({ item }) => (
    <Item style={styles.featured} image={assets.images.samples.featured} featured unmarked price={5} />
  );
  const separator = () => (
    <View style={{width: 20, height: 15}}></View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <ImageButton style={styles.backButton} source={assets.images.icons.back} />
        <Input
          placeholder='Search...'
          leftIcon={{ type: 'font-awesome', name: 'search' }}
          inputContainerStyle={{borderBottomWidth:0, height: '100%'}}
          containerStyle={styles.searchBox}
          inputStyle={{fontSize: 15, paddingVertical: 0}}
        />
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Back To School</Text>
        <FlatList
          style={styles.itemList}
          ItemSeparatorComponent={separator}
          renderItem={renderItem}
          data={DATA}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20
  },
  titleBar: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  searchBox: {
    height: 40,
    borderRadius: 20,
    backgroundColor: '#CCCCCC',
    paddingHorizontal: 15,
    marginLeft: 20,
    flex: 1
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    marginTop: 30,
  },
  itemList: {
    width: '100%',
    height: '100%',
    marginTop: 20,
  },
  featured: {
    width: '48%',
    height: 200
  },
});

export default Category;
