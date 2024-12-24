import React, {useState} from 'react';
import {View} from 'react-native';
import {InputComponent, TextComponent} from '../../components';
import {globalStyle} from '../../styles/GlobalStyle';
import {Lock, Sms} from 'iconsax-react-native';
import appColors from '../../constants/appColors';
import ContainerComponent from '../../components/ContainerComponent';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    // <View
    //   style={[
    //     globalStyle.container,
    //     {
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //       paddingHorizontal: 20,
    //     },
    //   ]}>
    <ContainerComponent isImageBackground>
      <TextComponent text='123'/>
      {/* <InputComponent
        value={email}
        onChange={val => setEmail(val)}
        placeholder="Email"
        affix={<Sms size={22} color={appColors.gray} />}
        allowClear
      />
      <InputComponent
        value={password}
        onChange={val => setPassword(val)}
        isPassword
        placeholder="Password"
        affix={<Lock size={22} color={appColors.gray} />}
      /> */}
    </ContainerComponent>
    // </View>
  );
};

export default LoginScreen;
