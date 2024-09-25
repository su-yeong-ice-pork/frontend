// src/components/BottomBar.tsx
import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const BottomBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const currentScreen = route.name;

  const images = {
    note:
      currentScreen === 'Note'
        ? require('../../assets/images/icons/noteOn.png')
        : require('../../assets/images/icons/note.png'),
    study:
      currentScreen === 'Study'
        ? require('../../assets/images/icons/studyOn.png')
        : require('../../assets/images/icons/study.png'),
    home:
      currentScreen === 'Home'
        ? require('../../assets/images/icons/homeOn.png')
        : require('../../assets/images/icons/home.png'),
    alarm:
      currentScreen === 'Alarm'
        ? require('../../assets/images/icons/alarmOn.png')
        : require('../../assets/images/icons/alarm.png'),
    profile:
      currentScreen === 'Profile'
        ? require('../../assets/images/icons/profileOn.png')
        : require('../../assets/images/icons/profile.png'),
  };

  const getLabelStyle = (screen: string) => {
    return [styles.label, currentScreen === screen && styles.labelActive];
  };

  const navigateTo = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigateTo('Note')}>
        <Image source={images.note} style={styles.icon} />
        <Text style={getLabelStyle('Note')}>기록장</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigateTo('Study')}>
        <Image source={images.study} style={styles.icon} />
        <Text style={getLabelStyle('Study')}>스터디</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigateTo('Home')}>
        <Image source={images.home} style={styles.icon} />
        <Text style={getLabelStyle('Home')}>홈</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigateTo('Alarm')}>
        <Image source={images.alarm} style={styles.icon} />
        <Text style={getLabelStyle('Alarm')}>알림</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigateTo('Profile')}>
        <Image source={images.profile} style={styles.icon} />
        <Text style={getLabelStyle('Profile')}>프로필</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    width: width,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    position: 'absolute',
    bottom: 0,
    // Ensure the bar is above other content
    zIndex: 100,
  },
  iconContainer: {
    padding: 10,
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    color: '#ABABAB', // Default text color
    fontFamily: 'NanumSquareNeo-eHv', // Custom font
    fontWeight: 'normal',
  },
  labelActive: {
    color: '#000', // Active text color
    fontWeight: 'bold',
  },
});
