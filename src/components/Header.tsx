import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>스터디</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    width: width,
    height: height * 0.08, // 화면 높이의 10%
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    // 그림자나 추가 스타일이 필요하면 여기에 작성
  },
  headerText: {
    fontSize: 18, // 적절한 크기로 조정
    color: '#000',
    fontFamily: 'NanumSquareNeo-dEb', // 커스텀 폰트 적용
  },
});
