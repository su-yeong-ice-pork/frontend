import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const Header = ({Title}: any) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.backButtonWrapper}
        onPress={() => navigation.goBack()}>
        <Image
          source={require('../../assets/images/icons/backButton.png')}
          style={styles.backButtonIcon}
        />
      </TouchableOpacity>
      <View style={styles.titleWrapper}>
        <Text style={styles.headerText}>{Title}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: height * 0.08,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.03,
    backgroundColor: '#fff',
  },
  backButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonIcon: {
    width: width * 0.06,
    height: width * 0.06,
    resizeMode: 'contain',
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'NanumSquareNeo-cBd',
    fontSize: 17,
    color: '#454545',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
