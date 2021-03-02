import React from 'react';
import { View, StyleSheet } from 'react-native';

const TwoColumnsView = (props) => {

  const { data, renderItem } = props;

  const style = props.style?props.style:{};
  const items = [];
  for (var i = 0; i < data.length; i += 2) {
    const first = data[i];
    const second = data[i + 1];
    var key = "";
    if (first.id) {
      key = first.id;
      if (second) key += second.id;
    }
    else {
      key = "id" + i;
      if (second) key += "id" + (i+1);
    }
    items.push(
      <View style={styles.itemRow} key={key + "-" + i}>
        {
          renderItem(first, i)
        }
        {
          second && renderItem(second, i + 1)
        }
      </View>
    );
  }
  return items;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'yellow',
    paddingVertical : 10
  },
  itemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 5,
  },
});

export default TwoColumnsView;