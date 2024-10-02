import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {NotificationData} from './components/types/NotificationData';

const {width} = Dimensions.get('window');
const images = {
  smile: require('../../assets/images/emoji/smile.png'),
  hmm: require('../../assets/images/emoji/hmm.png'),
  star: require('../../assets/images/emoji/star.png'),
  sweat: require('../../assets/images/emoji/sweat.png'),
  surprise: require('../../assets/images/emoji/surprise.png'),
  comment: require('../../assets/images/emoji/comment.png'),
};

interface NotificationItemProps extends NotificationData {
  onPress?: () => void; // Optional onPress handler
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  imageUrl,
  content,
  sender,
  time,
  type,
  onPress,
}) => {
  // Determine the image to use based on type and imageUrl
  const imageSource = images[imageUrl];

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}>
      <Image source={imageSource} style={styles.image} resizeMode="contain" />
      <View style={styles.textContainer}>
        {type === 'emoji' ? (
          <>
            <Text style={styles.senderText}>
              {`${sender}님께서 이모지를 날리셨어요!`}
            </Text>
            <Text style={styles.contentText}>{content}</Text>
          </>
        ) : (
          <>
            <Text style={styles.senderText}>
              {`${sender}님께서 문구를 남겼어요!`}
            </Text>
            <Text style={styles.contentText}>{content}</Text>
          </>
        )}
        <Text style={styles.timeText}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginHorizontal: width * 0.05,
    marginTop: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.14,
    shadowRadius: 6,
    elevation: 2, // For Android shadow
  },
  image: {
    width: 48,
    height: 48,
    marginRight: 16,
    marginTop: 10,
  },
  textContainer: {
    flex: 1,
  },
  senderText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#52525b',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  contentText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '700',
    color: '#71717a',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  timeText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '700',
    color: '#a3a3a3',
    fontFamily: 'NanumSquareNeo-Variable',
  },
});
