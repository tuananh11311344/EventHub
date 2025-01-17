import { Lock, Sms, User } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import authenticationAPI from '../../api/authApi';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import appColors from '../../constants/appColors';
import { LoadingModal } from '../../modals';
import { validateAuthField } from '../../utils/authValidation';
import SocialLogin from './component/SocialLogin';

interface ValueModel {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initValue = {
  fullname: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpScreen = ({navigation}: any) => {
  const [values, setValues] = useState<ValueModel>(initValue);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>();
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    if (
      !errorMessage ||
      (errorMessage &&
        (errorMessage.email ||
          errorMessage.password ||
          errorMessage.confirmPassword ||
          errorMessage.fullname)) ||
      !values.email ||
      !values.password ||
      !values.confirmPassword ||
      !values.fullname
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [errorMessage, values]);

  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...values};
    data[`${key}`] = value;
    setValues(data);
  };

  const formValidator = (key: string) => {
    const data = {...errorMessage};
    data[key] = validateAuthField(key, values);
    setErrorMessage(data);
  };

  const handleRegister = async () => {
    setIsLoading(true);
    const api = `/verification`;
    try {
      const res = await authenticationAPI.HandleAuthentication(
        api,
        {email: values.email},
        'post',
      );
      navigation.navigate('Verification', {
        email: values.email,
        password: values.password,
        fullname: values.fullname,
        code: res.data,
        type: 'register'
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ContainerComponent isImageBackground isScroll back>
        <SectionComponent>
          <TextComponent size={24} title text="Sign up" />
          <SpaceComponent height={21} />
          <InputComponent
            value={values.fullname}
            placeholder="Full name"
            onChange={val => handleChangeValue('fullname', val)}
            allowClear
            affix={<User size={22} color={appColors.gray} />}
            onEnd={() => formValidator('fullname')}
            errorMessage={errorMessage?.fullname}
          />
          <InputComponent
            value={values.email}
            placeholder="abc@email.com"
            onChange={val => handleChangeValue('email', val)}
            allowClear
            affix={<Sms size={22} color={appColors.gray} />}
            onEnd={() => formValidator('email')}
            errorMessage={errorMessage?.email}
          />
          <InputComponent
            value={values.password}
            placeholder="Password"
            onChange={val => handleChangeValue('password', val)}
            isPassword
            allowClear
            affix={<Lock size={22} color={appColors.gray} />}
            onEnd={() => formValidator('password')}
            errorMessage={errorMessage?.password}
          />
          <InputComponent
            value={values.confirmPassword}
            placeholder="Confirm password"
            onChange={val => handleChangeValue('confirmPassword', val)}
            isPassword
            allowClear
            affix={<Lock size={22} color={appColors.gray} />}
            onEnd={() => formValidator('confirmPassword')}
            errorMessage={errorMessage?.confirmPassword}
          />
        </SectionComponent>
        <SpaceComponent height={16} />
        <SectionComponent>
          <ButtonComponent
            onPress={handleRegister}
            text="SIGN UP"
            disable={isDisable}
            type="primary"
          />
        </SectionComponent>
        <SocialLogin />
        <SectionComponent>
          <RowComponent justify="center">
            <TextComponent text="Don't have an account? " />
            <ButtonComponent
              type="link"
              text="Sign in"
              onPress={() => navigation.navigate('LoginScreen')}
            />
          </RowComponent>
        </SectionComponent>
      </ContainerComponent>
      <LoadingModal visible={isLoading} />
    </>
  );
};

export default SignUpScreen;