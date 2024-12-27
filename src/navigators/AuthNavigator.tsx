import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {LoginScreen, OnboardingScren} from '../screens';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ForgotPassword from '../screens/auth/ForgotPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  const [isExistingUser, setIsExistingUser] = useState(false);

  useEffect(() => {
     checkUserExisting();
  }, []);

  const checkUserExisting = async () => {
    const res = await AsyncStorage.getItem('auth');

    res && setIsExistingUser(true);
  };
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!isExistingUser && (
        <Stack.Screen name="OnboardingScreen" component={OnboardingScren} />
      )}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
