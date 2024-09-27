// CalendarScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import YearlyCalendar from './YearCalendar';
// Locale 설정
LocaleConfig.locales['kr'] = {
  monthNames: [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ],
  monthNamesShort: [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ],
  dayNames: [
    '일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'
  ],
  dayNamesShort: [
    '일', '월', '화', '수', '목', '금', '토'
  ],
  today: '오늘'
};


// 기본 로케일 설정
LocaleConfig.defaultLocale = 'kr';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [viewMode, setViewMode] = useState('yearly'); // 'monthly' 또는 'yearly'
  const [selectedYear, setSelectedYear] = useState('2024');

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      {/* 탭 전환 및 연도 선택 부분 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, viewMode === 'monthly' && styles.activeTab]}
          onPress={() => setViewMode('monthly')}
        >
          <Text style={viewMode === 'monthly' ? styles.activeTabText : styles.tabText}>월간 잔디밭</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, viewMode === 'yearly' && styles.activeTab]}
          onPress={() => setViewMode('yearly')}
        >
          <Text style={viewMode === 'yearly' ? styles.activeTabText : styles.tabText}>연간 잔디밭</Text>

        </TouchableOpacity>
        
        
      </View>


      {viewMode === 'monthly' ? (
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={onDayPress}
            markedDates={{
              [selectedDate]: { selected: true, marked: true, selectedColor: '#A8E6CF' },
            }}
            theme={{
              selectedDayBackgroundColor: '#A8E6CF',
              todayTextColor: '#00adf5',
              arrowColor: '#A8E6CF',
              dotColor: '#A8E6CF',
            }}
            firstDay={0} // 일요일을 주의 첫날로 설정
          />
        </View>
      ) : (
        <View style={styles.yearlyView}>
          {/* 연간 잔디밭 구현 */}
          <Text style={styles.yearlyTitle}>연간 ~잔디밭</Text>
         
        <YearlyCalendar/>


         
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>최장 <Text style={styles.highlight}>118</Text>일 유지</Text>
            <Text style={styles.statsText}>총 공부시간 <Text style={styles.highlight}>489</Text>시간</Text>
          </View>
        </View>
      
      )}
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
    alignItems: 'center',
    backgroundColor: '#4CB6A9',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  tabButton: {
    padding: 10,
    marginRight: 15,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#fff',
  },
  tabText: {
    fontSize: 16,
    color: '#B0D8D3',
  },
  activeTabText: {
    fontSize: 16,
    color: '#FFFFFF',
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
  monthContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#333',
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  statsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f4f7',
    borderRadius: 8,
    alignItems: 'center',
  },
  statsText: {
    fontSize: 14,
    color: '#333',
    marginVertical: 2,
  },
  highlight: {
    color: '#1AA5AA',
    fontWeight: 'bold',
  },
  yearPicker: {
    height: 40,
    width: 100,
    marginLeft: 'auto',
  },
});

export default CalendarScreen;
