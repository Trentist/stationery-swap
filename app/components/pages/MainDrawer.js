import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// eslint-disable-next-line no-undef
export default MainDrawer = (props) => {
  // const navigation = useNavigation();
  const [logOutModal, setLogOutModal] = useState(false);

  const itemNavigateToScreen = (screenName) => {
    props.navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      {/* Avatar Part */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>METADALLION</Text>
      </View>
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={styles.itemMain}
          onPress={() => itemNavigateToScreen('MyProfile')}>
          <Text style={styles.itemText}>My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemMain}
          onPress={() => itemNavigateToScreen('Settings')}>
          <Text style={styles.itemText}>CO2 Emissions Information</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemMain}
          onPress={() => itemNavigateToScreen('Notifications')}>
          <Text style={styles.itemText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemMain}
          onPress={() => itemNavigateToScreen('TermsOfUse')}>
          <Text style={styles.itemText}>Terms of Use</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemMain}
          onPress={() => itemNavigateToScreen('PrivacyPolicy')}>
          <Text style={styles.itemText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemMain}
          onPress={() => itemNavigateToScreen('ContactUs')}>
          <Text style={styles.itemText}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemLogOut}
          onPress={() => setLogOutModal(true)}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
  },
  titleContainer: {
    marginTop: 30,
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    // borderRadius: 20,
  },
  title: {
    width: '100%',
    fontSize: 18,
    textAlign: 'center',
    color: '#003458',
  },
  avatarBackground: {
    width: '100%',
    padding: 0,
    backgroundColor: 'white',
  },
  avatarContainer: {
    display: 'flex',
    width: '100%',
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    // borderRadius: 10,
    // borderTopLeftRadius: 10,
    borderTopLeftRadius: 15,
  },
  username: {
    width: '100%',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 15,
  },
  text: {
    fontWeight: '600',
    fontSize: 18,
    width: '60%',
    textAlign: 'center',
    color: '#003458',
  },
  itemContainer: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: 0,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
  },
  itemMain: {
    width: '100%',
    marginTop: 3,
    padding: 10,
    borderColor: '#003458',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderRadius: 7,
    borderWidth: 1,
    // borderTopLeftRadius: 10,
    // borderBottomLeftRadius: 10,
  },
  itemLogOut: {
    width: '100%',
    marginTop: 20,
    padding: 10,
    borderColor: '#003458',
    backgroundColor: '#3B5998',
    borderRadius: 7,
  },
  logoutText: {
    width: '100%',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  itemText: {
    width: '100%',
    fontSize: 16,
    color: '#003458',
    textAlign: 'center',
  },
  menuButton: {
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  icon: {
    width: 25,
    height: 25,
    backgroundColor: 'white',
  },
});
