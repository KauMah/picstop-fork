import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import React from 'react';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 2,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  logo: {
    height: 30,
    width: 38,
  },
});

const Feed = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../../assets/img/picstop-no-text.png')}
        />
        <Text style={styles.title}>To be filled out</Text>
      </View>
      <ScrollView>
        <Text>Gnar</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Feed;
