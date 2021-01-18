import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { lighterBlue, lighterGray, mainBlue } from '../../utils/colors';

import React from 'react';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
  },
  proPic: {
    height: 100,
    width: 100,
  },
  topHalf: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  stacked: {
    flexDirection: 'column',
  },
  nameInfo: {},
  username: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    fontSize: 18,
  },
  location: {
    fontFamily: 'Kumbh Sans',
    fontWeight: '400',
    fontSize: 16,
  },
  button: {
    display: 'flex',
    height: 30,
    paddingHorizontal: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: mainBlue,
    backgroundColor: lighterBlue,
  },
  buttonText: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    fontSize: 16,
    color: mainBlue,
  },
  bigNumber: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    fontSize: 20,
  },
  numberLabel: {
    fontFamily: 'Kumbh Sans',
    fontWeight: '400',
    fontSize: 16,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  greyBar: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: lighterGray,
  },
  cell: {
    paddingHorizontal: 10,
  },
});

interface Props {
  username: string;
  location: string;
  followers: number;
  following: number;
  savedLocation: number;
}

const StatsHeader = (props: Props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.proPic}
        source={require('../../../assets/img/picstop-no-text.png')}
      />
      <View style={styles.stacked}>
        <View style={styles.topHalf}>
          <View style={styles.nameInfo}>
            <Text style={styles.username}>{props.username}</Text>
            <Text style={styles.location}>{props.location}</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statsRow}>
          <View style={{ ...styles.cell, paddingLeft: 0 }}>
            <Text style={styles.bigNumber}>{props.followers}</Text>
            <Text style={styles.numberLabel}>Followers</Text>
          </View>
          <View style={{ ...styles.greyBar, ...styles.cell }}>
            <Text style={styles.bigNumber}>{props.following}</Text>
            <Text style={styles.numberLabel}>Following</Text>
          </View>
          <View style={{ ...styles.cell, paddingRight: 0 }}>
            <Text style={styles.bigNumber}>{props.savedLocation}</Text>
            <Text style={styles.numberLabel}>Locations</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StatsHeader;
