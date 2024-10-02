import React from 'react';
import {TouchableOpacity, Text, Image, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface StudyButtonProps {
  isRecording: boolean;
  onPress: () => void;
}

const StudyButton: React.FC<StudyButtonProps> = ({isRecording, onPress}) => {
  if (isRecording) {
    // 기록 중인 경우
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.button, styles.recordingButton]}>
          <Image
            source={require('../../assets/images/icons/Clock.png')}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.recordingText}>기록 잠시 멈추기</Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    // 기록 중이 아닌 경우
    return (
      <TouchableOpacity onPress={onPress}>
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
  }
};

export default StudyButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 128,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginTop: 10,
  },
  recordingButton: {
    backgroundColor: '#FE5B5B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginTop: 10,
  },
  icon: {
    width: 23,
    height: 23,
    marginRight: 3,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  recordingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'NanumSquareNeo-Variable',
  },
});
