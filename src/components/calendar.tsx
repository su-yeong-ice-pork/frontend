//components/calendar.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import YearlyCalendar from './YearCalendar';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

// Locale 설정
LocaleConfig.locales['kr'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};

// 기본 로케일 설정
LocaleConfig.defaultLocale = 'kr';

const IMAGES = {
  calendar: require('../../assets/images/icons/calendar.png'),
  studyTime: require('../../assets/images/icons/studyTime.png'),
};

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDateData, setSelectedDateData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewMode, setViewMode] = useState('yearly'); // 'monthly' 또는 'yearly'
  const [displayedDate, setDisplayedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );

  const activityData = {
    '2024-09-10': {studyTime: 2, grassScore: 5, color: '#B5DD89'},
    '2024-09-11': {studyTime: 4, grassScore: 10, color: '#A5DC1B'},
    '2024-09-12': {studyTime: 0, grassScore: 0},
  };

  const statData = [
    {
      day: '118',
      time: '789',
    },
  ];

  const onDayPress = day => {
    setSelectedDate(day.dateString);
    setSelectedDateData(activityData[day.dateString]);
    setModalVisible(true);
  };

  const getMarkedDates = () => {
    let markedDates = {};
    for (let date in activityData) {
      const activity = activityData[date];
      const color = getColorForActivity(activity.grassScore);
      markedDates[date] = {
        customStyles: {
          container: {
            backgroundColor: color,
            borderRadius: 15,
          },
          text: {
            color: 'white',
          },
        },
      };
    }
    return markedDates;
  };

  const getColorForActivity = grassScore => {
    // 잔디 점수에 따른 색상 설정
    if (grassScore === 0) return '#ebedf0'; // 연한 회색
    else if (grassScore <= 2) return '#c6e48b'; // 연한 초록
    else if (grassScore <= 4) return '#7bc96f';
    else if (grassScore <= 6) return '#239a3b';
    else return '#196127'; // 진한 초록
  };
  const handleTabPress = mode => {
    setViewMode(mode);
  };

  return (
    <View style={styles.container}>
      {/* 탭 전환 및 연도 선택 부분 */}
      <View style={styles.tabContainer}>
        {/* 월간 잔디밭 탭 */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress('monthly')}
          activeOpacity={0.7}>
          <View style={styles.tabContent}>
            {viewMode === 'monthly' && (
              <LinearGradient
                colors={['#0DD8EC', '#15EC89']}
                style={styles.activeIndicator}>
                <LinearGradient
                  colors={['#0DD8EC', '#15EC89']}
                  style={styles.dot}
                />
              </LinearGradient>
            )}
            <Text
              style={
                viewMode === 'monthly' ? styles.activeTabText : styles.tabText
              }>
              월간 잔디밭
            </Text>
          </View>
        </TouchableOpacity>

        {/* 연간 잔디밭 탭 */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress('yearly')}
          activeOpacity={0.7}>
          <View style={styles.tabContent}>
            {viewMode === 'yearly' && (
              <LinearGradient
                colors={['#0DD8EC', '#15EC89']}
                style={styles.activeIndicator}>
                <LinearGradient
                  colors={['#0DD8EC', '#15EC89']}
                  style={styles.dot}
                />
              </LinearGradient>
            )}
            <Text
              style={
                viewMode === 'yearly' ? styles.activeTabText : styles.tabText
              }>
              연간 잔디밭
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {viewMode === 'monthly' ? (
        <View style={styles.calendarContainer}>
          <Calendar
            current={displayedDate}
            onDayPress={onDayPress}
            markedDates={getMarkedDates()}
            markingType={'custom'}
            renderArrow={() => null} // 기본 화살표 숨기기
            onMonthChange={date => {
              setDisplayedDate(date.dateString);
            }}
            renderHeader={() => {
              return (
                <View style={styles.calendarHeader}>
                  <View style={styles.headerLeft}>
                    <Text style={styles.headerYearText}>
                      {moment(displayedDate).format('YYYY')}
                    </Text>
                    <Text style={styles.headerYearUnitText}>년</Text>
                    <Text style={styles.headerMonthText}>
                      {moment(displayedDate).format(' M')}
                    </Text>
                    <Text style={styles.headerMonthUnitText}>월</Text>
                  </View>
                  <View style={styles.headerArrows}>
                    <TouchableOpacity
                      onPress={() => {
                        const newDate = moment(displayedDate)
                          .subtract(1, 'months')
                          .format('YYYY-MM-DD');
                        setDisplayedDate(newDate);
                      }}>
                      <Text style={styles.arrowText}>{'<'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        const newDate = moment(displayedDate)
                          .add(1, 'months')
                          .format('YYYY-MM-DD');
                        setDisplayedDate(newDate);
                      }}>
                      <Text style={styles.arrowText}>{'>'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
            theme={{
              selectedDayBackgroundColor: '#A8E6CF',
              todayTextColor: '#00adf5',
              dotColor: '#A8E6CF',
            }}
            firstDay={0}
          />
          <View style={styles.statsContainer}>
            {statData.map((id, index) => (
              <View key={index}>
                <Text style={styles.statsText}>
                  <Image source={IMAGES.calendar} />
                  최장 <Text style={styles.highlight}>{id.day}</Text>일 유지
                </Text>
                <Text style={styles.statsText}>
                  <Image source={IMAGES.studyTime} style={styles.statsTime} />총
                  공부시간 <Text style={styles.highlight}>{id.time}</Text>시간
                </Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.yearlyView}>
          {/* 연간 잔디밭 구현 */}
          <YearlyCalendar />
          <View style={styles.statsContainer}>
            {statData.map((id, index) => (
              <View key={index}>
                <Text style={styles.statsText}>
                  <Image source={IMAGES.calendar} />
                  최장 <Text style={styles.highlight}>{id.day}</Text>일 유지
                </Text>
                <Text style={styles.statsText}>
                  <Image source={IMAGES.studyTime} style={styles.statsTime} />총
                  공부시간 <Text style={styles.highlight}>{id.time}</Text>시간
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* 날짜 클릭 시 모달 */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedDate}</Text>
            {selectedDateData ? (
              <>
                <Text>공부 시간: {selectedDateData.studyTime} 시간</Text>
                <Text>잔디 점수: {selectedDateData.grassScore}</Text>
              </>
            ) : (
              <Text>데이터가 없습니다.</Text>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CB6A9',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 10,
  },
  tabContent: {
    alignItems: 'center',
  },
  activeIndicator: {
    width: 80,
    height: 3,
    borderRadius: 40,
    alignItems: 'flex-end',
  },
  borderLine: {
    width: '100%',
    height: 4,
    borderRadius: 2,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5, // Half of width and height for a perfect circle
    marginTop: 7,
  },
  tabText: {
    fontSize: 15,
    marginTop: 15,
    color: '#B0D8D3',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  activeTabText: {
    fontSize: 15,
    marginTop: 10,
    color: '#FFFFFF',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  calendarContainer: {
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  yearlyView: {
    padding: 20,
    color: '#333',
  },
  statsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f4f7',
    borderRadius: 8,
    alignItems: 'flex-start',
    width: 180,
  },
  statsText: {
    fontSize: 14,
    color: '#333',
    marginVertical: 2,
    fontFamily: 'NanumSquareNeo-Variable',
  },
  highlight: {
    color: '#1AA5AA',
    fontWeight: 'bold',
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerYearText: {
    color: '#009499',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerYearUnitText: {
    color: 'gray',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerMonthText: {
    color: '#009499',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  headerMonthUnitText: {
    color: 'gray',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerArrows: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowText: {
    color: '#009499',
    fontSize: 14,
    marginHorizontal: 5,
    fontFamily: 'NanumSquareNeo-Variable',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'NanumSquareNeo-Variable',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1AA5AA',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'NanumSquareNeo-Variable',
  },
});

export default CalendarScreen;
