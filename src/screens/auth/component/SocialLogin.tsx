import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import appColors from '../../../constants/appColors';
import {fontFamily} from '../../../constants/fontFamily';
import {Facebook, Google} from '../../../assets/svgs';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import authenticationAPI from '../../../api/authApi';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoadingModal } from '../../../modals';

GoogleSignin.configure({
  webClientId:
    '741364031381-4i57gco62u8kphgs89b5rsi4ru5hpjap.apps.googleusercontent.com',
});

const SocialLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleLoginWithGoogle = async () => {
    setIsLoading(true);
    const api = '/google-signin';
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo.data?.user;

      const res = await authenticationAPI.HandleAuthentication(
        api,
        user,
        'post',
      );

      dispatch(addAuth(res.data));
      await AsyncStorage.setItem('auth', JSON.stringify(res.data));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('Sign in with google error: ', error);
    }
  };
  return (
    <>
      <SectionComponent>
        <TextComponent
          styles={{textAlign: 'center'}}
          text="OR"
          color={appColors.gray4}
          size={16}
          font={fontFamily.medium}
        />
        <SpaceComponent height={16} />
        <ButtonComponent
          text="Login with Google"
          icon={<Google />}
          color={appColors.white}
          textColor={appColors.text}
          type="primary"
          onPress={handleLoginWithGoogle}
          iconFlex="left"
          textFont={fontFamily.regular}
        />
        <ButtonComponent
          text="Login with Facebook"
          icon={<Facebook />}
          color={appColors.white}
          textColor={appColors.text}
          type="primary"
          onPress={() => {}}
          iconFlex="left"
          textFont={fontFamily.regular}
        />
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </>
  );
};

export default SocialLogin;
