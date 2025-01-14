import React from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  View,
} from 'react-native';
import appColors from '../constants/appColors';
import TextComponent from './TextComponent';
import {globalStyle} from '../styles/GlobalStyle';
import {fontFamily} from '../constants/fontFamily';

interface Props {
  photoUrl?: string;
  name: string;
  size?: number;
  styles?: StyleProp<ImageStyle>;
  onPress?: () => void;
}

const AvatarComponent = (props: Props) => {
  const {photoUrl, name, size, styles, onPress} = props;
  const localStyle = {
    width: size ?? 40,
    height: size ?? 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: appColors.white,
  };
  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      {photoUrl ? (
        <Image source={{uri: photoUrl}} style={[localStyle, styles]} />
      ) : name ? (
        <View
          style={[
            globalStyle.center,
            localStyle,
            {
              backgroundColor: appColors.link,
              borderColor: appColors.white,
            },
          ]}>
          <TextComponent
            text={name.substring(0, 1).toLocaleUpperCase()}
            font={fontFamily.bold}
            color={appColors.white}
            size={size ? size / 3 : 14}
          />
        </View>
      ) : (
        <Image
          source={require('../assets/images/user.png')}
          style={[localStyle, styles]}
        />
      )}
    </TouchableOpacity>
  );
};

export default AvatarComponent;
