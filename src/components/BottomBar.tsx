import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';

const BottomBar = () => {
  // Fix the images object with unique keys
  const images = {
    note: require('../../assets/images/icons/note.png'),
    study: require('../../assets/images/icons/study.png'),
    home: require('../../assets/images/icons/home.png'),
    alarm: require('../../assets/images/icons/alarm.png'),
    profile: require('../../assets/images/icons/profile.png'),
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <Image source={images.note} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Image source={images.study} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Image source={images.home} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Image source={images.alarm} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Image source={images.profile} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    width: 400,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  iconContainer: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default BottomBar;
