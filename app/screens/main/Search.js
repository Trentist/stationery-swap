import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';

const Search = (props) => {

  const shortcuts = [
    "Calligraphy Cards",
    "Handmade",
    "Back to School"
  ];

  const categories = [
    "Jewellery and accessories",
    "Arts and crafts",
    "Antiques and collectibles",
    "Jewellery and accessories",
    "Arts and crafts",
    "Antiques and collectibles",
    "Jewellery and accessories",
    "Arts and crafts",
    "Antiques and collectibles",
  ]
  
  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 30, width: '100%'}}>
        <Input
          placeholder='Search...'
          leftIcon={{ type: 'font-awesome', name: 'search' }}
          inputContainerStyle={{borderBottomWidth:0, height: '100%'}}
          containerStyle={styles.searchBox}
          inputStyle={{fontSize: 15, paddingVertical: 0}}
        />
      </View>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Shortcuts</Text>
          {
            shortcuts.map((value, key) => {
              return <TouchableOpacity style={styles.item} key={key}>
                  <Text style={styles.shortcut}>{value}</Text>
                </TouchableOpacity>
            })
          }
        </View>
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>All Categories</Text>
          {
            categories.map((value, key) => {
              return <TouchableOpacity style={styles.item} key={key}>
                  <Text style={styles.category}>{value}</Text>
                </TouchableOpacity>
            })
          }
        </View>
      </ScrollView>
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
    alignItems: 'flex-start',
    paddingTop: 20
  },
  searchBox: {
    height: 40,
    borderRadius: 20,
    backgroundColor: '#CCCCCC',
    paddingHorizontal: 15,
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 30
  },
  listContainer: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    marginLeft: 20,
    marginTop: 10
  },
  shortcut: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 20,
    color: '#9F9F9F',
  }
});

export default Search;
