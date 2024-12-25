import {View, Text} from 'react-native';
import React from 'react';
import {
  ButtonComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import appColors from '../../../constants/appColors';
import {fontFamily} from '../../../constants/fontFamily';
import { Facebook, Google } from '../../../assets/svgs';

const SocialLogin = () => {
  return (
    <SectionComponent>
      <TextComponent
        styles={{textAlign: 'center'}}
        text="OR"
        color={appColors.gray4}
        size={16}
        font={fontFamily.medium}
      />
      <SpaceComponent height={16}/>
      <ButtonComponent
        text="Login with Google"
        icon={<Google />}
        color={appColors.white}
        textColor={appColors.text}
        type='primary'
        onPress={() => {}}
        iconFlex='left'
        textFont={fontFamily.regular}
      />
      <ButtonComponent
        text="Login with Facebook"
        icon={<Facebook />}
        color={appColors.white}
        textColor={appColors.text}
        type='primary'
        onPress={() => {}}
        iconFlex='left'
        textFont={fontFamily.regular}
      />
    </SectionComponent>
  );
};

export default SocialLogin;
