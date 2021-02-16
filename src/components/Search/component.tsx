import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';

import { $white } from '../../utils/colors';
import LoadingState from './SearchItem/loadingState';
import SearchItem from './SearchItem';
import _ from 'lodash';

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
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');

  const debounced = _.debounce(() => setLoading(false), 750);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        value={keyword}
        onChangeText={(word: string) => {
          setKeyword(word);
          setLoading(true);
          setTimeout(() => debounced(), 750);
        }}
        autoCapitalize={'none'}
      />

      {loading ? (
        <LoadingState />
      ) : (
        <FlatList
          data={data}
          renderItem={() => {
            return <SearchItem type={'user'} text={'Item'} />;
          }}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default Search;
