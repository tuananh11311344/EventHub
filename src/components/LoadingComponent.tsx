import {View, Text, ActivityIndicator, Image} from 'react-native';
import React from 'react';
import {globalStyle} from '../styles/GlobalStyle';
import TextComponent from './TextComponent';
import {appInfo} from '../constants/appInfo';

interface Props {
  isLoading: boolean;
  values: number;
  mess?: string;
}

const LoadingComponent = (props: Props) => {
  const {isLoading, values, mess} = props;
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      {isLoading ? (
        <ActivityIndicator style={{padding: 20}} />
      ) : values === 0 && mess ? (
        <TextComponent text={mess} />
      ) : (
        <Image
          source={require('../assets/images/not_event.jpg')}
          style={{
            width: appInfo.sizes.WIDTH * 0.8,
            height: appInfo.sizes.WIDTH * 0.5,
            resizeMode: 'contain',
            borderRadius: 12,
          }}
        />
      )}
    </View>
  );
};

export default LoadingComponent;
