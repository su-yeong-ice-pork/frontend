import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const IMAGES = {
  backButton: require('../../assets/images/icons/backButton.png'),
  resetButton: require('../../assets/images/icons/resetButton.png'),
  iIcon: require('../../assets/images/icons/iIcon.png'),
};

const {width, height} = Dimensions.get('window');

const FindPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [askCode, setAskCode] = useState('코드 요청');
  const [timeLeft, setTimeLeft] = useState(300);
  const [isActive, setIsActive] = useState(false);

  // 기존 이름
  const [name, inputName] = useState('');

  // 이메일 인증 완료 확인 변수
  const [chkEmail, setChkEmail] = useState(false);

  // 비밀번호 재설정
  const [resetPassword, setResetPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 기존 이름 입력
  const handleNameChange = name => {
    inputName(name);
  };

  // 기본 이름 지우기
  const deleteName = () => {
    inputName('');
  };

  // 다시 잔디 심으러 가기 버튼 클릭
  const submitSignUp = () => {};

  // 이메일 인증 완료 -> 비밀번호 재설정
  const verifiedEmail = () => {
    setChkEmail(true);
  };

  // 비밀번호 재설정
  const handleResetPassword = password => {
    setResetPassword(password);
    validationPassword(password); // 비밀번호 재설정 조건 확인
  };
  // 비밀번호 지우기
  const deletePassword = () => {
    setResetPassword('');
  };
  // 비밀번호 조건 확인
  const validationPassword = password => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage('비밀번호를 다시 설정해주세요!');
    } else {
      setErrorMessage('');
    }
  };

  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000); // 1초마다 감소
    } else if (timeLeft === 0) {
      clearInterval(timer);
      setAskCode('코드 요청'); // 타이머 종료 시 버튼 텍스트 초기화
      setIsActive(false); // 타이머 비활성화
    }
    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [isActive, timeLeft]);

  // 초를 분:초 형식으로 변환하는 함수
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
      2,
      '0',
    )}`;
  };

  const handleRequire = () => {
    setAskCode('재요청');
    setIsActive(true); // 타이머 시작
    setTimeLeft(300); // 타이머 리셋
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.signUpHeader}>
        <TouchableOpacity
          style={styles.backButtonWrapper}
          onPress={() => navigation.goBack()}>
          <Image source={IMAGES.backButton} style={styles.setBackButton} />
        </TouchableOpacity>
        <Text style={styles.headerText}>비밀번호 찾기</Text>
      </View>

      {/* 입력 폼 */}
      <ScrollView
        contentContainerStyle={styles.formContainer}
        style={{backgroundColor: '#E1E6E8'}}>
        {/* 기존 이름 입력하기 */}
        <View style={styles.inputContainer2}>
          <Text style={styles.inputLabel}>
            기존 이름 입력 <Text style={styles.starmark}>*</Text>
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inputBox}
              placeholder="기존에 가입되어있던 이름을 입력해주세요."
              placeholderTextColor="#B9B9B9"
              value={inputName}
              onChangeText={handleNameChange}
            />
            <TouchableOpacity style={styles.resetButton} onPress={deleteName}>
              <Image source={IMAGES.resetButton} style={styles.clearIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 이메일 입력 */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            학교 이메일 인증 <Text style={styles.starmark}>*</Text>
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.inputBox]}
              placeholder="학교 이메일을 입력해주세요."
              placeholderTextColor="#B9B9B9"
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity style={styles.codeButton} onPress={handleRequire}>
              <Text style={styles.requestCodeButtonText}>{askCode}</Text>
            </TouchableOpacity>
          </View>
          {isActive && (
            <View style={styles.iconAndTextContainer}>
              <Image source={IMAGES.iIcon} style={styles.setiIcon} />
              <Text style={styles.activeText}>
                메일이 오지 않으셨나요? 재요청 버튼을 눌러보세요.
              </Text>
            </View>
          )}
        </View>

        {/* 인증 코드 입력 */}
        <View style={styles.inputContainer}>
          <View
            style={[
              styles.inputRow,
              {borderBottomWidth: 1.5, borderBottomColor: '#A9A9A9'},
            ]}>
            <TextInput
              style={{flex: 1}}
              placeholder="메일로 전송된 코드를 입력해주세요."
              placeholderTextColor="#B9B9B9"
            />
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            <TouchableOpacity style={styles.verifyButton}>
              <Text style={styles.verifyButtonText} onPress={verifiedEmail}>
                확인
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {askCode == '재요청' && chkEmail && (
          <View style={styles.inputContainer2}>
            <Text style={styles.inputLabel}>
              비밀번호 재설정 <Text style={styles.starmark}>*</Text>
            </Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputBox}
                placeholder="8~16자리 입력 / 영문 대 소문자, 숫자, 특수문자 조합"
                placeholderTextColor="#B9B9B9"
                secureTextEntry
                value={resetPassword}
                onChangeText={handleResetPassword}
              />
              <TouchableOpacity
                style={styles.resetButton}
                onPress={deletePassword}>
                <Image source={IMAGES.resetButton} style={styles.clearIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.iconAndTextContainer}>
              {errorMessage ? (
                <View style={styles.iconAndTextContainer}>
                  <Image source={IMAGES.iIcon} style={styles.setiIcon} />
                  <Text style={styles.activeText}>{errorMessage}</Text>
                </View>
              ) : null}
            </View>
          </View>
        )}
      </ScrollView>

      {/* 하단 버튼 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signUpButton} onPress={submitSignUp}>
          <LinearGradient
            colors={['rgba(31, 209, 245, 1)', 'rgba(0, 255, 150, 1)']}
            style={{
              flex: 1,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <Text style={styles.signUpButtonText}>다시 잔디 심으러 가기</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FindPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  backButtonWrapper: {
    position: 'absolute',
    top: height * 0.01, // 필요한 위치에 맞게 조정하세요.
    left: width * 0.03,
    zIndex: 1,
    padding: 10, // 터치 영역 확대
  },
  setBackButton: {
    resizeMode: 'contain',
    width: width * 0.05,
    height: width * 0.05,
  },
  signUpHeader: {
    justifyContent: 'center',
    marginTop: height * 0.005,
  },
  headerText: {
    fontFamily: 'NanumSquareNeo-cBd',
    fontSize: 17,
    color: '#454545',
    fontWeight: 'bold',
    textAlign: 'center', // 텍스트를 가운데 정렬
    marginVertical: height * 0.02,
  },

  // 기존 이름 입력
  clearIcon: {
    width: width * 0.04,
    height: height * 0.02,
    borderRadius: 10,
  },

  // 학교 이메일 인증
  formContainer: {
    paddingHorizontal: width * 0.05,
  },
  inputContainer: {
    marginTop: 0,
    marginBottom: height * 0.025,
  },
  inputContainer2: {
    marginTop: 0,
    paddingTop: height * 0.02,
    marginBottom: height * 0.025,
  },
  inputLabel: {
    fontFamily: 'NanumSquareNeo-cBd',
    fontSize: 14,
    color: '#454545',
    marginBottom: height * 0.005,
  },
  starmark: {
    color: '#FF7360',
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
    marginTop: 0,
  },
  requestCodeButton: {
    marginLeft: width * 0.02,
    backgroundColor: '#009499',
    borderRadius: 25,
    paddingHorizontal: width * 0.04,
    justifyContent: 'center',
    height: height * 0.05,
  },
  requestCodeButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    borderRadius: 20,
  },
  iconAndTextContainer: {
    flexDirection: 'row', // 가로로 정렬
    alignItems: 'center', // 이미지와 텍스트를 수직 중앙 정렬
    marginTop: height * 0.0005,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  codeButton: {
    position: 'absolute',
    right: 10,
    backgroundColor: '#009499',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  resetButton: {
    position: 'absolute',
    right: 5,
    paddingHorizontal: 15,
  },
  activeText: {
    fontFamily: 'NanumSquareNeo-aLt',
    color: '#009499',
    fontSize: 11,
  },
  setiIcon: {
    width: width * 0.03,
    height: height * 0.03,
    resizeMode: 'contain',
    marginRight: width * 0.02,
  },
  verifyButton: {
    marginLeft: width * 0.02,
    backgroundColor: '#009499',
    borderRadius: 20,
    paddingHorizontal: width * 0.04,
    justifyContent: 'center',
    height: height * 0.04,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  timerText: {
    marginLeft: 10,
    color: '#FF7777',
    fontSize: 12,
    textAlign: 'right',
  },

  // 다시 잔디 심으러 가기 버튼
  buttonContainer: {
    backgroundColor: '#E1E6E8', // 여백 부분에 색상 채움
    alignItems: 'center', // 버튼을 가운데 정렬
  },
  signUpButton: {
    height: height * 0.07,
    width: width * 0.5,
    marginBottom: height * 0.02,
    backgroundColor: '#E1E6E8',
  },
  signUpButtonText: {
    color: '#FFFFFF',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
