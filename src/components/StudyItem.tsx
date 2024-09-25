import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';

interface StudyItemProps {
  name: string;
  totalStudyTime: number;
  memberCount: number;
  onPress?: () => void;
}

const {width} = Dimensions.get('window');

const StudyItem: React.FC<StudyItemProps> = ({
  name,
  totalStudyTime,
  memberCount,
}) => {
  const navigation = useNavigation();
  const onLeaveStudy = () => {
    // 스터디에서 나가기 로직을 여기에 추가 (추후 axios 연결 예정)
    console.log(`Leaving study: ${name}`);
  };

  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
  ) => {
    return (
      <TouchableOpacity style={styles.leftAction} onPress={onLeaveStudy}>
        <Image
          source={require('../../assets/images/icons/trash.png')}
          style={styles.actionIcon}
          resizeMode="contain"
        />
        <Text style={styles.actionText}>스터디에서 나가기</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      renderLeftActions={renderLeftActions}
      overshootLeft={false}
      friction={2}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('StudyDetail')}
          activeOpacity={0.7}>
          {/* 스터디 이름 및 멤버 수 */}
          <View style={styles.studyInfoContainer}>
            <View style={styles.studyNameContainer}>
              <Text style={styles.studyNameText}>{name}</Text>
              <View style={styles.memberContainer}>
                <Image
                  source={require('../../assets/images/icons/users.png')}
                  style={styles.memberIcon}
                  resizeMode="contain"
                />
                <Text style={styles.memberCountText}>{memberCount}</Text>
              </View>
            </View>
          </View>

          {/* 화살표 아이콘을 절대 위치로 추가 */}
          <Image
            source={require('../../assets/images/icons/right-arrow.png')}
            style={styles.studyInfoIconAbsolute}
            resizeMode="contain"
          />

          {/* 총 공부시간 및 아이콘 */}
          <View style={styles.studyTimeContainer}>
            <Text style={styles.studyTimeText}>
              총 공부시간:{' '}
              <Text style={styles.studyTimeHighlight}>
                {totalStudyTime}시간
              </Text>
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
};

export default StudyItem;

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#fff',
    paddingVertical: 20, // Increased padding to make the item taller
  },
  studyTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal: 30,
  },
  studyTimeText: {
    fontSize: 14,
    color: '#4b5563',
    letterSpacing: 1,
    fontFamily: 'NanumSquareOTF_bRg',
    fontWeight: '700',
  },
  studyTimeHighlight: {
    color: '#14b8a6',
  },
  studyInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 12,
    width: '100%',
    paddingHorizontal: 30,
  },
  studyNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  studyNameText: {
    fontSize: 17,
    color: '#1e293b',
    fontWeight: '700',
    flexShrink: 1,
    fontFamily: 'NanumSquareOTF_eHv',
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  memberIcon: {
    width: 18,
    height: 18,
    marginRight: 4,
    marginTop: 4,
  },
  memberCountText: {
    fontSize: 15,
    color: '#14b8a6',
    letterSpacing: 1,
    fontFamily: 'NanumSquareOTF_eHv',
    fontWeight: '700',
  },
  studyInfoIconAbsolute: {
    position: 'absolute',
    right: 50,
    top: 25,
    width: 20,
    height: 20,
  },
  leftAction: {
    width: 95,
    height: '100%',
    backgroundColor: '#FB5858',
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: -4, height: 0},
    shadowOpacity: 0.19,
    shadowRadius: 11.4,
    // Elevation for Android
    elevation: 5,
  },
  actionIcon: {
    width: 19,
    height: 24,
    marginBottom: 5,
  },
  actionText: {
    position: 'absolute',
    bottom: -15,
    width: 79,
    color: '#FFFFFF',
    fontFamily: 'NanumSquareNeo-cBd',
    fontSize: 9,
    lineHeight: 70,
    textAlign: 'center',
  },
});
