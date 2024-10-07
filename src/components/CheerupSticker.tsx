<<<<<<< HEAD
// Sticker.tsx
=======
// src/components/CheerupSticker.tsx
>>>>>>> 409949a0dd87b70d155a0640a9d4d8d23d540897

import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
<<<<<<< HEAD
  Alert,
=======
>>>>>>> 409949a0dd87b70d155a0640a9d4d8d23d540897
} from 'react-native';

const {width, height} = Dimensions.get('window');

const Sticker = () => {
  const IMAGES = {
    sticker1: require('../../assets/images/emoji/smile.png'),
    sticker2: require('../../assets/images/emoji/hmm.png'),
    sticker3: require('../../assets/images/emoji/sweat.png'),
    sticker4: require('../../assets/images/emoji/surprise.png'),
    sticker5: require('../../assets/images/emoji/star.png'),
  };

  const stickers = [
    {id: 1, key: 'sticker1', image: IMAGES.sticker1},
    {id: 2, key: 'sticker2', image: IMAGES.sticker2},
    {id: 3, key: 'sticker3', image: IMAGES.sticker3},
    {id: 4, key: 'sticker4', image: IMAGES.sticker4},
    {id: 5, key: 'sticker5', image: IMAGES.sticker5},
  ];

  const [enlargedStickers, setEnlargedStickers] = useState<string[]>([]);

  const handleStickerClick = (stickerKey: string) => {
    setEnlargedStickers(
      prev =>
<<<<<<< HEAD
        prev.includes(stickerKey)
          ? prev.filter(item => item !== stickerKey) // Remove if already enlarged
          : [...prev, stickerKey], // Add if not enlarged
=======
        prev.includes(sticker)
          ? prev.filter(item => item !== sticker) // 이미 확대된 경우 제거
          : [...prev, sticker], // 확대되지 않은 경우 추가
>>>>>>> 409949a0dd87b70d155a0640a9d4d8d23d540897
    );

    // 여기서 서버로 선택된 스티커를 전송하는 로직을 추가할 수 있습니다.
    Alert.alert('응원스티커 전송', `${stickerKey} 스티커가 전송되었습니다!`);
  };

  return (
    <View style={styles.stickerSection}>
      <Text style={styles.sectionTitle}>응원스티커</Text>
      <View style={styles.stickerContainer}>
        {stickers.map(sticker => (
          <TouchableOpacity
            key={sticker.id}
            onPress={() => handleStickerClick(sticker.key)}
            style={[
              styles.sticker,
              enlargedStickers.includes(sticker.key) && styles.enlargedSticker,
            ]}>
            <Image
              source={sticker.image}
              style={[
                styles.stickerImage,
                enlargedStickers.includes(sticker.key) &&
                  styles.enlargedStickerImage,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.infoText}>
        클릭한 응원스티커는 상대방에게 알림이 갑니다! 스티커는 매일 하루 2개씩
        가능합니다!
      </Text>
    </View>
  );
};

export default Sticker;

const styles = StyleSheet.create({
  stickerSection: {
<<<<<<< HEAD
    padding: width * 0.02, // 5% of screen width
    backgroundColor: '#F2F4F6',
    borderRadius: width * 0.02, // 2% of screen width
    marginHorizontal: width * 0.03, // 5% of screen width (왼쪽과 오른쪽 마진 동일)
    marginBottom: height * 0.02, // 2% of screen height
  },
  sectionTitle: {
    fontSize: width * 0.035, // 3.5% of screen width
    marginLeft: width * 0.012, // 1.2% of screen width
    fontWeight: 'bold',
    color: '#838F8F',
    marginBottom: height * 0.01, // 1% of screen height
=======
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
  },
  sectionTitle: {
    fontSize: width * 0.035,
    fontWeight: 'bold',
    color: '#838F8F',
    marginBottom: height * 0.01,
>>>>>>> 409949a0dd87b70d155a0640a9d4d8d23d540897
    fontFamily: 'NanumSquareNeo-Variable',
  },
  stickerContainer: {
    flexDirection: 'row',
<<<<<<< HEAD
    flexWrap: 'wrap', // Allow wrapping on smaller screens
    justifyContent: 'space-between',
    padding: width * 0.04, // 4% of screen width
    backgroundColor: '#FFFFFF',
    borderRadius: width * 0.02, // 2% of screen width
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
    marginBottom: height * 0.015, // 1.5% of screen height
  },
  sticker: {
    margin: width * 0.01, // 1% of screen width
  },
  stickerImage: {
    width: width * 0.1, // 10% of screen width
    height: width * 0.1, // 10% of screen width (keeping it square)
    resizeMode: 'contain',
  },
  enlargedSticker: {
    // Optional: Additional styles for enlarged sticker
  },
  enlargedStickerImage: {
    width: width * 0.14, // 14% of screen width
    height: width * 0.14, // 14% of screen width
  },
  infoText: {
    fontSize: width * 0.03, // 3% of screen width
    color: '#009499',
    marginTop: height * 0.005, // 0.5% of screen height
    textAlign: 'center',
    fontFamily: 'NanumSquareNeo-Variable',
=======
    flexWrap: 'nowrap', // 한 줄에 표시하도록 설정
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: width * 0.03,
    borderRadius: 6,
    alignItems: 'center', // 세로 중앙 정렬
  },
  sticker: {
    marginHorizontal: width * 0.005, // 좌우 여백을 줄임
  },
  stickerImage: {
    width: width * 0.12, // 이미지 크기를 작게 조정
    height: width * 0.12,
  },
  enlargedStickerImage: {
    width: width * 0.15, // 클릭 시 이미지 크기를 조금 더 크게
    height: width * 0.15,
  },
  infoText: {
    fontSize: width * 0.03,
    color: '#009499',
    marginTop: height * 0.01,
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '700',
>>>>>>> 409949a0dd87b70d155a0640a9d4d8d23d540897
  },
});
