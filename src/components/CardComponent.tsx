import {View, Text, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';
import {appInfo} from '../constants/appInfo';
import {globalStyle} from '../styles/GlobalStyle';
import appColors from '../constants/appColors';

interface Props {
  onPress?: () => void;
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
  isShadow?: boolean;
  color?: string;
}

const CardComponent = (props: Props) => {
  const {onPress, children, styles, isShadow, color} = props;
  const localStyle: StyleProp<ViewStyle>[] = [
    globalStyle.card,
    isShadow ? globalStyle.shadow : undefined,
    {
        backgroundColor: color ?? appColors.white
    },
    styles,
  ];
  return (
    <TouchableOpacity style={localStyle} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default CardComponent;
