// src/components/StudyButton.tsx

import React from 'react';
import {TouchableOpacity, Text, Image, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const StudyButton: React.FC = () => {
  return (
    <TouchableOpacity>
      <LinearGradient
        colors={['#2CCDE4', '#25E798']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.button}>
        <Image
          source={require('../../assets/images/icons/whiteNote.png')}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.text}>공부 기록 시작하기</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default StudyButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 25,
    marginTop: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'NanumSquareNeo-aLt',
  },
});
