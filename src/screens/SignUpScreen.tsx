import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      {/* 상단 상태바 */}
      <View style={styles.statusBar}>
        <Text style={styles.timeText}>19:02</Text>
        {/* 아이콘들은 생략하거나 필요한 경우 추가 */}
      </View>

      {/* 헤더 */}
      <Text style={styles.headerText}>회원가입</Text>

      {/* 입력 폼 */}
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.titleText}>당신의 잔디</Text>
        <Text style={styles.welcomeText}>
          환영합니다! 잔디를 함께 심어보아요!
        </Text>

        {/* 이름 입력 */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>이름 입력 *</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="이름을 입력해주세요."
          />
        </View>

        {/* 아이디 입력 */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>아이디 *</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="4~10자리 / 영문, 숫자, 기호 사용가능"
          />
        </View>

        {/* 비밀번호 입력 */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>비밀번호 입력 *</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="8~16자리 입력 / 영문 대 소문자, 숫자, 특수문자 조합"
            secureTextEntry
          />
        </View>

        {/* 이메일 입력 */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>학교 이메일 인증 *</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.inputBox, {flex: 1}]}
              placeholder="학교 이메일을 입력해주세요."
            />
            <TouchableOpacity style={styles.requestCodeButton}>
              <Text style={styles.requestCodeButtonText}>코드 요청</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 인증 코드 입력 */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>인증 코드 입력 *</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.inputBox, {flex: 1}]}
              placeholder="메일로 전송된 코드를 입력해주세요."
            />
            <TouchableOpacity style={styles.verifyButton}>
              <Text style={styles.verifyButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.timerText}>05:00</Text>
        </View>
      </ScrollView>

      {/* 하단 버튼 */}
      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>잔디 심으러 가기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  statusBar: {
    height: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  timeText: {
    fontSize: 14,
    color: '#000',
  },
  headerText: {
    fontSize: 18,
    color: '#454545',
    textAlign: 'center',
    marginVertical: height * 0.02,
  },
  formContainer: {
    paddingHorizontal: width * 0.05,
  },
  titleText: {
    fontSize: 24,
    color: '#3E3E3E',
    fontWeight: 'bold',
    marginBottom: height * 0.01,
  },
  welcomeText: {
    fontSize: 16,
    color: '#3E3E3E',
    marginBottom: height * 0.02,
  },
  inputContainer: {
    marginBottom: height * 0.03,
  },
  inputLabel: {
    fontSize: 14,
    color: '#454545',
    marginBottom: height * 0.005,
  },
  inputBox: {
    height: height * 0.06,
    backgroundColor: '#F4F4F4',
    borderRadius: 6,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requestCodeButton: {
    marginLeft: width * 0.02,
    backgroundColor: '#009499',
    borderRadius: 6,
    paddingHorizontal: width * 0.04,
    justifyContent: 'center',
    height: height * 0.06,
  },
  requestCodeButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  verifyButton: {
    marginLeft: width * 0.02,
    backgroundColor: '#009499',
    borderRadius: 6,
    paddingHorizontal: width * 0.04,
    justifyContent: 'center',
    height: height * 0.06,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  timerText: {
    marginTop: height * 0.005,
    color: '#FF7777',
    fontSize: 12,
    textAlign: 'right',
  },
  signUpButton: {
    backgroundColor: '#009499',
    borderRadius: 27.5,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.07,
    marginHorizontal: width * 0.2,
    marginBottom: height * 0.02,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
