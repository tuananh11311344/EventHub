import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardType,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import appColors from '../constants/appColors';
import {globalStyle} from '../styles/GlobalStyle';

interface Props {
  value: string;
  onChange: (val: string) => void;
  affix?: ReactNode;
  placeholder?: string;
  suffix?: ReactNode;
  isPassword?: boolean;
  allowClear?: boolean;
  type?: KeyboardType;
  onEnd?: () => void;
  errorMessage?: string;
  multiline?: boolean;
  numberOfLine?: number;
  styles?: StyleProp<ViewStyle>;
}

const InputComponent = (props: Props) => {
  const {
    value,
    onChange,
    affix,
    suffix,
    placeholder,
    isPassword,
    allowClear,
    type,
    onEnd,
    errorMessage,
    multiline,
    numberOfLine,
    styles,
  } = props;

  const [isShowPass, setIsShowPass] = useState(isPassword ?? false);

  return (
    <View
      style={[
        globalStyle.inputContainer,
        {
          borderColor: errorMessage ? appColors.danger : appColors.gray3,
          alignItems: multiline ? 'flex-start' : 'center',
        },
        styles,
      ]}>
      {affix ?? affix}
      <TextInput
        style={[
          globalStyle.input,
          {
            paddingHorizontal: affix || suffix ? 15 : 0,

            textAlignVertical: multiline ? 'top' : 'center',
          },
        ]}
        multiline={multiline}
        numberOfLines={numberOfLine}
        value={value}
        placeholder={placeholder ?? ''}
        onChangeText={val => onChange(val)}
        secureTextEntry={isShowPass}
        placeholderTextColor={'#747688'}
        keyboardType={type ?? 'default'}
        autoCapitalize="none"
        onEndEditing={onEnd}
      />
      {suffix ?? suffix}
      <TouchableOpacity
        onPress={
          isPassword ? () => setIsShowPass(!isShowPass) : () => onChange('')
        }>
        {isPassword ? (
          <FontAwesome
            name={isShowPass ? 'eye-slash' : 'eye'}
            size={22}
            color={appColors.gray}
          />
        ) : (
          value.length > 0 &&
          allowClear && (
            <AntDesign name="close" size={22} color={appColors.gray} />
          )
        )}
      </TouchableOpacity>
      {errorMessage && (
        <Text style={globalStyle.errorMessage}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default InputComponent;
