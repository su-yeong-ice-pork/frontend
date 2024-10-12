import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';

import BottomBar from '../components/BottomBar';
import LinearGradient from 'react-native-linear-gradient';

import {getMemberData, Member} from '../api/profile';
import {getBadges, Badge} from '../api/badge';

import {useRecoilState, useRecoilValue} from 'recoil';
import userState from '../recoil/userAtom';
import authState from '../recoil/authAtom';

const {width, height} = Dimensions.get('window');

const IMAGES = {
  profile: require('../../assets/images/illustration/typeThree.png'),
  logo: require('../../assets/images/illustration/logo.png'),
  friendsIcon: require('../../assets/images/icons/friendsIcon.png'),
  groupsIcon: require('../../assets/images/icons/groupsIcon.png'),
  badge1: require('../../assets/images/badge/badge1.png'),
  badge2: require('../../assets/images/badge/badge2.png'),
  badge3: require('../../assets/images/badge/badge3.png'),
  freeze: require('../../assets/images/illustration/freeze.png'),
  lockIcon: require('../../assets/images/icons/lockIcon.png'),
  logoutIcon: require('../../assets/images/icons/logoutIcon.png'),
  moreIcon: require('../../assets/images/icons/moreIcon2.png'),
  coloredFriendsIcon: require('../../assets/images/icons/coloredFriendsIcon.png'),
  coloredGroupIcon: require('../../assets/images/icons/coloredGroupIcon.png'),
  jandi1: require('../../assets/images/illustration/jandi1.png'),
  jandi2: require('../../assets/images/illustration/jandi2.png'),
  editProfile: require('../../assets/images/icons/profileEdit.png'),
  profileBackButton: require('../../assets/images/icons/profileBackButton.png'),
  sleepyFaceEmoji: require('../../assets/images/emoji/sleepyFaceEmoji.png'),
  closeLogout: require('../../assets/images/icons/closeLogout.png'),
  iIcon: require('../../assets/images/icons/iIcon.png'),
};

const ProfileScreen = ({navigation}) => {
  const [member, setMember] = useState<Member | null>(null);
  const [badges, setBadges] = useState<Badge[] | null>(null);
  const authInfo = useRecoilValue(authState);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const memberData = await getMemberData(authInfo.authToken);
        if (memberData) {
          setMember(memberData);
          setUser(memberData);
          const badgesData = await getBadges(memberData.id, authInfo.authToken);

          if (badgesData) {
            setBadges(badgesData);
          } else {
            console.log('뱃지를 불러오는 데 실패했습니다.');
          }
        } else {
          console.log('프로필을 불러오는 데 실패했습니다.');
        }
      } catch (error) {
        console.log('데이터를 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchMember();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{paddingBottom: 80}}>
          <View style={styles.logoSection}>
            <View style={styles.logoInfo}>
              <Image source={IMAGES.logo} style={styles.logoImage} />
            </View>
          </View>
          <View style={styles.upperSection}>
            <TouchableOpacity
              style={styles.backButtonWrapper}
              onPress={() => navigation.goBack()}>
              <Image
                source={IMAGES.profileBackButton}
                style={styles.profileBackButton}
              />
            </TouchableOpacity>
            <View style={styles.profileInfo}>
              <Image
                source={member?.image ? {uri: member.image} : IMAGES.profile} // 프로필 이미지 URL 대체 가능
                style={styles.profileImage}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('EditProfile')}>
                <Image source={IMAGES.editProfile} style={styles.editIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.profileTextContainer}>
            <Text style={styles.nickname}>{member?.mainTitle}</Text>
            <Text style={styles.username}>{member?.name}</Text>
          </View>

          <View style={styles.content}>
            <InfoCard
              subTitle="현재 나의 잔디 친구"
              iconSrc={IMAGES.coloredFriendsIcon}
              count={5}
              text="의 잔디친구들과 공부 중입니다!"
              buttonSrc={IMAGES.friendsIcon}
              buttonText="친구목록 보기"
            />
            <InfoCard
              subTitle="현재 나의 잔디 스터디그룹"
              iconSrc={IMAGES.coloredGroupIcon}
              count={3}
              text="의 잔디그룹에 소속되어있습니다!"
              buttonSrc={IMAGES.groupsIcon}
              buttonText="그룹목록 보기"
            />
            <BadgeSection badges={badges} />
            <FreezeSummary freezeCount={member?.freezeCount} />
            <GrassSummary name={member?.name} totalDays={85} />
            <GrassButton
              startDate="2024년 6월 16일"
              totalDays={85}
              totalTime={342}
              ImgSrc1={IMAGES.jandi1}
              ImgSrc2={IMAGES.jandi2}
            />
          </View>
          <ProfileFooter navigation={navigation} />
        </ScrollView>
        <BottomBar />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

// InfoCard Component
const InfoCard = ({iconSrc, count, text, buttonSrc, buttonText, subTitle}) => {
  return (
    <>
      {/* SubTitle Section */}
      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>

      {/* Info Card Section */}
      <View style={styles.infoCardContainer}>
        <View style={styles.infoCard}>
          <Image source={iconSrc} style={styles.infoCardIcon} />
          <Text style={styles.infoCardText}>
            <Text style={styles.infoCardCount}>{count}명</Text>
            {text}
          </Text>
        </View>

        {/* Button Section */}
        <TouchableOpacity style={styles.infoCardButton}>
          <Image source={buttonSrc} style={styles.infoCardButtonIcon} />
          <Text style={styles.infoCardButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

// BadgeSection Component
const BadgeSection = ({badges}) => {
  const BADGES = [
    require('../../assets/images/badge/badge1.png'),
    require('../../assets/images/badge/badge2.png'),
    require('../../assets/images/badge/badge3.png'),
  ];

  return (
    <View style={styles.badgeSection}>
      <Text style={styles.badgeTitle}>보유 뱃지</Text>
      <View style={styles.badgeContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {badges && badges.length > 0 ? (
            <>
              {badges.slice(0, 3).map(badge => (
                <Image
                  key={badge.id}
                  source={BADGES[Number(badge.fileName)]}
                  style={styles.badge}
                />
              ))}
              {badges.length > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    console.log('... 버튼 클릭됨');
                  }}
                  style={styles.moreButton}>
                  <Text style={styles.moreText}>...</Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <Text>보유한 뱃지가 없습니다.</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

// FreezeSummary Component
const FreezeSummary = ({freezeCount}) => {
  return (
    <View style={styles.frozenSection}>
      <Text style={styles.frozenTitle}>보유 프리즈</Text>
      <View style={styles.frozenDetailContainer}>
        <Text style={styles.frozenDetailText}>
          현재 총 <Text style={styles.frozenCount}>{freezeCount}</Text> 개의
          프리즈를 보유하고 있습니다.
        </Text>
        <TouchableOpacity style={styles.useFrozenButton}>
          <LinearGradient
            colors={['rgba(31, 209, 245, 1)', 'rgba(0, 255, 150, 1)']} // 그라데이션 색상
            style={styles.gradientStyle}
            start={{x: 0.5, y: 1}}
            end={{x: 0.5, y: 0}}>
            <View style={styles.frozenText}>
              <Image source={IMAGES.freeze} style={styles.freeze} />
              <Text style={styles.useFrozenButtonText}>프리즈 충전하기</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <Text style={styles.frozenNote}>
        <Image source={IMAGES.iIcon} style={styles.setiIcon} /> 프리즈는 잔디를
        대신 채워줄 수 있는 잔디 채우기권입니다!
      </Text>
    </View>
  );
};

// GrassSummary Component
const GrassSummary = ({name, totalDays}) => {
  return (
    <View style={styles.grassSection}>
      <Text style={styles.grassTitle}>
        <Text style={styles.highlightText}>{name}</Text>님은 지금까지
      </Text>
      <Text style={styles.grassTitle}>
        총 <Text style={styles.highlightText}>{totalDays}</Text>일의 잔디를
        심으셨어요!
      </Text>
      {/* Add charts or images related to grass summary here */}
    </View>
  );
};

// GrassButton Component
const GrassButton = ({startDate, totalDays, totalTime, ImgSrc1, ImgSrc2}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.dateText}>
          <Text style={{fontWeight: '800'}}>{startDate}</Text>에 시작하여{' '}
          지금까지 총{' '}
          <Text style={{fontSize: 15, color: '#009499', fontWeight: '500'}}>
            {totalDays}
          </Text>
          일
        </Text>
        <Image source={ImgSrc1} style={styles.image} />
      </View>

      <View style={styles.card}>
        <Text style={styles.timeText}>
          지금까지{'\n'}총{' '}
          <Text style={{fontSize: 15, color: '#009499', fontWeight: '500'}}>
            {totalTime}
          </Text>
          시간의 잔디를{'\n'}
          심으셨어요!
        </Text>
        <Image source={ImgSrc2} style={styles.image} />
      </View>
    </View>
  );
};

// ProfileFooter Component
const ProfileFooter = ({navigation}) => {
  const [showLogOut, setShowLogOut] = useState(false);

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerButton}>
        <Image source={IMAGES.lockIcon} style={styles.footerIcon} />
        <Text
          style={styles.footerButtonText}
          onPress={() =>
            navigation.navigate('FindPassword', {title: '비밀번호 변경하기'})
          }>
          비밀번호 변경하기
        </Text>
      </TouchableOpacity>
      <View style={styles.footerDivider} />
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => setShowLogOut(true)}>
        <Image source={IMAGES.logoutIcon} style={styles.footerIcon} />
        <Text style={styles.footerButtonText}>로그아웃</Text>
      </TouchableOpacity>

      {/* 로그아웃 팝업창 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showLogOut}
        onRequestClose={() => setShowLogOut(false)}>
        <View style={styles.centeredModal}>
          <View style={styles.upperView}>
            <Image source={IMAGES.sleepyFaceEmoji} style={styles.sleepyEmoji} />
            <Text style={styles.modalText}>정말 로그아웃 하실건가요?</Text>
            <TouchableOpacity
              onPress={() => setShowLogOut(false)}
              style={styles.closeButton}>
              <Image source={IMAGES.closeLogout} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.lowerSection}>
            <Text style={styles.modalDescription}>
              조금만 더 하면 잔디가 더 푸르게 자랄 수 있어요!{'\n'}
              잔디는 언제나 기다리고 있을게요.
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowLogOut(false)}>
                <Text style={styles.textStyle}>네, 잘가요!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E7', // bg-zinc-200
  },
  content: {
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.01,
  },
  profileHeader: {
    flexDirection: 'column',
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
  backButtonWrapper: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    padding: 10, // 터치 영역 확대
  },
  profileBackButton: {
    position: 'absolute',
    width: 26,
    height: 26,
    resizeMode: 'contain',
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
  editIcon: {
    position: 'absolute',
    width: 30, // 이전에 제안된 크기 유지
    height: 30, // 이전에 제안된 크기 유지
    right: -30, // profileImage의 우측 바깥쪽 경계에 위치시키기 위한 값
    bottom: -5, // profileImage의 하단 바깥쪽 경계에 위치시키기 위한 값
    resizeMode: 'contain', // 이미지 비율 유지
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
    fontWeight: '900',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  username: {
    fontSize: 20,
    fontWeight: '900',
    color: '#333',
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: -10,
    fontFamily: 'NanumSquareNeo-Variable',
  },
  infoCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subTitleContainer: {
    marginTop: 32,
  },
  subTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#838F8F',
    marginBottom: 5,
    fontFamily: 'NanumSquareNeo-Variable',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.06,
    width: width * 0.6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: width * 0.05,
    borderRadius: 4,
  },
  infoCardIcon: {
    width: width * 0.04,
    height: width * 0.04,
    resizeMode: 'contain',
    marginRight: width * 0.02,
  },
  infoCardText: {
    fontSize: width * 0.03,
    fontWeight: '800',
    color: '#B6B6B6',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  infoCardCount: {
    fontSize: width * 0.04,
    color: '#0D9488',
    fontWeight: '800',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  infoCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.06,
    borderRadius: 4,
    backgroundColor: '#0D9488',
    paddingHorizontal: width * 0.03,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  infoCardButtonIcon: {
    width: width * 0.03,
    height: width * 0.03,
    resizeMode: 'contain',
    marginRight: width * 0.015,
  },
  infoCardButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.03,
    fontWeight: '800',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  badgeSection: {
    marginTop: 16, // mt-4
    width: width * 0.6,
  },
  badgeTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#838F8F',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  badgeContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    height: height * 0.07,
    width: width * 0.65,
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.02,
    borderRadius: 4,
    marginTop: height * 0.01,
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
  },
  frozenSection: {
    marginTop: 16, // mt-4
    // width: width * 0.6, // 고정된 너비 제거
  },
  frozenTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#838F8F',
    marginBottom: 5,
    fontFamily: 'NanumSquareNeo-Variable',
  },
  frozenDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.015,
    justifyContent: 'space-between',
  },
  frozenDetailText: {
    flex: 1, // 텍스트가 남은 공간을 차지하도록 설정
    fontSize: 10,
    color: '#333',
    fontWeight: '700',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  frozenCount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#12A5B0',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  useFrozenButton: {
    // width와 height를 제거하여 내용에 따라 크기가 조절되도록 함
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
  },
  gradientStyle: {
    justifyContent: 'center', // 내용 중앙 정렬
    alignItems: 'center', // 내용 중앙 정렬
    borderRadius: 3,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
  },
  frozenText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  useFrozenButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.035,
    fontWeight: 'bold',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  freeze: {
    width: width * 0.05,
    height: width * 0.05,
    resizeMode: 'contain',
    marginRight: width * 0.01,
  },
  frozenNote: {
    fontSize: 8,
    color: '#009499',
    marginTop: 5,
    fontWeight: '700',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  setiIcon: {
    width: width * 0.03,
    height: height * 0.03,
    resizeMode: 'contain',
    marginRight: width * 0.03,
  },
  grassSection: {
    marginTop: 56, // mt-14
  },
  grassTitle: {
    fontSize: 20, // text-xl
    fontWeight: '800', // font-extrabold
    color: '#52525B', // text-neutral-600
    fontFamily: 'NanumSquareNeo-Variable',
  },
  highlightText: {
    color: '#0D9488', // text-teal-600
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '800',
  },

  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: width * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: width * 0.01,
    width: width * 0.4,
    height: height * 0.25,
  },
  dateText: {
    fontSize: width * 0.03,
    textAlign: 'center',
    marginTop: height * 0.01,
    marginBottom: -height * 0.01,
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '700',
  },
  timeText: {
    fontSize: width * 0.03,
    textAlign: 'center',
    marginTop: height * 0.01,
    marginBottom: -height * 0.01,
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '700',
  },
  image: {
    width: width * 0.25,
    height: width * 0.25,
    resizeMode: 'contain',
  },

  footer: {
    marginTop: 24, // mt-6
    alignItems: 'center',
    width: width,
    marginBottom: 20,
  },
  footerButton: {
    flexDirection: 'row',
    width: width,
    alignItems: 'center',
    justifyContent: 'center', // Center content horizontally
    backgroundColor: '#FFFFFF', // bg-white
    paddingVertical: 12, // py-3
    paddingHorizontal: 24, // px-6
  },
  footerIcon: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
    marginRight: 10, // gap-2.5
  },
  footerButtonText: {
    fontSize: 14, // text-sm
    fontWeight: '800', // font-extrabold
    color: '#52525B', // text-neutral-600
    fontFamily: 'NanumSquareNeo-Variable',
  },
  footerDivider: {
    height: 1,
    backgroundColor: '#D1D5DB', // border-zinc-300
    width: '100%',
  },

  // 로그아웃 팝업창
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperView: {
    flexDirection: 'row',
    backgroundColor: '#009499',
    height: 30,
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  sleepyEmoji: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  modalView: {
    backgroundColor: '#009499',
    width: width * 0.8,
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  modalText: {
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  button: {
    backgroundColor: '#009499',
    borderRadius: 20,
    width: width * 0.25,
    padding: 10,
    marginBottom: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  centeredModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: width * 0.8,
  },
  lowerSection: {
    backgroundColor: '#FFFFFF',
    width: width * 0.8,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  modalDescription: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 15,
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '800',
  },
  buttonContainer: {
    flexDirection: 'row', // 버튼을 수평으로 정렬
    justifyContent: 'center', // 가로 방향으로 중앙 정렬
    width: '100%', // 부모 컨테이너의 전체 너비 사용
  },
});
