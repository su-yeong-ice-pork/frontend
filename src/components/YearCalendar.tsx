import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';

// 컨트리뷰션 데이터
const contributions = [
  {
    date: '2023-10-01',
    count: 5,
  },
  {
    date: '2023-10-02',
    count: 3,
  },
];

const YearlyCalendar = () => {
  const [weeks, setWeeks] = useState([]);
  const [monthLabels, setMonthLabels] = useState([]);
  const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];

  // 시작 날짜 설정 (예: 저번 주 금요일)
  const START_DATE = new Date();
  START_DATE.setDate(
    START_DATE.getDate() - (((START_DATE.getDay() + 2) % 7) + 1),
  ); // 저번 주 금요일
  START_DATE.setHours(0, 0, 0, 0); // 시간 초기화

  useEffect(() => {
    const generateDates = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 시간 초기화
      const endDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 52 * 7); // 52주 전으로 이동

      // 시작 날짜를 가장 가까운 일요일로 조정
      startDate.setDate(startDate.getDate() - startDate.getDay());

      const weeksArray = [];
      let currentDate = new Date(startDate);

      const monthsMap = [];

      while (currentDate <= endDate) {
        const week = [];

        for (let i = 0; i < 7; i++) {
          if (currentDate > endDate) {
            break; // 현재 날짜가 종료 날짜를 넘으면 루프 탈출
          }

          const dateCopy = new Date(currentDate);
          week.push(dateCopy);

          // 매월 첫째 날에 월 레이블 추가
          if (
            dateCopy.getDate() === 1 &&
            monthsMap.every(m => m.month !== dateCopy.getMonth())
          ) {
            monthsMap.push({
              index: weeksArray.length,
              month: dateCopy.toLocaleString('ko-KR', {month: 'short'}),
            });
          }

          currentDate.setDate(currentDate.getDate() + 1);
        }

        if (week.length > 0) {
          weeksArray.push(week);
        }
      }

      setWeeks(weeksArray);
      setMonthLabels(monthsMap);
    };

    generateDates();
  }, []);

  const isDateAfterStartDate = date => {
    return date >= START_DATE;
  };

  const getColorForDate = date => {
    if (!isDateAfterStartDate(date)) {
      return '#ebedf0'; // 시작 날짜 이전은 기본 색상
    }

    const dateString = date.toISOString().split('T')[0];
    const contribution = contributions.find(c => c.date === dateString);

    const count = contribution ? contribution.count : 0;

    // 활동량에 따라 색상 결정
    if (count > 8) return '#196127';
    if (count > 6) return '#239a3b';
    if (count > 4) return '#7bc96f';
    if (count > 2) return '#c6e48b';
    return '#c6e48b';
  };

  const renderDayLabels = () => (
    <View style={styles.dayLabelsContainer}>
      {dayLabels.map((day, index) => (
        <Text
          key={index}
          style={[styles.dayLabelText, {marginTop: index === 0 ? 15 : 0}]}>
          {day}
        </Text>
      ))}
    </View>
  );

  const renderMonthLabels = () => (
    <View style={styles.monthLabelsContainer}>
      {monthLabels.map((month, index) => (
        <Text
          key={index}
          style={[
            styles.monthLabelText,
            {
              left:
                month.index * (styles.dayBox.width + styles.dayBox.margin * 2) +
                30,
            },
          ]}>
          {month.month}
        </Text>
      ))}
    </View>
  );

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        {renderMonthLabels()}
        <View style={{flexDirection: 'row'}}>
          {renderDayLabels()}
          <View style={styles.calendarContainer}>
            {weeks.map((week, weekIndex) => (
              <View key={weekIndex} style={styles.weekColumn}>
                {week.map((date, dayIndex) => (
                  <View
                    key={dayIndex}
                    style={[
                      styles.dayBox,
                      {
                        backgroundColor: getColorForDate(date),
                      },
                    ]}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 30,
  },
  calendarContainer: {
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
  },
  weekColumn: {
    flexDirection: 'column',
  },
  dayBox: {
    width: 12,
    height: 12,
    margin: 2,
    backgroundColor: '#ebedf0', // 기본 색상
  },
  dayLabelsContainer: {
    marginRight: 5,
    marginTop: -15,
  },
  dayLabelText: {
    fontSize: 10,
    color: '#586069',
    marginBottom: 2,
  },
  monthLabelsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    left: 30,
    top: 0,
  },
  monthLabelText: {
    position: 'absolute',
    fontSize: 10,
    color: '#586069',
  },
});

export default YearlyCalendar;
