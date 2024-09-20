// App.js
import React, {useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const IMAGES = {
  blueGrass:
    'https://image-resource.creatie.ai/137927998611751/137927998611753/35fcb8e3152553006e3d0339a4456494.png',
  rectangle53x2:
    'https://image-resource.creatie.ai/137927998611751/137927998611753/83afe5c866cf076cd9da1039e135c06b.png',
  rectangle53x1:
    'https://image-resource.creatie.ai/137927998611751/137927998611753/b81f376c20ff49c357f4b45953dfdd74.png',
  rectangle103x1:
    'https://image-resource.creatie.ai/137927998611751/137927998611753/6790a742036cc2ef057b6679c44f9eef.png',
  rectangle63x1:
    'https://image-resource.creatie.ai/137927998611751/137927998611753/a8f0e1025308ecab34789ac809ac18b1.png',
  rectangle83x1:
    'https://image-resource.creatie.ai/137927998611751/137927998611753/09caefc30e12368050d9cbe39a5e5986.png',
  rectangle73x1:
    'https://image-resource.creatie.ai/137927998611751/137927998611753/1bcbb9376e44033d25d027cb0985f209.png',
  slide3Image:
    'https://image-resource.creatie.ai/137927998611751/137927998611753/8729acef36cb870d4634d43f17298b79.png',
  slide4Image:
    'https://image-resource.creatie.ai/137927998611751/137927998611753/c98cdd7a05b05c1919e4aa05e953363c.png',
};

const {width, height} = Dimensions.get('window');

const App = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  // 슬라이드 데이터 배열
  const slides = [
    {
      key: 'slide1',
      mainText: (
        <>
          도서관 출석,{'\n'}
          <Text style={styles.highlight}>잔디</Text>처럼 쌓이는 성취감!
        </>
      ),
      subText:
        '매일 도서관에 출석할 때마다\n성장하는 나만의 잔디밭을 완성해 보세요!',
      additionalElements: (
        <>
          {/* 슬라이드 1 이미지 */}
          <Image
            source={{uri: IMAGES.rectangle53x2}}
            style={styles.slide1Image}
          />
        </>
      ),
    },
    {
      key: 'slide2',
      mainText: (
        <>
          함께 인증하고, {'\n'}함께 성장하는 {'\n'}
          <Text style={styles.highlight}>도서관 출석 스터디</Text>
        </>
      ),
      subText:
        '위치 인증과 스터디원들의 상호 인증으로,\n재미있고 꾸준한 도서관 생활을 만들어가요!',
      additionalElements: (
        <>
          {/* 슬라이드 2 이미지들 */}
          <View style={styles.slide2ImageContainer}>
            <Image
              source={{uri: IMAGES.rectangle63x1}}
              style={styles.rectangle63x1}
            />
            <Image
              source={{uri: IMAGES.rectangle103x1}}
              style={styles.rectangle103x1}
            />
            <Image
              source={{uri: IMAGES.rectangle83x1}}
              style={styles.rectangle83x1}
            />
            <Image
              source={{uri: IMAGES.rectangle73x1}}
              style={styles.rectangle73x1}
            />
            <Image
              source={{uri: IMAGES.rectangle53x1}}
              style={styles.rectangle53x1}
            />
          </View>
        </>
      ),
    },
    {
      key: 'slide3',
      mainText: (
        <>
          출석도 게임처럼! {'\n'}
          <Text style={styles.highlight}>티어</Text>와{' '}
          <Text style={styles.highlight}>레이팅</Text>으로 {'\n'}즐겁게
          도전하세요!
        </>
      ),
      subText:
        '도서관 출석으로 나만의 티어를 쌓고,\n목표를 향한 여정을 재미있게 꾸며보세요!',
      additionalElements: (
        <>
          {/* 슬라이드 3 이미지 */}
          <Image
            source={{uri: IMAGES.slide3Image}}
            style={styles.slide3Image}
          />
        </>
      ),
    },
    {
      key: 'slide4',
      mainText: (
        <>
          매일 <Text style={styles.highlight}>잔디</Text>를 심으며, {'\n'}함께
          목표를 {'\n'}이루는 스터디!
        </>
      ),
      subText:
        '하루하루 쌓이는 잔디와 함께 도서관에서\n목표를 이루는 나를 만나세요!',
      additionalElements: (
        <>
          {/* 슬라이드 4 이미지 */}
          <Image
            source={{uri: IMAGES.slide4Image}}
            style={styles.slide4Image}
          />
        </>
      ),
    },
  ];

  // 슬라이드 렌더링 함수
  const renderSlide = ({item, index}) => (
    <View style={styles.slide} key={index}>
      {/* 메인 텍스트 */}
      <Text style={styles.mainText}>{item.mainText}</Text>
      {/* 서브 텍스트 */}
      <Text style={styles.subText}>{item.subText}</Text>
      {/* 이미지 */}
      {item.additionalElements}
    </View>
  );

  return (
    <LinearGradient
      colors={['rgba(0, 255, 150, 1)', 'rgba(31, 209, 245, 1)']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.container}>
      {/* 절대 위치 요소들 */}
      <View style={styles.absoluteContainer}>
        {/* 상단 블루 그래스 이미지 */}
        <Image source={{uri: IMAGES.blueGrass}} style={styles.blueGrass} />
        {/* 투명한 회전 사각형들 */}
        <View style={styles.rectangle4443} />
        <View style={styles.rectangle4442} />
        {/* 하단 블루 그래스 이미지 */}
        <Image source={{uri: IMAGES.blueGrass}} style={styles.blueGrass1} />
      </View>

      {/* 캐러셀 */}
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{flexGrow: 1}}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
        {slides.map((item, index) => renderSlide({item, index}))}
      </Animated.ScrollView>

      {/* 페이지네이션 */}
      <View style={styles.paginationContainer}>
        {slides.map((_, i) => {
          let opacity = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return <Animated.View key={i} style={[styles.dot, {opacity}]} />;
        })}
      </View>

      {/* 버튼들 */}
      <View style={styles.buttonsContainer}>
        <View style={styles.rectangle4380}>
          <Text style={styles.signUpText}>회원가입</Text>
        </View>
        <View style={styles.rectangle4381}>
          <Text style={styles.loginText}>기존 계정으로 로그인하기</Text>
        </View>
      </View>

      {/* 하단 텍스트 */}
      <Text style={styles.footerText} numberOfLines={1} adjustsFontSizeToFit>
        계정 생성 시 잔디의{' '}
        <Text style={styles.underline}>개인정보 처리방침</Text> 및{' '}
        <Text style={styles.underline}>이용약관</Text>에 동의하게 됩니다.
      </Text>
    </LinearGradient>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
  absoluteContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  blueGrass: {
    position: 'absolute',
    top: height * 0.0972,
    left: width * 0.8355,
    width: width * (1 - 0.8355 + 0.2011),
    height: height * (1 - 0.0972 - 0.8103),
    transform: [{rotate: '18.56deg'}],
    resizeMode: 'contain',
    opacity: 0.5,
  },
  rectangle4443: {
    position: 'absolute',
    top: -height * 0.0083,
    left: width * 0.0279,
    width: width * (1 - 0.0279 - 0.6131),
    height: height * (1 + 0.0083 - 0.8424),
    transform: [{rotate: '20.44deg'}],
    borderRadius: 13,
    backgroundColor: 'rgba(255, 255, 255, 0.21)',
  },
  rectangle4442: {
    position: 'absolute',
    top: height * 0.2725,
    left: width * 0.851,
    width: width * (1 - 0.851 + 0.21),
    height: height * (1 - 0.2725 - 0.5616),
    transform: [{rotate: '20.44deg'}],
    borderRadius: 13,
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
  },
  blueGrass1: {
    position: 'absolute',
    top: height * 0.4471,
    left: width * 0.6308,
    width: width * (1 - 0.6308 + 0.141),
    height: height * (1 - 0.4471 - 0.4237),
    transform: [{rotate: '-17.36deg'}],
    resizeMode: 'contain',
    opacity: 0.5,
  },
  slide: {
    width: width,
    alignItems: 'center',
    paddingHorizontal: width * 0.1,
    paddingTop: height * 0.02, // 위쪽 여백을 줄이기 위해 수정
  },
  mainText: {
    marginTop: height * 0.05,
    fontSize: 28,
    lineHeight: 31,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2.5,
    fontFamily: 'NanumSquareNeo-dEb',
    letterSpacing: 1,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  highlight: {
    color: '#00470D',
  },
  subText: {
    marginTop: height * 0.015,
    fontSize: 14,
    lineHeight: 18,
    color: '#378260',
    fontFamily: 'NanumSquareNeo-cBd',
    letterSpacing: 0.5,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  // 슬라이드별 이미지 스타일
  slide1Image: {
    marginTop: height * 0.03,
    width: width * 0.85, // 너비 증가
    height: height * 0.35, // 높이 증가
    resizeMode: 'contain',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  slide3Image: {
    marginTop: height * 0.03,
    width: width * 0.85, // 너비 증가
    height: height * 0.4, // 높이 증가
    resizeMode: 'contain',
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  slide4Image: {
    marginTop: height * 0.03,
    width: width * 0.85, // 너비 증가
    height: height * 0.4, // 높이 증가
    resizeMode: 'contain',
    shadowColor: '#000',
    shadowOffset: {width: 6, height: 4},
    shadowOpacity: 0.13,
    shadowRadius: 5.9,
    elevation: 4,
  },
  slide2ImageContainer: {
    marginTop: height * 0.03,
    width: width * 0.9, // 너비 증가
    height: height * 0.45, // 높이 증가
    position: 'relative',
  },
  rectangle63x1: {
    position: 'absolute',
    top: height * 0.02,
    left: width * 0.1,
    width: width * 0.4,
    height: height * 0.3,
    transform: [{rotate: '1.11deg'}],
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  rectangle103x1: {
    position: 'absolute',
    top: height * 0.03,
    left: width * 0.55,
    width: width * 0.2,
    height: height * 0.12,
    transform: [{rotate: '19.58deg'}],
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  rectangle83x1: {
    position: 'absolute',
    top: 0,
    left: width * 0.6,
    width: width * 0.1,
    height: height * 0.06,
    transform: [{rotate: '27.15deg'}],
    resizeMode: 'cover',
  },
  rectangle73x1: {
    position: 'absolute',
    top: height * 0.04,
    left: width * 0.45,
    width: width * 0.1,
    height: height * 0.06,
    transform: [{rotate: '-7.73deg'}],
    resizeMode: 'cover',
  },
  rectangle53x1: {
    position: 'absolute',
    top: height * 0.15,
    left: width * 0.3,
    width: width * 0.25,
    height: height * 0.18,
    transform: [{rotate: '-13.02deg'}],
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 4},
    shadowOpacity: 0.21,
    shadowRadius: 7.1,
    elevation: 4,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: height * 0.25, // 페이지네이션 위치 조정
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#009499',
    marginHorizontal: 5,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: height * 0.08,
    width: '100%',
    alignItems: 'center',
  },
  rectangle4380: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.06,
    width: width * 0.8,
    marginBottom: height * 0.02,
  },
  rectangle4381: {
    backgroundColor: '#009499',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.06,
    width: width * 0.8,
  },
  signUpText: {
    fontSize: 16,
    color: '#014939',
    fontFamily: 'NanumSquareNeo-dEb',
    letterSpacing: 1,
  },
  loginText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'NanumSquareNeo-dEb',
    letterSpacing: 1,
  },
  footerText: {
    position: 'absolute',
    bottom: height * 0.02,
    fontSize: 10,
    color: '#888888',
    fontFamily: 'NanumSquareNeo-dEb',
    fontWeight: '500',
    textAlign: 'center',
    marginHorizontal: width * 0.05,
    lineHeight: 18,
    letterSpacing: 1,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  text: {
    fontFamily: 'NanumSquareNeo-dEb',
    fontSize: 16,
  },
});
