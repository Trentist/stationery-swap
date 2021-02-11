import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { Input } from 'react-native-elements';
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

const Home = (props) => {
  const renderFeaturedItem = ({ item }) => (
    <Item style={styles.featured} image={assets.images.samples.featured} featured unmarked price={5} />
  );
  const renderCategoryItem = ({ item }) => (
    <Item style={styles.category} image={assets.images.samples.category} category title="Calligraphy Cards" />
  );
  const separator = () => (
    <View style={{width: 25}}></View>
  );
  return (
    <View style={styles.container}>
      <Input
        placeholder='Search...'
        leftIcon={{ type: 'font-awesome', name: 'search' }}
        inputContainerStyle={{borderBottomWidth:0, height: '100%'}}
        containerStyle={styles.searchBox}
        inputStyle={{fontSize: 15, paddingVertical: 0}}
      />
      <View style={styles.mainContainer}>
        <View style={styles.itemsContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Featured</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all ▶</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={styles.itemList}
            ItemSeparatorComponent={separator}
            renderItem={renderFeaturedItem}
            data={DATA}
            keyExtractor={item => item.id}
            horizontal
          />
        </View>
        <View style={[styles.itemsContainer, styles.categoryContainer]}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all ▶</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={styles.itemList}
            ItemSeparatorComponent={separator}
            renderItem={renderCategoryItem}
            data={DATA}
            keyExtractor={item => item.id}
            horizontal
          />
        </View>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  searchBox: {
    height: 40,
    borderRadius: 20,
    backgroundColor: '#CCCCCC',
    paddingHorizontal: 15
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    marginTop: 30,
  },
  itemsContainer: {
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  headerContainer: {
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontFamily: 'SFProDisplay-Bold',
    fontWeight: 'bold'
  },
  seeAll: {
    fontSize: 15,
    fontFamily: 'Futura-Medium',
    fontWeight: 'bold'
  },
  itemList: {
    width: '100%',
    height: '100%',
    paddingVertical: 10
  },
  featured: {
    width: 180
  },
  category: {
    width: 150
  },
  categoryContainer: {
    height: '30%',
    marginTop: 30
  }
});

export default Home;
