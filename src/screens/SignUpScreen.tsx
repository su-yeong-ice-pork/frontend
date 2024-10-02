import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {
  Defs,
  LinearGradient as SVGLinearGradient,
  Stop,
  Text as SvgText,
} from 'react-native-svg';
import Header from '../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';

import {collegeData} from '../constants/departData.js';

const IMAGES = {
  backButton: require('../../assets/images/icons/backButton.png'),
  resetButton: require('../../assets/images/icons/resetButton.png'),
  iIcon: require('../../assets/images/icons/iIcon.png'),
};

const {width, height} = Dimensions.get('window');

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [askCode, setAskCode] = useState('코드 요청');
  const [timeLeft, setTimeLeft] = useState(300);
  const [isActive, setIsActive] = useState(false);

  // 비밀번호
  const [inputPassword, setInputPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 이름 입력
  const [name, inputName] = useState('');
  const [nameDuplicate, setNameDuplicate] = useState(false);

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

  // 비밀번호 입력
  const handlePasswordChange = password => {
    setInputPassword(password);
    validationPassword(password); // 조건 확인
  };

  // 비밀번호 지우기
  const deletePassword = () => {
    setInputPassword('');
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

  // 이름 중복 확인
  const chkDuplicate = () => {
    setNameDuplicate(true);
  };

  // 잔디 심으러 가기 버튼 클릭
  const submitSignUp = () => {};

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          {/* 헤더 */}
          <Header Title={'회원가입'} />

          {/* 입력 폼 */}
          <ScrollView
            contentContainerStyle={styles.formContainer}
            style={{backgroundColor: '#E1E6E8'}}>
            <View style={styles.container}>
              <Text style={styles.welcomeText}>환영합니다!</Text>
              <View style={styles.inlineText}>
                <Svg height={height * 0.05} width={width * 0.3}>
                  <Defs>
                    <SVGLinearGradient id="grad1">
                      <Stop offset="0%" stopColor="#2CCDE4" stopOpacity="1" />
                      <Stop offset="100%" stopColor="#25E798" stopOpacity="1" />
                    </SVGLinearGradient>
                  </Defs>
                  <SvgText
                    fill="url(#grad1)"
                    fontSize="25"
                    fontWeight="bold"
                    x="0"
                    y="10%"
                    textAnchor="start"
                    alignmentBaseline="hanging">
                    당신의 잔디
                  </SvgText>
                </Svg>
                <Text style={styles.welcomeText2}>를 함께 심어보아요!</Text>
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
                <TouchableOpacity
                  style={styles.codeButton}
                  onPress={handleRequire}>
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
                  <Text style={styles.verifyButtonText}>확인</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 학과 등록 */}
            <RegisterDepart />

            {/* 비밀번호 입력 */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                비밀번호 입력 <Text style={styles.starmark}>*</Text>
              </Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.inputBox}
                  placeholder="8~16자리 입력 / 영어, 숫자, 특수문자 조합"
                  placeholderTextColor="#B9B9B9"
                  secureTextEntry
                  value={inputPassword} // 상태를 연결해주어야 합니다.
                  onChangeText={handlePasswordChange}
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

            {/* 이름 입력 */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                이름 입력 <Text style={styles.starmark}>*</Text>
              </Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.inputBox}
                  placeholder="1~8자리 입력 / 한글, 영어, 숫자 조합"
                  placeholderTextColor="#B9B9B9"
                />
                <TouchableOpacity
                  style={styles.codeButton}
                  onPress={chkDuplicate}>
                  <Text style={styles.requestCodeButtonText}>중복 확인</Text>
                </TouchableOpacity>
              </View>
              {nameDuplicate && (
                <View style={styles.iconAndTextContainer}>
                  <Image source={IMAGES.iIcon} style={styles.setiIcon} />
                  <Text style={styles.activeText}>
                    이미 존재하는 이름입니다!
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>

          {/* 하단 버튼 */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={submitSignUp}>
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
                <Text style={styles.signUpButtonText}>잔디 심으러 가기</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SignUpScreen;

// 학과 등록하기 컴포넌트
const RegisterDepart = () => {
  const [openCollege, setOpenCollege] = useState(false);
  const [openDepartment, setOpenDepartment] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentList, setCurrentList] = useState([]);
  const [listType, setListType] = useState('');
  const [colleges, setColleges] = useState(
    collegeData.map(item => ({label: item.college, value: item.college})),
  );
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const selected = collegeData.find(c => c.college === selectedCollege);
    if (selected) {
      setDepartments(selected.departments.map(d => ({label: d, value: d})));
    } else {
      setDepartments([]);
    }
  }, [selectedCollege]);

  const confirmSelection = () => {
    if (selectedCollege && selectedDepartment) {
      setModalVisible(false);
    } else {
      alert('단과대학과 학과를 모두 선택해주세요.');
    }
  };

  useEffect(() => {
    const selected = collegeData.find(c => c.college === selectedCollege);
    if (selected) {
      setDepartments(selected.departments.map(d => ({label: d, value: d})));
    } else {
      setDepartments([]);
    }
  }, [selectedCollege]);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>
        학과 등록 <Text style={styles.starmark}>*</Text>
      </Text>

      <TouchableOpacity
        style={styles.inputBox}
        onPress={() => setModalVisible(true)}>
        <Text
          style={
            selectedDepartment ? styles.selectedText : styles.placeholderText
          }>
          {selectedCollege && selectedDepartment
            ? selectedCollege + ' ' + selectedDepartment
            : '대학 소속학과를 등록해주세요'}
        </Text>
      </TouchableOpacity>

      {/* 드롭다운 모달 */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            {/* College Selection */}
            <View style={styles.inputWrapper}>
              <Text style={styles.modalTitle}>학과 등록</Text>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => setModalVisible(false)}>
                <Image source={IMAGES.resetButton} style={styles.clearIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalContainer2}>
              <DropDownPicker
                open={openCollege}
                value={selectedCollege}
                items={colleges}
                setOpen={setOpenCollege}
                setValue={setSelectedCollege}
                setItems={setColleges}
                listMode="SCROLLVIEW"
                placeholder="단과대학"
                zIndex={3000}
                zIndexInverse={1000}
                onOpen={() => setOpenDepartment(false)}
                scrollViewProps={{
                  nestedScrollEnabled: true,
                }}
                containerStyle={{
                  height: 40,
                  width: width * 0.35, // 원하는 너비로 조절
                  marginBottom: 10, // 필요에 따라 조절
                }}
                style={{
                  backgroundColor: '#fafafa',
                  // borderColor: '#ccc',
                  borderWidth: 0,
                }}
                dropDownContainerStyle={{
                  backgroundColor: '#fafafa',
                  borderColor: '#ddd',
                }}
                tickIconStyle={{
                  width: 20,
                  height: 20,
                  tintColor: '#009499', // 체크 마크 색상
                }}
                labelStyle={{
                  fontSize: 13,
                  textAlign: 'left',
                }}
                arrowStyle={{
                  tintColor: '#009499', // 화살표 아이콘 색상
                }}
              />

              <DropDownPicker
                open={openDepartment}
                value={selectedDepartment}
                items={departments}
                setOpen={setOpenDepartment}
                setValue={setSelectedDepartment}
                setItems={setDepartments}
                listMode="SCROLLVIEW"
                placeholder="학과"
                zIndex={2000} // Ensure the dropdown is above other content
                zIndexInverse={1000}
                disabled={!selectedCollege} // Disable until a college is selected
                onOpen={() => setOpenCollege(false)}
                scrollViewProps={{
                  nestedScrollEnabled: true,
                }}
                containerStyle={{
                  height: 40,
                  width: width * 0.35, // 원하는 너비로 조절
                  marginBottom: 10, // 필요에 따라 조절
                }}
                style={{
                  backgroundColor: '#fafafa',
                  // borderColor: '#ccc',
                  borderWidth: 0,
                }}
                dropDownContainerStyle={{
                  backgroundColor: '#fafafa',
                  borderColor: '#ddd',
                }}
                tickIconStyle={{
                  width: 20,
                  height: 20,
                  tintColor: '#009499', // 체크 마크 색상
                }}
                labelStyle={{
                  fontSize: 12,
                  textAlign: 'left',
                }}
                arrowStyle={{
                  tintColor: '#009499', // 화살표 아이콘 색상
                }}
              />
            </View>

            {/* Confirm Button */}
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={confirmSelection}>
              <Text style={styles.confirmButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButtonWrapper: {
    position: 'absolute',
    top: height * 0.01,
    left: width * 0.03,
    zIndex: 1,
    padding: 10,
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
  formContainer: {
    paddingHorizontal: width * 0.05,
  },
  inlineText: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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
  clearIcon: {
    width: width * 0.04,
    height: height * 0.02,
    borderRadius: 10,
  },
  titleText: {
    fontSize: 24,
    color: '#3E3E3E',
    fontWeight: 'bold',
    marginBottom: height * 0.01,
  },
  welcomeText: {
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '800',
    fontSize: 24,
    color: '#3E3E3E',
    paddingTop: height * 0.02,
  },
  welcomeText2: {
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '800',
    fontSize: 24,
    color: '#3E3E3E',
    marginBottom: height * 0.035,
  },
  inputContainer: {
    marginTop: 0,
    marginBottom: height * 0.025,
  },
  inputLabel: {
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '600',
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
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '600',
    fontSize: 12,
  },
  placeholderText: {
    color: '#B9B9B9',
  },
  selectedText: {
    color: '#000000',
  },
  modalTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  selectionContainer: {
    flexDirection: 'row', // 단과대학과 학과 리스트를 좌우로 배치
    justifyContent: 'space-between',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    maxHeight: 300,
  },
  modalContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between', // 두 드롭다운 사이의 간격 조절
    alignItems: 'center', // 세로축 가운데 정렬
    paddingHorizontal: 20, // 좌우 패딩으로 모달의 가운데 위치 조정
    width: '100%',
  },
  dropdownStyle: {
    fontSize: 5,
    width: width * 0.35,
    alignSelf: 'center',
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
  },
  selectedItem: {
    backgroundColor: '#E6F7FF',
  },
  confirmButton: {
    backgroundColor: '#009499',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 15,
    width: width * 0.2,
    alignSelf: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
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
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '600',
  },
  iconAndTextContainer: {
    flexDirection: 'row', // 가로로 정렬
    alignItems: 'center', // 이미지와 텍스트를 수직 중앙 정렬
    marginTop: height * 0.0005,
  },
  setiIcon: {
    width: width * 0.03,
    height: height * 0.03,
    resizeMode: 'contain',
    marginRight: width * 0.02,
  },
  activeText: {
    color: '#009499',
    fontSize: 11,
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '600',
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
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '600',
  },
  timerText: {
    marginLeft: 10,
    color: '#FF7777',
    fontSize: 12,
    textAlign: 'right',
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '700',
  },
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
    textAlign: 'center',
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '800',
  },
  gradientText: {
    padding: 0,
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '800',
  },
});
