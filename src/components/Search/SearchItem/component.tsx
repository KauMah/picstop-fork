import { StyleSheet, Text, View } from 'react-native';

import { $white } from '../../../utils/colors';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: $white,
    height: 40,
    marginVertical: 1,
    borderRadius: 8,
  },
});
interface SearchItemProps {
  type: 'user' | 'location';
  text: string;
}

const SearchItem: React.FC<SearchItemProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>{props.text}</Text>
    </View>
  );
};

export default SearchItem;
