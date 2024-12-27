import React, {useEffect, useState} from 'react';
import {Alert, Image, Switch} from 'react-native';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import ContainerComponent from '../../components/ContainerComponent';
import {Lock, Sms} from 'iconsax-react-native';
import appColors from '../../constants/appColors';
import {fontFamily} from '../../constants/fontFamily';
import SocialLogin from './component/SocialLogin';
import authenticationAPI from '../../api/AuthApi';
import {Validate} from '../../utils/validate';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);
  const dispatch = useDispatch();

  useEffect(() =>{
    getEmailInLocal();
  },[])

  const getEmailInLocal = async () => {
    try {
      const res = await AsyncStorage.getItem('auth'); 
      if (res) {
        const parsedRes = JSON.parse(res);
        if (parsedRes.email) {
          setEmail(parsedRes.email);
        }
      }
    } catch (error) {
      console.error('Error parsing auth data:', error);
    }
  };
  

  const handleLogin = async () => {
    const emailValidation = Validate.email(email);
    if (emailValidation) {
      try {
        const res = await authenticationAPI.HandleAuthentication(
          '/login',
          {email, password},
          'post',
        );
        dispatch(addAuth(res.data));
        await AsyncStorage.setItem(
          'auth',
          isRemember
            ? JSON.stringify(res.data)
            : JSON.stringify({email, accessToken: res.data.accessToken}),
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Email is not correct!!!');
    }
  };
  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 75,
        }}>
        <Image
          source={require('../../assets/images/text-logo.png')}
          style={{width: 162, height: 114}}
        />
      </SectionComponent>
      <SectionComponent>
        <TextComponent title size={24} text="Sign in" />
        <SpaceComponent height={21} />
        <InputComponent
          value={email}
          onChange={val => setEmail(val)}
          placeholder="abc@gmail.com"
          affix={<Sms size={22} color={appColors.gray} />}
          allowClear
        />
        <InputComponent
          value={password}
          onChange={val => setPassword(val)}
          isPassword
          placeholder="Your password"
          affix={<Lock size={22} color={appColors.gray} />}
        />
        <RowComponent justify="space-between">
          <RowComponent>
            <Switch
              trackColor={{true: appColors.primary}}
              thumbColor={appColors.white}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}
            />
            <TextComponent text="Remember Me" />
          </RowComponent>
          <ButtonComponent
            text="Forgot Password?"
            type="text"
            onPress={() => navigation.navigate('ForgotPassword')}
          />
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={16} />
      <SectionComponent>
        <ButtonComponent text="SIGN IN" type="primary" onPress={handleLogin} />
      </SectionComponent>
      <SocialLogin />
      <SectionComponent>
        <RowComponent>
          <TextComponent text="Don’t have an account? " />
          <ButtonComponent
            text="Sign up"
            type="link"
            onPress={() => navigation.navigate('SignUpScreen')}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
