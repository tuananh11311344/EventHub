import React from 'react';
import { ActivityIndicator, Image, ImageBackground } from 'react-native';
import { appInfo } from '../constants/appInfo';
import { SpaceComponent } from '../components';
import appColors from '../constants/appColors';

const SplashScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/images/splash-img.png')}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      imageStyle={{flex: 1}}>
      <Image
        source={require('../assets/images/logo.png')}
        style={{
          width: appInfo.sizes.WIDTH * 0.7,
          resizeMode: 'contain',
        }}
      />
      <SpaceComponent height={16}/>
      <ActivityIndicator color={appColors.primary} size={30}/>
    </ImageBackground>
  );
};

export default SplashScreen;
