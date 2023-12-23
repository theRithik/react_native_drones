import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const ProfilePic = () => {
  return (
    <View style={styles.ImageContainer}>
      <Image
        source={require('../../assets/logoanim.gif')}
        style={styles.Image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ImageContainer: {
    height: 36,
    width: 36,
    borderColor: '#21262E',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius:20
  },
  Image: {
    height: 36,
    width:36,
    borderRadius:5,
    borderWidth: 1,
  },
});

export default ProfilePic;