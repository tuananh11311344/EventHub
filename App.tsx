import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import AppRouter from './src/navigators/AppRouter';
import store from './src/redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Host} from 'react-native-portalize';

const App = () => {
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
      </GestureHandlerRootView>
    </>
  );
};

export default App;
