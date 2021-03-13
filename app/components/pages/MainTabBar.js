import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'

function MyTabBar({ state, navigation }) {
  
  const tabs = [
    { label: 'Home', icon: 'home', icon_type: 'material', route: 'Home', key: 'key1' },
    { label: 'Alarm', icon: 'notifications-none', icon_type: 'material', route: 'Alarm', key: 'key2' },
    { label: 'Add', icon: 'post-add', icon_type: 'material', route: 'Add', key: 'key3' },
    { label: 'Search', icon: 'search', icon_type: 'material', route: 'Search', key: 'key4' },
    { label: 'User', icon: 'person-outline', icon_type: 'material', route: 'User', key: 'key5' }
  ];

  return (
    <View style={{ flexDirection: 'row' }}>
      {tabs.map((tab, index) => {

        const isFocused = state.index === index;
        const tabColor = isFocused ? '#D0A0BA' : '#777777';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: tab.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(tab.route);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: tab.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabContainer}
            key={index}
            activeOpacity={0.9}
          >
            <Icon name={tab.icon} type={tab.icon_type} color={tabColor} size={26} />
            {/* <Text style={{ color: tabColor }}>
              {tab.label}
            </Text> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray'
  }
});

export default MyTabBar;
