// src/components/StudyItem.tsx
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

interface StudyItemProps {
  name: string;
  totalStudyTime: number;
  memberCount: number;
  onPress?: () => void; // 터치 시 호출될 함수 (추후 네비게이션 연결 예정)
}

const StudyItem: React.FC<StudyItemProps> = ({
  name,
  totalStudyTime,
  memberCount,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
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
          <Text style={styles.studyTimeHighlight}>{totalStudyTime}시간</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default StudyItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 30,
    position: 'relative', // 절대 위치를 위한 설정
    paddingVertical: 10, // 모든 아이템의 위아래 패딩 동일
    backgroundColor: '#fff', // 배경색 설정 (필요시 변경)
  },
  studyTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  studyTimeText: {
    fontSize: 14, // text-xs
    color: '#4b5563', // text-stone-500
    letterSpacing: 1, // tracking-wide
    fontFamily: 'NanumSquareOTF_bRg',
    fontWeight: '700',
  },
  studyTimeHighlight: {
    color: '#14b8a6', // text-teal-600
  },
  studyTimeIcon: {
    width: 17,
    height: 10,
    marginTop: 8, // mt-8
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#d1d5db', // border-zinc-300
    marginTop: 8, // mt-2
  },
  studyInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 12, // mt-3
    width: '100%',
  },
  studyNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  studyNameText: {
    fontSize: 17, // text-sm
    color: '#1e293b', // text-zinc-700
    fontWeight: '700', // font-bold
    flexShrink: 1,
    fontFamily: 'NanumSquareOTF_eHv',
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10, // gap-1
  },
  memberIcon: {
    width: 18, // w-3
    height: 18, // aspect-[1.09] approximately
    marginRight: 4, // gap-1
    marginTop: 4,
  },
  memberCountText: {
    fontSize: 15, // text-xs
    color: '#14b8a6', // text-teal-600
    letterSpacing: 1, // tracking-wide
    fontFamily: 'NanumSquareOTF_eHv',
    fontWeight: '700',
  },
  studyInfoIcon: {
    width: 20,
    height: 20,
  },
  studyInfoIconAbsolute: {
    position: 'absolute',
    right: 20, // container의 padding과 일치
    top: 30, // 두 줄에 걸쳐 겹치도록 조정
    width: 20,
    height: 20,
  },
});
