import {Lock, Sms} from 'iconsax-react-native';
import React, {useState} from 'react';
import {Switch} from 'react-native';
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
import SocialLogin from './component/SocialLogin';
import {LoadingModal} from '../../modals';
import authenticationAPI from '../../api/AuthApi';
import {Validate} from '../../utils/validate';
import { useDispatch } from 'react-redux';
import { addAuth } from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initValue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpScreen = ({navigation}: any) => {
  const [values, setValues] = useState(initValue);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...values};
    data[`${key}`] = value;

    setValues(data);
  };

  const handleRegister = async () => {

    const {email, password, confirmPassword} = values;
    const emailValidation = Validate.email(email);
    const passwordValidation = Validate.Password(password);

    if (email && password && confirmPassword) {
      if (emailValidation && passwordValidation) {
        setErrorMessage('');
        setIsLoading(true);
        try {
          const res = await authenticationAPI.HandleAuthentication(
            '/register',
            {
              fullname: values.username,
              email,
              password,
            },
            'post',
          );

          dispatch(addAuth(res.data));
          await AsyncStorage.setItem('auth', JSON.stringify(res.data));
          
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      } else {
        setErrorMessage('Email not correct');
      }
    } else {
      setErrorMessage('Vui lòng nhập đầy đủ thông tin');
    }
  };

  return (
    <>
      <ContainerComponent isImageBackground isScroll back>
        <SectionComponent>
          <TextComponent title size={24} text="Sign up" />
          <SpaceComponent height={21} />
          <InputComponent
            value={values.username}
            onChange={val => handleChangeValue('username', val)}
            placeholder="Full name"
            affix={<Sms size={22} color={appColors.gray} />}
            allowClear
          />
          <InputComponent
            value={values.email}
            onChange={val => handleChangeValue('email', val)}
            placeholder="abc@gmail.com"
            affix={<Sms size={22} color={appColors.gray} />}
            allowClear
          />
          <InputComponent
            value={values.password}
            onChange={val => handleChangeValue('password', val)}
            isPassword
            placeholder="Your password"
            affix={<Lock size={22} color={appColors.gray} />}
          />
          <InputComponent
            value={values.confirmPassword}
            onChange={val => handleChangeValue('confirmPassword', val)}
            isPassword
            placeholder="Confirm password"
            affix={<Lock size={22} color={appColors.gray} />}
          />
        </SectionComponent>
        <SectionComponent>
          {errorMessage && (
            <TextComponent text={errorMessage} color={appColors.danger} />
          )}
        </SectionComponent>
        <SpaceComponent height={16} />
        <SectionComponent>
          <ButtonComponent
            text="SIGN UP"
            type="primary"
            onPress={handleRegister}
          />
        </SectionComponent>
        <SocialLogin />
        <SectionComponent>
          <RowComponent>
            <TextComponent text="Already have an account? " />
            <ButtonComponent
              text="Sign in"
              type="link"
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
