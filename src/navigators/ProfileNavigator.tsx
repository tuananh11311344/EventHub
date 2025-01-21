import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {EditProfileScreen, ProfileScreen} from '../screens';
import {useSelector} from 'react-redux';
import {authSelector} from '../redux/reducers/authReducer';
import {useStatusBar} from '../utils/useStatusBar';

const ProfileNavigator = () => {
  const Stack = createNativeStackNavigator();
  const auth = useSelector(authSelector);
  useStatusBar('dark-content');
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
