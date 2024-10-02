import React, {useState} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
const supportTextPlaceholder = '예시) 잔디야! 오늘 8시에 새도 스터디 기억하지?';

const CheerupText = () => {
  const [supportText, setSupportText] = useState('');
  const handleSendPress = () => {
    setSupportText('');
  };
  return (
    <View style={styles.supportTextSection}>
      <Text style={styles.sectionTitle}>응원텍스트</Text>

      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInputPlaceholder}
          placeholder={supportTextPlaceholder}
          maxLength={20}
          onChangeText={text => setSupportText(text)}
          value={supportText}></TextInput>
        <TouchableOpacity style={styles.sendButton} onPress={handleSendPress}>
          <Text style={styles.sendButtonText}>보내기</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.infoText}>
        응원 텍스트는 최대 20자 입력, 매일 하루 2개씩 가능합니다!
      </Text>
    </View>
  );
};

export default CheerupText;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 10,
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#838F8F',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 10,
    color: '#009499',
    marginTop: 5,
  },
  supportTextSection: {
    padding: 20,
    backgroundColor: '#F2F4F6',
    borderRadius: 10,
    marginBottom: 20,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5AA6A8',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  textInputPlaceholder: {
    color: '#81A3A5',
    flex: 1,
    fontSize: 11,
    marginLeft: 10,
  },
  sendButton: {
    backgroundColor: '#009499',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
