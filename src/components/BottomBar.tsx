//src/components/BottomBar.tsx
import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
const {width} = Dimensions.get('window');
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
        <Text style={styles.label}>기록장</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Image source={images.study} style={styles.icon} />
        <Text style={styles.label}>스터디</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Image source={images.home} style={styles.icon} />
        <Text style={styles.label}>홈</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Image source={images.alarm} style={styles.icon} />
        <Text style={styles.label}>알림</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer}>
        <Image source={images.profile} style={styles.icon} />
        <Text style={styles.label}>프로필</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  },
  iconContainer: {
    padding: 10,
    alignItems: 'center',
  },
  icon: {
    width: 26,
    height: 26,
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: '#ABABAB', // 텍스트 색상
    fontFamily: 'NanumSquareNeo-eHv', // 커스텀 폰트 적용
  },
});

export default BottomBar;
