import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import StudyItem from './StudyItem';

const studyData = [
  {name: '부산대 공부 마스터 모임', totalStudyTime: 72, memberCount: 14},
  {name: '멋쟁이 사자처럼 대학 스터디', totalStudyTime: 35, memberCount: 32},
  {name: '디자인 동아리', totalStudyTime: 35, memberCount: 4},
  {name: 'CPA 메이트', totalStudyTime: 64, memberCount: 12},
];

const {width} = Dimensions.get('window');

const StudyList = () => {
  return (
    <View style={styles.container}>
      {studyData.map((study, index) => (
        <React.Fragment key={index}>
          <StudyItem {...study} />
          {index < studyData.length - 1 && <View style={styles.separator} />}
        </React.Fragment>
      ))}
    </View>
  );
};

export default StudyList;

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#ffff',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#d1d5db',
  },
});
