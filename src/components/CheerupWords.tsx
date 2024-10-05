import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const cheerupWords = () => {
  const supportMessages = [
    {id: 1, text: '잔디 심자!'},
    {id: 2, text: '힘내!'},
    {id: 3, text: '더 심자!'},
    {id: 4, text: '잔디 챙겨!'},
  ];

  return (
    <View style={styles.supportMessageSection}>
      <Text style={styles.sectionTitle}>응원문구</Text>
      <View style={styles.messageContainer}>
        {supportMessages.map(message => (
          <TouchableOpacity key={message.id} style={styles.supportButton}>
            <Text
              style={styles.supportButtonText}
              adjustsFontSizeToFit
              numberOfLines={1}>
              {message.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.infoText}>
        클릭한 응원문구는 상대방에게 알림이 갑니다! 문구는 매일 하루 2개씩
        가능합니다!
      </Text>
    </View>
  );
};

export default cheerupWords;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 10,
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#838F8F',
    marginBottom: 5,
  },
  supportMessageSection: {
    padding: 20,
    backgroundColor: '#F2F4F6',
    borderRadius: 10,
    marginBottom: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  supportButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#5AA6A8',
    borderRadius: 20,
    paddingVertical: 10,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  supportButtonText: {
    color: '#5AA6A8',
    fontWeight: 'bold',
    fontSize: 13,
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 10,
    color: '#009499',
    marginTop: 5,
  },
});
