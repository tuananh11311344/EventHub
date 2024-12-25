import {View, Text, StyleProp, TextStyle} from 'react-native';
import React from 'react';
import appColors from '../constants/appColors';
import {fontFamily} from '../constants/fontFamily';
import {globalStyle} from '../styles/GlobalStyle';

interface Props {
  text: string;
  color?: string;
  size?: number;
  flex?: number;
  font?: string;
  styles?: StyleProp<TextStyle>;
  title?: boolean;
}

const TextComponent = (props: Props) => {
  const {text, color, size, flex, font, styles, title} = props;
  return (
    <Text
      style={[
        globalStyle.text,
        {
          color: color ? color : appColors.text,
          flex: flex ? flex : 0,
          fontSize: size ? size : title ? 24 : 16,
          fontFamily: font
            ? font
            : title
            ? fontFamily.medium
            : fontFamily.regular,
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
