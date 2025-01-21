import React, {ReactNode} from 'react';
import {StyleProp, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {globalStyle} from '../styles/GlobalStyle';
import TextComponent from './TextComponent';
import appColors from '../constants/appColors';

interface Props {
  onPress: () => void;
  label: string;
  icon?: ReactNode;
  textColor?: string;
  bgColor?: string;
  styles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
}

const TagComponent = (props: Props) => {
  const {onPress, label, icon, textColor, bgColor, styles, textStyles} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyle.row,
        globalStyle.tag,
        {
          backgroundColor: bgColor ?? appColors.white,
        },
        styles,
      ]}>
      {icon && icon}
      <TextComponent
        text={label}
        styles={[{marginLeft: icon ? 8 : 0}, textStyles]}
        color={textColor ?? appColors.white}
      />
    </TouchableOpacity>
  );
};

export default TagComponent;
