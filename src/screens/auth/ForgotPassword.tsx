import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {ArrowRight, Sms} from 'iconsax-react-native';
import appColors from '../../constants/appColors';
import { AuthFormValues, validateAuthField } from '../../utils/authValidation';

const ForgotPassword = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<any>();
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    if (!errorMessage || (errorMessage && errorMessage.email) || !email) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [errorMessage, email]);

  const handleSendEmail = () => {
    navigation.navigate('Verification', {
      email: email,
      type: 'resetPassword',
    });
  };

 const formValidator = (key: string, values: AuthFormValues) => {
     const data = {...errorMessage};
     data[key] = validateAuthField(key, values);
     setErrorMessage(data);
   };
  return (
    <ContainerComponent back isImageBackground>
      <SectionComponent>
        <TextComponent text="Reset Password" title />
        <SpaceComponent height={12} />
        <TextComponent text="Please enter your email address to request a password reset" />
        <SpaceComponent height={26} />
        <InputComponent
          value={email}
          onChange={val => setEmail(val)}
          placeholder="abc@gamil.com"
          affix={<Sms size={20} color={appColors.gray} />}
          errorMessage={errorMessage?.email}
          onEnd={() => formValidator('email', {email: email})}
        />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          text="Send"
          type="primary"
          onPress={handleSendEmail}
          icon={<ArrowRight size={20} color={appColors.white} />}
          iconFlex="right"
          disable={isDisable}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default ForgotPassword;
