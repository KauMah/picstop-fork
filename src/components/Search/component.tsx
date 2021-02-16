import { FlatList, StyleSheet, TextInput, View } from 'react-native';

import { $white } from '../../utils/colors';
import React from 'react';
import SearchItem from './SearchItem';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: '100%',
    height: '100%',
  },
  search: {
    height: 30,
    borderRadius: 15,
    backgroundColor: $white,
    paddingHorizontal: 10,
    fontFamily: 'Kumbh Sans',
    fontSize: 16,
    marginBottom: 10,
  },
});

const data = [
  {
    id: '0',
    title: 'Hi there',
  },
  {
    id: '1',
    title: 'Hi there',
  },
  {
    id: '2',
    title: 'Hi there',
  },
  {
    id: '3',
    title: 'Hi there',
  },
  {
    id: '4',
    title: 'Hi there',
  },
];

const Search = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.search} autoCapitalize={'none'} />
      <FlatList
        data={data}
        renderItem={() => {
          return <SearchItem type={'user'} text={'Item'} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Search;
