import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import BottomBar from '../components/BottomBar';
import CalendarScreen from '../components/calendar';
import Sticker from '../components/CheerupSticker';
import CheerupWords from '../components/CheerupWords';
import CheerupText from '../components/CheerupText';
const {width, height} = Dimensions.get('window');

const FriendsProfile = () => {
  const IMAGES = {
    profile: require('../../assets/images/illustration/typeThree.png'),
    logo: require('../../assets/images/illustration/logo.png'),
    badge1: require('../../assets/images/badge/badge1.png'),
    badge2: require('../../assets/images/badge/badge2.png'),
    badge3: require('../../assets/images/badge/badge3.png'),
    leaveFriends: require('../../assets/images/icons/leaveFriend.png'),
    moreIcon: require('../../assets/images/icons/moreIcon2.png'),
  };

  const profiles = [
    {
      id: 1,
      name: '김태영',
      nickName: '새도의 신',
      image: null,
      badge: [
        {image: IMAGES.badge1},
        {image: IMAGES.badge2},
        {image: IMAGES.badge3},
      ],
      message: '기말고사 힘들다..',
    },
  ];

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{paddingBottom: 80}}>
          <View style={styles.logoSection}>
            <View style={styles.logoInfo}>
              <Image source={IMAGES.logo} style={styles.logoImage} />
            </View>
          </View>

          {profiles.map(profile => (
            <View key={profile.id}>
              <View style={styles.upperSection}>
                <View style={styles.profileInfo}>
                  <Image
                    source={
                      profile.image ? {uri: profile.image} : IMAGES.profile
                    }
                    style={styles.profileImage}
                  />
                </View>
              </View>

              <View style={styles.profileTextContainer}>
                <Text style={styles.nickname}>{profile.nickName}</Text>
                <Text style={styles.username}>{profile.name}</Text>

                {/* 친구 떠나기 버튼 */}
                <View style={styles.leaveButtonContainer}>
                  <TouchableOpacity style={styles.leaveButton}>
                    <Image
                      source={IMAGES.leaveFriends}
                      style={styles.leaveIcon}
                    />
                    <Text style={styles.leaveButtonText}>친구 떠나기</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* 친구의 한마디 Section */}
              <View style={styles.friendMessageSection}>
                <Text style={styles.sectionTitle}>친구의 한마디</Text>
                <View style={styles.friendMessageButton}>
                  <Text style={styles.friendMessageText}>
                    {profile.message}
                  </Text>
                </View>
              </View>

              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>보유 뱃지</Text>
                <View style={styles.badges}>
                  {profile.badge.map((badge, index) => (
                    <Image
                      key={index}
                      source={badge.image}
                      style={styles.badge}
                    />
                  ))}

                  <TouchableOpacity style={styles.moreButton}>
                    <Image style={styles.moreImage} source={IMAGES.moreIcon} />
                    <Text style={styles.moreText}>더보기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          {/* 응원스티커 Section */}
          <Sticker />

          {/* 응원문구 Section */}
          <CheerupWords />

          {/* 응원텍스트 Section */}
          <CheerupText />

          {/* 현재 일수 표시 */}
          <View style={styles.currentDaySection}>
            <Text style={styles.currentDayText}>
              현재 <Text style={styles.dayCount}>43</Text>일 째!
            </Text>
          </View>

          {/* 달력 부분 */}
          <View style={styles.calendarContainer}>
            <CalendarScreen />
          </View>
        </ScrollView>
        <BottomBar />
      </SafeAreaView>
    </>
  );
};

export default FriendsProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    marginLeft: 10,
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '900',
  },
  username: {
    fontSize: 20,
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '900',
    color: '#333',
    marginLeft: 10,
    marginTop: -10,
  },
  badgeContainer: {
    padding: 20,
    alignItems: 'center',
  },
  badges: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 10,
    marginLeft: 7,
    fontWeight: 'bold',
    fontFamily: 'NanumSquareNeo-Variable',
    color: '#838F8F',
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  badge: {
    width: 35,
    height: 35,
    marginRight: 7,
    resizeMode: 'contain',
  },
  moreButton: {
    color: '#009499',
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreText: {
    fontSize: 12, // text-xs
    fontWeight: '800', // font-extrabold
    color: '#0D9488', // text-teal-600
    marginLeft: 5,
    fontFamily: 'NanumSquareNeo-Variable',
  },
  moreImage: {
    marginTop: 8,
    marginLeft: 15,
    marginRight: 5,
    marginBottom: 5,
  },
  friendMessageSection: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginLeft: 10,
    position: 'relative',
    alignSelf: 'flex-start',
  },
  sectionTitle: {
    fontSize: 10,
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#838F8F',
    marginBottom: 5,
    fontFamily: 'NanumSquareNeo-Variable',
  },
  friendMessageButton: {
    backgroundColor: '#5AA6A8',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  friendMessageText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '700',
  },
  leaveButtonContainer: {
    position: 'absolute',
    right: width * 0.05,
    marginTop: height * 0.02,
  },
  leaveButton: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderColor: '#FF6F61',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 15,
    marginLeft: 140,
    marginTop: -30,
    borderWidth: 1.5,
  },
  leaveButtonText: {
    color: '#FF6F61',
    fontWeight: '800',
    marginLeft: 5,
    fontFamily: 'NanumSquareNeo-Variable',
  },
  leaveIcon: {
    width: 16,
    height: 16,
  },
  infoText: {
    fontSize: 10,
    color: '#009499',
    marginTop: 5,
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '700',
  },
  currentDaySection: {
    padding: 20,
    alignItems: 'flex-start',
  },
  dayCount: {
    fontSize: 24,
    color: '#009499',
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '900',
  },
  currentDayText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '900',
  },
  calendarContainer: {
    marginTop: 20,
  },
});
