import React, {ReactNode} from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import appColors from '../constants/appColors';
import {globalStyle} from '../styles/GlobalStyle';
import TextComponent from './TextComponent';
import {fontFamily} from '../constants/fontFamily';

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
  textFont?: string;
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
    textFont,
  } = props;
  return (
    <>
      {type === 'primary' ? (
        <TouchableOpacity
          onPress={onPress}
          style={[
            globalStyle.button,
            globalStyle.shadow,
            {backgroundColor: color ?? appColors.primary, marginBottom: 17},
            styles,
          ]}>
          {icon && iconFlex === 'left' && icon}
          <TextComponent
            text={text}
            color={textColor ?? appColors.white}
            styles={[
              textStyles,
              {
                marginLeft: icon ? 12 : 0,
                fontSize: 16,
                textAlign: 'center',
              },
            ]}
            flex={icon && iconFlex === 'right' ? 1 : 0}
            font={textFont ? textFont : fontFamily.medium}
          />
          {icon && iconFlex === 'right' && icon}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPress}>
          <TextComponent
            text={text}
            color={type === 'link' ? appColors.primary : appColors.text}
          />
        </TouchableOpacity>
      )}
    </>
  );
};

export default ButtonComponent;
