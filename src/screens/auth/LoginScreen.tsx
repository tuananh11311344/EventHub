import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lock, Sms } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { Image, Switch } from 'react-native';
import { useDispatch } from 'react-redux';
import authenticationAPI from '../../api/authApi';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import ContainerComponent from '../../components/ContainerComponent';
import appColors from '../../constants/appColors';
import { LoadingModal } from '../../modals';
import { addAuth } from '../../redux/reducers/authReducer';
import { AuthFormValues, validateAuthField } from '../../utils/authValidation';
import SocialLogin from './component/SocialLogin';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);
  const [errorMessage, setErrorMessage] = useState<any>();
  const dispatch = useDispatch();
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (
      !errorMessage ||
      (errorMessage && (errorMessage.email || errorMessage.password)) ||
      !email ||
      !password
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [errorMessage, email, password]);

  const formValidator = (key: string, values: AuthFormValues) => {
    const data = {...errorMessage};
    data[key] = validateAuthField(key, values);
    setErrorMessage(data);
  };

  const handleLogin = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <>
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
            onEnd={() => formValidator('email', {email: email})}
            errorMessage={errorMessage?.email}
          />
          <InputComponent
            value={password}
            onChange={val => setPassword(val)}
            isPassword
            placeholder="Your password"
            affix={<Lock size={22} color={appColors.gray} />}
            onEnd={() => formValidator('password', {password: password})}
            errorMessage={errorMessage?.password}
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
          <ButtonComponent
            disable={isDisable}
            text="SIGN IN"
            type="primary"
            onPress={handleLogin}
          />
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
      <LoadingModal visible={isLoading} />
    </>
  );
};

export default LoginScreen;
