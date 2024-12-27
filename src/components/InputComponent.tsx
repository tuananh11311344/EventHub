import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardType,
  TouchableOpacity,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import appColors from '../constants/appColors';

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
  } = props;

  const [isShowPass, setIsShowPass] = useState(isPassword ?? false);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          {borderColor: errorMessage ? appColors.danger : appColors.gray3},
        ]}>
        {affix ?? affix}
        <TextInput
          style={[styles.input]}
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
      </View>
      {errorMessage && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default InputComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 19,
  },
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    width: '100%',
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: appColors.white,
  },
  input: {
    padding: 0,
    margin: 0,
    flex: 1,
    paddingHorizontal: 14,
    color: appColors.text,
  },
  errorMessage: {
    marginTop: 4,
    color: appColors.danger,
    fontSize: 12,
  },
});
