import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

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

  const [enlargedStickers, setEnlargedStickers] = useState([]);

  const handleStickerClick = sticker => {
    setEnlargedStickers(
      prev =>
        prev.includes(sticker)
          ? prev.filter(item => item !== sticker) // Remove if already enlarged
          : [...prev, sticker], // Add if not enlarged
    );
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
    </View>
  );
};

export default Sticker;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 10,
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#838F8F',
    marginBottom: 5,
  },
  stickerSection: {
    padding: 20,
  },
  stickerContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  sticker: {
    margin: 5,
  },
  infoText: {
    fontSize: 10,
    color: '#009499',
    marginTop: 5,
  },
  stickerImage: {
    width: 40,
    height: 40,
  },
  enlargedSticker: {
    transform: [{scale: 1.0}],
  },
  enlargedStickerImage: {
    width: 60,
    height: 60,
  },
});
