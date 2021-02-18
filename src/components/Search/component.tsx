import { $mainGray, $white } from '../../utils/colors';
import { Location, User } from '../../types';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import LoadingState from './SearchItem/loadingState';
import SearchItem from './SearchItem';
import _ from 'lodash';
import { exo } from '../../utils/api';
import { rollbar } from '../../utils/rollbar';

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
  text: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    color: $mainGray,
    fontSize: 18,
    marginVertical: 5,
  },
});

interface Props {
  exit: () => void;
}

const Search = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [users, setUsers] = useState<Array<User>>([]);
  const [locations, setLocations] = useState<Array<Location>>([]);

  useEffect(() => {
    if (keyword === '') {
      setLocations([]);
      setUsers([]);
    }
  }, [keyword]);

  const debounced = _.debounce(() => {
    exo
      .post('/user/search', { query: keyword })
      .then((result) => {
        setUsers(_.get(result.data, 'message.users', []));
        setLocations(_.get(result.data, 'message.locations', []));
        setLoading(false);
      })
      .catch((err) => {
        rollbar.error(`Failed to load search results: ${err}`);
      });
  }, 1500);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        value={keyword}
        autoFocus
        onChangeText={(word: string) => {
          setKeyword(word);
          setLoading(true);
          setTimeout(() => debounced(), 1000);
        }}
        autoCapitalize={'none'}
      />

      {loading ? (
        <LoadingState />
      ) : (
        // <FlatList
        //   data={data}
        //   renderItem={() => {
        //     return <SearchItem type={'user'} text={'Item'} />;
        //   }}
        //   keyExtractor={(item) => item.id}
        // />
        <ScrollView>
          <Text style={styles.text}>Users</Text>
          {users.map((user) => {
            return (
              <SearchItem
                type={'user'}
                text={user.username}
                picUrl={user.profilePic}
                user={user}
                key={user._id}
                exit={props.exit}
              />
            );
          })}
          <Text style={styles.text}>Locations</Text>
          {locations.map((location) => (
            <SearchItem
              type={'location'}
              text={location.name}
              key={location._id}
              location={location}
              exit={props.exit}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Search;
