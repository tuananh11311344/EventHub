import React, {ReactNode} from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import appColors from '../constants/appColors';
import {globalStyle} from '../styles/GlobalStyle';
import TextComponent from './TextComponent';

interface Props {
  icon?: ReactNode;
  text: string;
  type?: 'primary' | 'text' | 'link';
  color?: string;
  styles?: StyleProp<ViewStyle>;
  textColor?: string;
  textStyles?: StyleProp<ViewStyle>;
  onPress: () => void;
  iconFlex?: 'right' | 'left';
}

const ButtonComponent = (props: Props) => {
  const {
    icon,
    text,
    type,
    color,
    styles,
    textColor,
    textStyles,
    onPress,
    iconFlex,
  } = props;
  return (
    <>
      {type === 'primary' ? (
        <TouchableOpacity
          onPress={onPress}
          style={[
            globalStyle.button,
            {backgroundColor: color ?? appColors.primary},
            styles,
          ]}>
          {icon && icon}
          <TextComponent
            text={text}
            color={textColor ?? appColors.white}
            styles={[
              textStyles,
              {
                marginLeft: icon ? 12 : 0,
              },
            ]}
            flex={icon && iconFlex === 'right' ? 1 : 0}
          />
          {icon && iconFlex === 'right' && icon}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPress}>
          <TextComponent text={text} />
        </TouchableOpacity>
      )}
    </>
  );
};

export default ButtonComponent;
