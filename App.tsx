import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host } from 'react-native-portalize';
import { Provider } from 'react-redux';
import AppRouter from './src/navigators/AppRouter';
import store from './src/redux/store';
import { HandleNotification } from './src/utils/handleNotification';
import Toast from 'react-native-toast-message';
const App = () => {
  useEffect(() => {
    HandleNotification.checkNotificationPersion();
  }, []);
  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <Provider store={store}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Host>
            <NavigationContainer>
              <AppRouter />
            </NavigationContainer>
          </Host>
        </Provider>
        <Toast />
      </GestureHandlerRootView>
    </>
  );
};

export default App;
