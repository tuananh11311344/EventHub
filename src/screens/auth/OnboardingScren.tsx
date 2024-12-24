import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useRef, useState} from 'react';
import {globalStyle} from '../../styles/GlobalStyle';
import Swiper from 'react-native-swiper';
import {appInfo} from '../../constants/appInfo';
import appColors from '../../constants/appColors';
import {TextComponent} from '../../components';
import {fontFamily} from '../../constants/fontFamily';

const OnboardingScreen = ({navigation}: any) => {
  const swiperRef = useRef<Swiper | null>(null);
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (swiperRef.current) {
      if (index < 2) {
        swiperRef.current.scrollBy(1);
      } else {
        navigation.navigate('LoginScreen');
      }
    }    
  };

  const handleSkip = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={[globalStyle.container]}>
      <Swiper
        ref={swiperRef}
        loop={false}
        index={index}
        scrollEnabled={true}
        onIndexChanged={num => setIndex(num)}
        activeDotColor={appColors.white}>
        <Image
          source={require('../../assets/images/onboarding-1.png')}
          style={{
            flex: 1,
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
            resizeMode: 'cover',
          }}
        />
        <Image
          source={require('../../assets/images/onboarding-2.png')}
          style={{
            flex: 1,
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
            resizeMode: 'cover',
          }}
        />
        <Image
          source={require('../../assets/images/onboarding-3.png')}
          style={{
            flex: 1,
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
            resizeMode: 'cover',
          }}
        />
      </Swiper>
      <View
        style={[
          {
            paddingHorizontal: 40,
            paddingVertical: 25,
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}>
        <TouchableOpacity onPress={handleSkip}>
          <TextComponent
            text="Skip"
            color={appColors.gray2}
            font={fontFamily.medium}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
          <TextComponent
            text="Next"
            color={appColors.white}
            font={fontFamily.medium}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;
