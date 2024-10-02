import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

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
            <Text style={styles.supportButtonText}>{message.text}</Text>
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
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  supportButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#5AA6A8',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 5,
    alignItems: 'center',
  },
  supportButton2: {
    backgroundColor: '#009499',
    borderWidth: 1,
    borderColor: '#5AA6A8',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 5,
    alignItems: 'center',
  },
  supportButtonText: {
    color: '#5AA6A8',
    fontWeight: 'bold',
  },
  supportButtonText2: {
    color: 'white',
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 10,
    color: '#009499',
    marginTop: 5,
  },
});
