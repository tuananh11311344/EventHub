import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {OtpInput} from 'react-native-otp-entry';
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import appColors from '../../constants/appColors';
import {fontFamily} from '../../constants/fontFamily';
import {ArrowRight} from 'iconsax-react-native';
import {globalStyle} from '../../styles/GlobalStyle';
import authenticationAPI from '../../api/AuthApi';
import LoadingModal from '../../modals/LoadingModal';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Verification = ({navigation, route}: any) => {
  const {code, email, password, fullname, type} = route.params;
  const [codeValue, setCodeValue] = useState('');
  const [limit, setLimit] = useState(120);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCode, setCurrentCode] = useState(code);
  const [errorMessage, setErrorMessage] = useState('');
  const [otpKey, setOtpKey] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (limit > 0) {
      const interval = setInterval(() => {
        setLimit(limit => limit - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [limit]);

  useEffect(() => {
    handleSendVerification();
  }, []);

  const handleSendVerification = async () => {
    const api = '/verification';

    try {
      const res = await authenticationAPI.HandleAuthentication(
        api,
        {email},
        'post',
      );
      setCurrentCode(res.data);
    } catch (error) {
      console.log('send verification code error', error);
    }
  };

  const handleResendVerification = async () => {
    const api = '/verification';
    setIsLoading(true);
    try {
      const res = await authenticationAPI.HandleAuthentication(
        api,
        {email},
        'post',
      );
      setErrorMessage('');
      setOtpKey(prevKey => prevKey + 1);
      setCodeValue('');
      setLimit(120);
      setCurrentCode(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log('Can not send verification: ', error);
      setIsLoading(false);
    }
  };

  const handleVerification = async () => {
    if (limit <= 0) {
      setErrorMessage(
        'Time out verification code, plase resend new verification code',
      );
    } else {
      
      if (Number(codeValue) === Number(currentCode)) {
        switch (type) {
          case 'register':
            const api = '/register';
            const data = {
              email,
              password,
              fullname,
            };
            try {
              const res = await authenticationAPI.HandleAuthentication(
                api,
                data,
                'post',
              );
              dispatch(addAuth(res.data));

              await AsyncStorage.setItem('auth', JSON.stringify(res.data));
            } catch (error) {
              setErrorMessage('User has already exist!!!');
              console.log('Can not create new user ', error);
            }
            break;
          case 'resetPassword':
            navigation.navigate('ChangePassword', {
              email: email,
            });
            break;
          default:
            break;
        }
      } else {
        setErrorMessage('Invalid code!!!');
      }
    }
  };

  return (
    <ContainerComponent back isImageBackground isScroll>
      <SectionComponent>
        <TextComponent text="Verification" title />
        <SpaceComponent height={4} />
        <TextComponent
          text={`We’ve send you the verification code on ${email.replace(
            /.{1,5}/,
            (m: any) => '*'.repeat(m.length),
          )}`}
        />
      </SectionComponent>
      <SpaceComponent height={27} />
      <SectionComponent styles={{paddingHorizontal: 30}}>
        <OtpInput
          key={otpKey} // reset lại otp input
          numberOfDigits={4}
          onTextChange={text => setCodeValue(text)}
          focusColor={appColors.primary}
          focusStickBlinkingDuration={400}
          theme={{
            pinCodeContainerStyle: {
              backgroundColor: appColors.white,
              width: 60,
              height: 60,
              borderRadius: 12,
            },
            pinCodeTextStyle: {
              fontFamily: fontFamily.medium,
              color: appColors.text,
            },
          }}
        />
      </SectionComponent>
      <SectionComponent styles={{marginTop: 40}}>
        <ButtonComponent
          disable={codeValue.length !== 4}
          onPress={handleVerification}
          text="Continue"
          type="primary"
          icon={
            <View
              style={[
                globalStyle.iconContainer,
                {
                  backgroundColor:
                    codeValue.length !== 4 ? appColors.gray : '#3D56F0',
                },
              ]}>
              <ArrowRight size={18} color={appColors.white} />
            </View>
          }
          iconFlex="right"
        />
      </SectionComponent>
      {errorMessage && (
        <SectionComponent>
          <TextComponent
            flex={0}
            styles={{textAlign: 'center'}}
            text={errorMessage}
            color={appColors.danger}
          />
        </SectionComponent>
      )}
      <SectionComponent>
        {limit > 0 ? (
          <RowComponent>
            <TextComponent text="Re-send code in " />
            <TextComponent
              text={`${(limit - (limit % 60)) / 60}:${
                limit - (limit - (limit % 60))
              }`}
              color={appColors.link}
            />
          </RowComponent>
        ) : (
          <RowComponent>
            <ButtonComponent
              type="link"
              text="Resend email verification"
              onPress={handleResendVerification}
            />
          </RowComponent>
        )}
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default Verification;
