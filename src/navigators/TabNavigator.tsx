import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import React, {ReactNode} from 'react';
import {Platform} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AddSquare, Calendar, Location, User} from 'iconsax-react-native';
import {CircleComponent, TextComponent} from '../components';
import appColors from '../constants/appColors';
import {globalStyle} from '../styles/GlobalStyle';
import AddNewScreen from '../screens/AddNewScreen';
import EventsNavigator from './EventsNavigator';
import ExploreNavigator from './ExploreNavigator';
import MapNavigator from './MapNavigator';
import ProfileNavigator from './ProfileNavigator';

const screensToHideTabBar = [
  'ExplorerEvent',
  'EditProfileScreen',
  'SearchEvents',
];

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? '';
        return {
          headerShown: false,
          tabBarStyle: {
            height: Platform.OS === 'ios' ? 88 : 68,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: appColors.white,
            display: screensToHideTabBar.includes(routeName) ? 'none' : 'flex',
          },
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({focused, color, size}) => {
            let icon: ReactNode;
            color = focused ? appColors.primary : appColors.gray5;
            size = 24;

            switch (route.name) {
              case 'Explore':
                icon = (
                  <MaterialIcons name="explore" size={size} color={color} />
                );
                break;

              case 'Events':
                icon = <Calendar size={size} variant="Bold" color={color} />;
                break;

              case 'Map':
                icon = <Location size={size} variant="Bold" color={color} />;
                break;

              case 'Profile':
                icon = <User size={size} variant="Bold" color={color} />;
                break;

              case 'Add':
                icon = (
                  <CircleComponent
                    size={52}
                    styles={[globalStyle.shadow, {marginTop: -50}]}>
                    <AddSquare
                      size={24}
                      color={appColors.white}
                      variant="Bold"
                    />
                  </CircleComponent>
                );
                break;
            }
            return icon;
          },
          tabBarIconStyle: {
            marginTop: 8,
          },
          tabBarLabel({focused}) {
            return route.name === 'Add' ? null : (
              <TextComponent
                text={route.name}
                flex={0}
                size={12}
                color={focused ? appColors.primary : appColors.gray5}
                styles={{
                  marginBottom: Platform.OS === 'android' ? 12 : 0,
                }}
              />
            );
          },
        };
      }}>
      <Tab.Screen name="Explore" component={ExploreNavigator} />
      <Tab.Screen
        name="Events"
        options={{
          tabBarStyle: {display: 'none'},
        }}
        component={EventsNavigator}
      />
      <Tab.Screen
        name="Add"
        component={AddNewScreen}
        options={{
          tabBarStyle: {display: 'none'},
        }}
      />
      <Tab.Screen
        name="Map"
        options={{
          tabBarStyle: {
            display: 'none',
          },
        }}
        component={MapNavigator}
      />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
