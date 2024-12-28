import {Lock} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import appColors from '../../constants/appColors';
import {AuthFormValues, validateAuthField} from '../../utils/authValidation';
import authenticationAPI from '../../api/AuthApi';
import {LoadingModal} from '../../modals';

const ChangePassword = ({navigation, route}: any) => {
  const {email} = route.params;
  const [isDisable, setIsDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState<any>();
  const [values, setValues] = useState<AuthFormValues>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (
      !errorMessage ||
      (errorMessage &&
        (errorMessage.confirmPassword || errorMessage.password)) ||
      !values!.password ||
      !values!.confirmPassword
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
    data[key] = validateAuthField(key, values!);
    setErrorMessage(data);
  };

  const handleResetPassword = async () => {
    const api = '/forgotPassword';
    setIsLoading(true);
    try {
      await authenticationAPI.HandleAuthentication(
        api,
        {email, password: values?.password},
        'post',
      );
      navigation.navigate('LoginScreen');
      setIsLoading(false);
    } catch (error) {
      console.log('Reset password failed', error);
      setIsLoading(false);
    }
  };

  return (
    <ContainerComponent back isImageBackground>
      <SectionComponent>
        <TextComponent text="Reset Password" title />
        <SpaceComponent height={12} />
        <TextComponent text="Please enter your email address to request a password reset" />
        <SpaceComponent height={26} />
        <InputComponent
          value={values?.password ?? ''}
          placeholder="Password"
          onChange={val => handleChangeValue('password', val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
          onEnd={() => formValidator('password')}
          errorMessage={errorMessage?.password}
        />
        <InputComponent
          value={values?.confirmPassword ?? ''}
          placeholder="Confirm password"
          onChange={val => handleChangeValue('confirmPassword', val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
          onEnd={() => formValidator('confirmPassword')}
          errorMessage={errorMessage?.confirmPassword}
        />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          text="Change Password"
          type="primary"
          onPress={handleResetPassword}
          disable={isDisable}
        />
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default ChangePassword;
