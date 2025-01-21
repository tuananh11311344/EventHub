import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {EventsScreen, ExplorerEvent} from '../screens';
import {useStatusBar} from '../utils/useStatusBar';

const EventsNavigator = () => {
  const Stack = createNativeStackNavigator();
  useStatusBar('light-content');
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* <Stack.Screen name="EventsScreen" component={EventsScreen} /> */}
      <Stack.Screen
        name="ExplorerEvent"
        component={ExplorerEvent}
        initialParams={{
          filter: 'all',
        }}
      />
    </Stack.Navigator>
  );
};

export default EventsNavigator;
