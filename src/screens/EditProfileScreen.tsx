import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {launchImageLibrary} from 'react-native-image-picker';

const {width, height} = Dimensions.get('window');

const IMAGES = {
  backButton: require('../../assets/images/icons/backButton.png'),
};

const EditProfileScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.signUpHeader}>
        <TouchableOpacity
          style={styles.backButtonWrapper}
          onPress={() => navigation.goBack()}>
          <Image source={IMAGES.backButton} style={styles.setBackButton} />
        </TouchableOpacity>
        <Text style={styles.headerText}>프로필 / 배너 꾸미기</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.formContainer}
        style={{backgroundColor: '#E1E6E8'}}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            나의 <Text style={{color: '#00AAB0'}}>잔디 프로필</Text>을{'\n'}
            원하는 대로 예쁘게 꾸며봐요!
          </Text>
        </View>

        <ChangeProfileImage />
        <ChangeBannerImage />
      </ScrollView>
      <SaveButton />
    </View>
  );
};

export default EditProfileScreen;

// 프로필 사진 변경
const ChangeProfileImage = () => {
  return (
    <View style={styles.changeContainer}>
      <View>
        <Text style={styles.textStyle}>프로필 사진 변경</Text>
        <View style={styles.imageBox}></View>
      </View>
    </View>
  );
};

// 배너 사진 변경
const ChangeBannerImage = () => {
  return (
    <View>
      <View>
        <Text style={styles.textStyle}>배너 사진 변경</Text>
      </View>
    </View>
  );
};

// 저장하기 버튼
const SaveButton = () => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.signUpButton}>
        <LinearGradient
          colors={['rgba(31, 209, 245, 1)', 'rgba(0, 255, 150, 1)']}
          style={{
            flex: 1,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <Text style={styles.signUpButtonText}>저장하기</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  signUpHeader: {
    justifyContent: 'center',
    marginTop: height * 0.005,
  },
  backButtonWrapper: {
    position: 'absolute',
    top: height * 0.01, // 필요한 위치에 맞게 조정하세요.
    left: width * 0.03,
    zIndex: 1,
    padding: 10, // 터치 영역 확대
  },
  setBackButton: {
    resizeMode: 'contain',
    width: width * 0.05,
    height: width * 0.05,
  },
  headerText: {
    fontFamily: 'NanumSquareNeo-cBd',
    fontSize: 17,
    color: '#454545',
    fontWeight: 'bold',
    textAlign: 'center', // 텍스트를 가운데 정렬
    marginVertical: height * 0.02,
  },
  formContainer: {
    paddingHorizontal: width * 0.05,
  },
  titleContainer: {
    marginTop: 20,
  },

  titleText: {
    fontSize: 28,
    fontWeight: '700',
  },

  buttonContainer: {
    backgroundColor: '#E1E6E8', // 여백 부분에 색상 채움
    alignItems: 'center', // 버튼을 가운데 정렬
  },
  signUpButton: {
    height: height * 0.07,
    width: width * 0.5,
    marginBottom: height * 0.02,
    backgroundColor: '#E1E6E8',
  },
  signUpButtonText: {
    color: '#FFFFFF',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  changeContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  textStyle: {
    color: '#454545',
    fontWeight: '800',
    marginBottom: 10,
  },
  imageBox: {
    backgroundColor: '#FFFFFF',
    width: width,
    height: height * 0.13,
  },
});
