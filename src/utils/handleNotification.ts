import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import userAPI from '../api/userApi';
import {checkNotifications, requestNotifications} from 'react-native-permissions';

export class HandleNotification {
  static checkNotificationPersion = async () => {
    const { status } = await checkNotifications();
    if (status !== 'granted') {
      await requestNotifications(['alert', 'sound']);
    } else {
      const authStatus = await messaging().requestPermission();

      if (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        this.getFcmToken();
      }
    }
  };
  static getFcmToken = async () => {
    const fcmToken = await AsyncStorage.getItem('fcmToken');

    if (!fcmToken) {
      const token = await messaging().getToken();

      if (token) {
        await AsyncStorage.setItem('fcmToken', token);
        this.updateTokenForUser(token);
      }
    } else {
      this.updateTokenForUser(fcmToken);
    }
  };

  static updateTokenForUser = async (token: string) => {
    const res = await AsyncStorage.getItem('auth');

    if (res) {
      const auth = JSON.parse(res);
      const {fcmTokens} = auth;
      if (fcmTokens && !fcmTokens.includes(token)) {
        fcmTokens.push(token);

        await this.update(auth.id, fcmTokens);
      }
    }
  };

  static update = async (id: string, fcmTokens: string[]) => {
    try {
      await userAPI.HandleUser(
        '/update-fcmtoken',
        {
          uid: id,
          fcmTokens,
        },
        'post',
      );
    } catch (error) {
      console.log('Update fcmtoken error:', error);
    }
  };
}
