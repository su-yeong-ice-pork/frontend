import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Calendar, DateData, LocaleConfig} from 'react-native-calendars';
const {width, height} = Dimensions.get('window');
import CalendarScreen from '../components/calendar';
import BottomBar from '../components/BottomBar';
const HomeScreen = () => {
  const IMAGES = {
    profile: require('../../assets/images/illustration/typeThree.png'),
    logo: require('../../assets/images/illustration/logo.png'),
    self: require('../../assets/images/illustration/typeTwo.png'),
    together: require('../../assets/images/illustration/typeOne.png'),
    badge1: require('../../assets/images/badge/badge1.png'),
    badge2: require('../../assets/images/badge/badge2.png'),
    badge3: require('../../assets/images/badge/badge3.png'),
    freeze: require('../../assets/images/illustration/freeze.png'),
  };
  return (
    <>
      <ScrollView style={styles.container}>
        {/* 상단 프로필 영역 */}

        <View style={styles.logoSection}>
          <View style={styles.logoInfo}>
            <Image source={IMAGES.logo} style={styles.logoImage} />
          </View>
        </View>

        <View style={styles.upperSection}>
          <View style={styles.profileInfo}>
            <Image
              source={IMAGES.profile} // 프로필 이미지 URL 대체 가능
              style={styles.profileImage}
            />
          </View>
        </View>

        <View style={styles.profileTextContainer}>
          <Text style={styles.nickname}>새도의 신</Text>
          <Text style={styles.username}>이은솔</Text>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>보유 뱃지</Text>
            <Image source={IMAGES.badge1} style={styles.badge} />
            <Image source={IMAGES.badge2} style={styles.badge} />
            <Image source={IMAGES.badge3} style={styles.badge} />
          </View>

          <TouchableOpacity style={styles.moreButton}>
            <Text style={styles.moreText}>...</Text>
          </TouchableOpacity>
        </View>

        {/* 인증하기 버튼들 */}
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.certifyButton}>
            <Text style={styles.buttonText}>혼자 인증하기</Text>
            <Image source={IMAGES.self} style={styles.buttons} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.certifyButton2}>
            <Text style={styles.buttonText}>함께 인증하기</Text>
            <Image source={IMAGES.together} style={styles.buttons} />
          </TouchableOpacity>
        </View>

        {/* 보유 콘텐츠 및 현재 일수 */}
        <View style={styles.frozenSection}>
          <Text style={styles.frozenTitle}>보유 프리즈</Text>
          <View style={styles.frozenDetailContainer}>
            <Text style={styles.frozenDetailText}>
              현재 총 <Text style={styles.frozenCount}>12</Text> 개의 프리즈를
              보유하고 있습니다.
            </Text>
            <TouchableOpacity style={styles.useFrozenButton}>
              <View style={styles.frozenText}>
                <Image source={IMAGES.freeze} style={styles.freeze} />
                <Text style={styles.useFrozenButtonText}>프리즈 사용하기</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.frozenNote}>
            ※ 프리즈는 잔다를 대신 채워줄 수 있는 잔디 채우기권입니다!
          </Text>
        </View>
        {/* 현재 일수 표시 */}
        <View style={styles.currentDaySection}>
          <Text style={styles.currentDayText}>
            현재<Text style={styles.dayCount}> 43</Text>일 째!
          </Text>
        </View>

        {/* 달력 부분 */}
        <View style={styles.calendarContainer}>
          <CalendarScreen />
        </View>
      </ScrollView>
      <BottomBar />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    width: width,
    height: height,
  },

  logoSection: {
    alignItems: 'center',

    flexDirection: 'row',
  },

  logoInfo: {
    flexDirection: 'row',
  },

  logoImage: {
    width: 80,
    height: 50,
    left: 20,
    resizeMode: 'contain',
  },

  upperSection: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 50,
    backgroundColor: '#86C0AE',
  },
  profileInfo: {
    flexDirection: 'row',
    flex: 1,
    position: 'absolute',
  },
  profileImage: {
    width: 100,
    height: 100,
    marginTop: 50,
    left: 30,
  },
  profileTextContainer: {
    marginLeft: 15,
    marginTop: 50,
    flexDirection: 'row',
  },

  nickname: {
    fontSize: 12,
    color: '#009499',
    flexDirection: 'row',
    marginLeft: 10,
  },

  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: -10,
  },

  badgeContainer: {
    flexDirection: 'row',
    marginLeft: 100,
    color: '#009499',

    position: 'relative',
  },
  badgeText: {
    fontSize: 14,
    color: '#777',
    flexDirection: 'row',
    marginTop: -30,
    position: 'absolute',
  },

  badge: {
    width: 35,
    height: 35,
    marginRight: 7,
    resizeMode: 'contain',
  },
  moreButton: {
    color: '#009499',
  },
  moreText: {
    fontSize: 20,
    color: '#009499',
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 40,
  },
  certifyButton: {
    backgroundColor: '#86C0AE',
    width: 150,
    height: 100,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    elevation: 3,
    marginHorizontal: 10,
  },
  certifyButton2: {
    backgroundColor: '#1AA5AA',
    width: 150,
    height: 100,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    elevation: 3,
    marginHorizontal: 10,
  },
  buttonText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 14, // 텍스트 크기
    fontWeight: 'bold', // 텍스트 두께
  },

  buttons: {
    width: 130, // 이미지의 가로 크기
    height: 55, // 이미지의 세로 크기
    resizeMode: 'contain',
    marginTop: 10,
  },

  frozenSection: {
    padding: 0,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    left: 30,
    marginBottom: 10,
  },

  frozenTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#838F8F',
    marginBottom: 5,
  },
  frozenDetailContainer: {
    flexDirection: 'row',
    width: 230,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 3,
  },
  frozenDetailText: {
    fontSize: 10,
    color: '#333',
  },
  frozenCount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#12A5B0',
  },
  useFrozenButton: {
    backgroundColor: '#1AA5AA',
    paddingHorizontal: 15,
    borderRadius: 3,
    height: 50,
    left: 27,
    flexDirection: 'row',
    alignItems: 'center', // 중앙 정렬 추가
    justifyContent: 'center', // 중앙 정렬 추가
  },

  frozenText: {
    flexDirection: 'row',

    alignItems: 'center', // 중앙 정렬 추가
  },

  useFrozenButtonText: {
    color: '#FFFFFF',

    fontSize: 10,
    fontWeight: 'bold',
  },

  freeze: {
    right: 5,
  },

  frozenNote: {
    fontSize: 9,
    color: '#009499',
    marginTop: 5,
  },

  currentDaySection: {
    padding: 20,
    alignItems: 'flex-start',
  },

  dayCount: {
    fontSize: 24,
    color: '#009499',
  },
  currentDayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#E0F7FA',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#333',
  },
});
