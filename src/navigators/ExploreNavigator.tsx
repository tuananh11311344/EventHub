import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  ExplorerEvent,
  HomeScreen,
  SearchEvents,
} from '../screens';
import {useStatusBar} from '../utils/useStatusBar';

const ExploreNavigator = () => {
  const Stack = createNativeStackNavigator();
  useStatusBar('light-content');
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SearchEvents" component={SearchEvents} />
      <Stack.Screen name="ExplorerEvent" component={ExplorerEvent} />
    </Stack.Navigator>
  );
};

export default ExploreNavigator;
