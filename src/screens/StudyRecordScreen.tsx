// src/screens/StudyRecordScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Header from '../components/Header';
import BottomBar from '../components/BottomBar';
import ProfileCard from '../components/ProfileCard';

const {width} = Dimensions.get('window');

// 더미 데이터
const friends = [
  {
    id: 1,
    name: '고민석',
    todayStudyTime: '02시간 45분',
    message: '열심히 공부합시다!',
    image: null,
    isOnline: true,
  },
  {
    id: 2,
    name: '김진우',
    todayStudyTime: '24시간 00분',
    message: '24시간이 모자라',
    image: null,
    isOnline: false,
  },
  {
    id: 3,
    name: '김태영',
    todayStudyTime: '01시간 50분',
    message: '커피 한 잔 하면서 쉬는 중~',
    image: null,
    isOnline: true,
  },
  {
    id: 4,
    name: '유경미',
    todayStudyTime: '03시간 10분',
    message: '프로젝트 마무리!',
    image: null,
    isOnline: false,
  },
  {
    id: 5,
    name: '이서현',
    todayStudyTime: '02시간 30분',
    message: '오늘도 파이팅!',
    image: null,
    isOnline: true,
  },
];

const StudyRecordScreen = () => {
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#F5F5F5'}}>
        <View style={styles.container}>
          <Header Title={'기록장 / 랭킹'} />
          <ScrollView
            style={styles.main}
            contentContainerStyle={{paddingBottom: 80}}>
            {/* 기록장과 기록 랭킹 탭 */}
            <View style={styles.tabsContainer}>
              <TouchableOpacity style={styles.activeTab}>
                <Text style={styles.activeTabText}>기록장</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inactiveTab}>
                <Text style={styles.inactiveTabText}>기록 랭킹</Text>
              </TouchableOpacity>
            </View>

            {/* 프로필 카드 */}
            <View style={styles.profileCardContainer}>
              <Text style={styles.profileCardTitle}>
                라이벌의 <Text style={styles.highlightText}>잔디</Text>가{'\n'}
                무럭무럭 자라고 있어요!
              </Text>
              <ProfileCard
                title="새도의 신"
                name="이은솔"
                studyMessage="기말고사 화이팅..."
                timerValue="12:36:18"
                totalTimeValue="80:30:34"
              />
            </View>

            {/* 점선 */}
            <View style={styles.dashedLine} />

            {/* 친구 목록 헤더 */}
            <View style={styles.membersHeader}>
              <Text style={styles.membersTitle}>친구 목록</Text>
              <TouchableOpacity
                style={styles.addMemberButton}
                onPress={() => {
                  /* 친구 추가 기능 */
                }}>
                <Image
                  source={require('../../assets/images/icons/whiteUsers.png')}
                  style={styles.redStar}
                  resizeMode="contain"
                />
                <Text style={styles.addMemberButtonText}>친구 추가</Text>
              </TouchableOpacity>
            </View>

            {/* 친구 리스트 */}
            <View style={styles.membersList}>
              {friends.map((friend, index) => (
                <View key={friend.id}>
                  <TouchableOpacity
                    style={styles.memberItem}
                    onPress={() => {
                      /* 친구 프로필 보기 */
                    }}>
                    <Image
                      source={
                        friend.image
                          ? {uri: friend.image}
                          : require('../../assets/images/icons/baseIcon.png')
                      }
                      style={styles.memberImage}
                      resizeMode="cover"
                    />
                    <View style={styles.memberInfo}>
                      <View style={styles.nameRow}>
                        <Text style={styles.memberName}>{friend.name}</Text>
                        {friend.isOnline && (
                          <View style={styles.onlineStatus}>
                            <View style={styles.onlineDot} />
                            <Text style={styles.onlineText}>공부 중</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.memberStudyTime}>
                        오늘 공부 시간:{' '}
                        <Text style={styles.totalStudyTimeValue}>
                          {friend.todayStudyTime}
                        </Text>
                      </Text>
                      {/* 친구의 한마디 */}
                      <View style={styles.messageBubble}>
                        <Text style={styles.messageText}>{friend.message}</Text>
                      </View>
                      <Image
                        source={require('../../assets/images/icons/right-arrow-gray.png')}
                        style={styles.friendInfoIconAbsolute}
                        resizeMode="contain"
                      />
                    </View>
                  </TouchableOpacity>
                  {index !== friends.length - 1 && (
                    <View style={styles.separator} />
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      <BottomBar />
    </>
  );
};

export default StudyRecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    width: width,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#1AA5AA',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginTop: 20,
    width: width - 40,
    alignSelf: 'center',
  },
  friendInfoIconAbsolute: {
    position: 'absolute',
    right: 5,
    top: 25,
    width: 30,
    height: 30,
  },
  activeTab: {
    paddingBottom: 5,
    marginHorizontal: 20,
  },
  inactiveTab: {
    opacity: 0.6,
    marginHorizontal: 20,
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inactiveTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  profileCardContainer: {
    width: width - 40,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    alignSelf: 'center',
  },
  profileCardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4b5563',
    marginBottom: 20,
    lineHeight: 30,
  },
  highlightText: {
    color: '#15D58A',
  },
  // 점선
  dashedLine: {
    width: '90%',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#DBDBDB',
    marginVertical: 20,
    alignSelf: 'center',
  },
  // 친구 목록 헤더
  membersHeader: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 10,
    alignSelf: 'center',
  },
  membersTitle: {
    fontSize: 16,
    color: '#454545',
    fontFamily: 'NanumSquareNeo-eHv',
  },
  addMemberButton: {
    backgroundColor: '#1AA5AA',
    width: 100,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addMemberButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    letterSpacing: 1,
    fontFamily: 'NanumSquareNeo-eHv',
  },
  redStar: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  // 친구 리스트
  membersList: {
    width: width,
    backgroundColor: '#FFFFFF',
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  memberImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E1E6E8',
    marginRight: 20,
  },
  memberInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberName: {
    fontSize: 18,
    color: '#454545',
    fontFamily: 'NanumSquareNeo-eHv',
    marginRight: 10,
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1AA5AA',
    marginRight: 5,
  },
  onlineText: {
    fontSize: 14,
    color: '#1AA5AA',
    fontFamily: 'NanumSquareNeo-eHv',
  },
  memberStudyTime: {
    fontSize: 14,
    color: '#646464',
    fontFamily: 'NanumSquareNeo-eHv',
    marginTop: 5,
  },
  totalStudyTimeValue: {
    color: '#009499',
  },
  messageBubble: {
    backgroundColor: '#DEEFEA',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 14,
    color: '#454545',
    fontFamily: 'NanumSquareNeo-eHv',
  },
  separator: {
    height: 1,
    backgroundColor: '#DBDBDB',
    width: '100%',
  },
});
