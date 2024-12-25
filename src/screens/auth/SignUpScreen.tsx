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

const initValue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpScreen = ({navigation}: any) => {
  const [values, setValues] = useState(initValue);

  const handleChangeValue = (key: string, value: string) =>{
    const data: any = {...values};
    data[`${key}`] = value;

    setValues(data);
  }

  return (
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
      <SpaceComponent height={16} />
      <SectionComponent>
        <ButtonComponent text="SIGN UP" type="primary" onPress={() => {}} />
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
  );
};

export default SignUpScreen;
